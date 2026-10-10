import { test } from "node:test";
import assert from "node:assert/strict";
import { analyticsEvent } from "../projects/web/src/lib/analytics-events.ts";

test("resume requests are distinct from ordinary contact clicks", () => {
  assert.equal(
    analyticsEvent(
      "mailto:alexcherry.dev@gmail.com?subject=R%C3%A9sum%C3%A9%20request",
    ),
    "resume_request",
  );
  assert.equal(
    analyticsEvent("mailto:alexcherry.dev@gmail.com"),
    "contact_click",
  );
});
test("case study events classify known internal destinations only", () => {
  for (const page of [
    "shelflife",
    "fema-go",
    "oneglobe",
    "the-city",
    "worship",
  ])
    assert.equal(
      analyticsEvent("/" + page + "/?ref=linkedin"),
      "case_study_click",
    );
  assert.equal(analyticsEvent("https://example.com/shelflife/"), undefined);
  assert.equal(analyticsEvent("#contact"), undefined);
});
test("malformed links do not throw or prevent normal navigation", () => {
  assert.equal(analyticsEvent("https://["), undefined);
});
