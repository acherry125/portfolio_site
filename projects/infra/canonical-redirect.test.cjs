const { test } = require("node:test");
const assert = require("node:assert/strict");
const { existsSync, readFileSync } = require("node:fs");
const { join } = require("node:path");
const vm = require("node:vm");
const file = join(__dirname, "functions/canonical-redirect.js");

function run(uri, host = "alexandercherry.com", querystring = {}) {
  const request = {
    uri,
    headers: { host: { value: host } },
    querystring,
    method: "GET",
  };
  if (!existsSync(file)) return request;
  const context = vm.createContext({});
  vm.runInContext(readFileSync(file, "utf8"), context);
  return context.handler({ request });
}

test("www and index aliases redirect directly to the same canonical page", () => {
  const response = run("/shelflife/index.html", "www.alexandercherry.com");
  assert.equal(response.statusCode, 301);
  assert.equal(
    response.headers?.location?.value,
    "https://alexandercherry.com/shelflife/",
  );
});
test("canonical pages pass through without a redirect loop", () => {
  for (const uri of [
    "/",
    "/shelflife/",
    "/the-city/",
    "/worship/",
    "/fema-go/",
    "/oneglobe/",
  ]) {
    assert.equal(run(uri).uri, uri);
  }
});
test("known pages get trailing slashes but assets and unknown pages pass through", () => {
  assert.equal(
    run("/the-city").headers?.location?.value,
    "https://alexandercherry.com/the-city/",
  );
  for (const uri of [
    "/robots.txt",
    "/sitemap.xml",
    "/portfolio/a.webp",
    "/unknown",
  ]) {
    assert.equal(run(uri).uri, uri);
  }
});
test("query values retain their encoding, repetitions and empty values", () => {
  const r = run("/index.html", "www.alexandercherry.com", {
    utm_source: { value: "linkedin" },
    q: { value: "a%26b" },
    tag: { value: "one", multiValue: [{ value: "one" }, { value: "two" }] },
    empty: { value: "" },
  });
  assert.equal(
    r.headers?.location?.value,
    "https://alexandercherry.com/?utm_source=linkedin&q=a%26b&tag=one&tag=two&empty=",
  );
});
test("legacy SALT references redirect to relevant content with query before fragment", () => {
  const r = run("/salt", "www.alexandercherry.com", {
    ref: { value: "search" },
  });
  assert.equal(
    r.headers?.location?.value,
    "https://alexandercherry.com/?ref=search#salt-title",
  );
});
test("retired Event Horizon page is gone rather than a misleading homepage redirect", () => {
  assert.equal(run("/event-horizon").statusCode, 410);
});
