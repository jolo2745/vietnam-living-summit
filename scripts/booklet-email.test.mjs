import assert from "node:assert/strict";
import test from "node:test";
import { handleBookletRequest } from "./booklet-email.mjs";

const origin = "https://vietnam-living-summit-shadow.jhelyar04.workers.dev";
const downloadUrl = `${origin}/downloads/TUBUDD-2026-Vietnam-Relocation-Guide.pdf`;

function request() {
  return new Request(`${origin}/api/booklet`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Origin: origin },
    body: JSON.stringify({ email: "reader@example.com", marketingConsent: false }),
  });
}

test("booklet email sends a working download link without an attachment", async () => {
  const messages = [];
  const env = {
    REGISTRATION_URL: `${origin}/#event-signup`,
    EMAIL_FROM: "hello@vietnam-living-summit.com",
    ASSETS: { async fetch(url) {
      assert.equal(url.pathname, "/downloads/TUBUDD-2026-Vietnam-Relocation-Guide.pdf");
      return new Response("mock PDF", { status: 200 });
    } },
    EMAIL: { async send(message) {
      messages.push(message);
      return { messageId: "booklet-test-1" };
    } },
  };

  const response = await handleBookletRequest(request(), env);
  assert.equal(response.status, 200);
  assert.equal(messages.length, 1);
  assert.equal(messages[0].attachments, undefined);
  assert.match(messages[0].html, /Download the guide/);
  assert.ok(messages[0].html.includes(`href="${downloadUrl}"`));
  assert.ok(messages[0].text.includes(`Download your relocation guide: ${downloadUrl}`));
  assert.ok(messages[0].text.includes(`Register for the event: ${origin}/#event-signup`));
  assert.ok(!messages[0].html.includes("attached"));
});

test("booklet email is withheld when the download is unavailable", async () => {
  let sent = false;
  const response = await handleBookletRequest(request(), {
    REGISTRATION_URL: `${origin}/#event-signup`,
    EMAIL_FROM: "hello@vietnam-living-summit.com",
    ASSETS: { async fetch() { return new Response(null, { status: 404 }); } },
    EMAIL: { async send() { sent = true; } },
  });
  assert.equal(response.status, 503);
  assert.equal(sent, false);
});
