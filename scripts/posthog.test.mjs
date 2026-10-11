import assert from "node:assert/strict";
import test from "node:test";
import {
  posthogSettings,
  sanitizeEvent,
} from "../projects/web/src/lib/posthog.ts";

test("only a configured production hostname can enable capture", () => {
  assert.equal(
    posthogSettings("", "https://us.i.posthog.com", "alexandercherry.com"),
    undefined,
  );
  assert.equal(
    posthogSettings("phc_test", "https://us.i.posthog.com", "localhost"),
    undefined,
  );
  assert.equal(
    posthogSettings(
      "phc_test",
      "https://unexpected.example",
      "alexandercherry.com",
    ),
    undefined,
  );
  assert.equal(
    posthogSettings(
      "phx_private",
      "https://us.i.posthog.com",
      "alexandercherry.com",
    ),
    undefined,
  );
  const config = posthogSettings(
    "phc_test",
    "https://eu.i.posthog.com",
    "www.alexandercherry.com",
  );
  assert.equal(config?.api_host, "https://eu.i.posthog.com");
  assert.equal(config?.cookieless_mode, "always");
  assert.equal(config?.autocapture, false);
  assert.equal(config?.disable_session_recording, true);
  assert.equal(config?.person_profiles, "never");
});

test("URL queries, fragments and unapproved properties never leave the page", () => {
  const input = {
    event: "$pageview",
    properties: {
      token: "phc_test",
      distinct_id: "visitor",
      $cookieless_mode: true,
      $current_url:
        "https://alexandercherry.com/shelflife/?email=private@example.com#secret",
      $referrer: "https://example.com/private/person?secret=1",
      $set: { email: "private@example.com" },
      utm_term: "private",
      href: "mailto:private@example.com",
      page_path: "/shelflife/",
    },
  };
  const result = sanitizeEvent(input);
  assert.equal(
    result.properties.$current_url,
    "https://alexandercherry.com/shelflife/",
  );
  assert.equal(result.properties.$referrer, "https://example.com/");
  assert.equal(result.properties.distinct_id, "visitor");
  assert.equal(result.properties.token, "phc_test");
  assert.equal(result.properties.$cookieless_mode, true);
  assert.equal(result.properties.$set, undefined);
  assert.equal(result.properties.utm_term, undefined);
  assert.equal(result.properties.href, undefined);
  assert.ok(
    input.properties.$current_url.includes("?"),
    "input must not be mutated",
  );
});

test("unexpected events are dropped and malformed URLs removed", () => {
  assert.equal(sanitizeEvent({ event: "$autocapture", properties: {} }), null);
  const result = sanitizeEvent({
    event: "contact_click",
    properties: { $current_url: "not a URL" },
  });
  assert.equal(result.properties.$current_url, undefined);
});

test("initializer skips local traffic and captures one pageview plus intentional link events", async () => {
  const { build } = await import("esbuild");
  const { runInNewContext } = await import("node:vm");
  const captures = [];
  let listeners = [];
  let imports = 0;
  class Element {
    constructor(href) {
      this.href = href;
    }
    closest() {
      return this;
    }
    getAttribute() {
      return this.href;
    }
  }
  const sdk = {
    init(_token, config) {
      assert.equal(config.autocapture, false);
    },
    capture(name, properties) {
      captures.push({ name, properties });
    },
  };
  const bundled = await build({
    entryPoints: ["projects/web/src/scripts/analytics.ts"],
    bundle: true,
    write: false,
    platform: "browser",
    format: "cjs",
    plugins: [
      {
        name: "sdk-boundary",
        setup(builder) {
          builder.onResolve({ filter: /^posthog-js$/ }, () => ({
            path: "sdk",
            namespace: "test",
          }));
          builder.onLoad({ filter: /.*/, namespace: "test" }, () => ({
            contents:
              "globalThis.onSdkImport(); export default globalThis.sdk;",
          }));
        },
      },
    ],
  });
  const context = {
    module: { exports: {} },
    sdk,
    Element,
    URL,
    onSdkImport() {
      imports++;
    },
    location: {
      hostname: "localhost",
      pathname: "/shelflife/",
      origin: "https://alexandercherry.com",
    },
    document: {
      addEventListener(_name, callback) {
        listeners.push(callback);
      },
    },
  };
  runInNewContext(bundled.outputFiles[0].text, context);
  const init = context.module.exports.initializeAnalytics;
  await init("phc_test", "https://us.i.posthog.com");
  assert.equal(imports, 0);
  context.location.hostname = "alexandercherry.com";
  await init("phc_test", "https://us.i.posthog.com");
  await init("phc_test", "https://us.i.posthog.com");
  assert.equal(imports, 1);
  assert.equal(listeners.length, 1);
  assert.equal(captures.filter((x) => x.name === "$pageview").length, 1);
  listeners[0]({
    target: new Element("mailto:alex@example.com?subject=Resume%20request"),
  });
  listeners[0]({ target: new Element("/fema-go/") });
  listeners[0]({ target: new Element("https://outside.example/") });
  assert.equal(captures.length, 3);
  assert.equal(captures[1].name, "resume_request");
  assert.equal(captures[2].properties.destination_path, "/fema-go/");
  assert.ok(!JSON.stringify(captures).includes("alex@example.com"));
});

test("cookieless hash inputs survive sanitization for every captured event", () => {
  for (const event of [
    "$pageview",
    "$pageleave",
    "resume_request",
    "contact_click",
    "case_study_click",
  ]) {
    const raw = {
      event,
      timestamp: "2026-10-10T20:00:00.000Z",
      properties: {
        token: "phc_test",
        distinct_id: "$posthog_cookieless",
        $cookieless_mode: true,
        $host: "www.alexandercherry.com",
        $raw_user_agent: "Mozilla/5.0 Chrome/145.0.0.0 Safari/537.36",
        $current_url: "https://www.alexandercherry.com/?private=secret",
        email: "private@example.com",
      },
    };
    const clean = sanitizeEvent(raw);
    assert.equal(
      clean.properties.$raw_user_agent,
      raw.properties.$raw_user_agent,
      `${event}: PostHog drops cookieless events without the user agent`,
    );
    assert.equal(clean.properties.$host, raw.properties.$host);
    assert.equal(clean.properties.$cookieless_mode, true);
    assert.equal(clean.timestamp, raw.timestamp);
    assert.equal(clean.properties.email, undefined);
    assert.equal(
      clean.properties.$current_url,
      "https://www.alexandercherry.com/",
    );
  }
});
