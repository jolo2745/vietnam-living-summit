import assert from "node:assert/strict";
import test from "node:test";
import { handleRegistrationRequest } from "./registration.mjs";

const attendee = {
  source: "people",
  fullName: "Test Attendee",
  email: "attendee@example.com",
  phone: "+84912345678",
  nationality: "UK",
  residencyStatus: "Considering a move",
  role: "Expat",
  interests: ["Visa & legal", "Healthcare"],
  heardFrom: "Friend",
  consultation: "Yes",
  consultationArea: "Visa & immigration",
  consultationQuestion: "Can I stay longer?",
  urgency: "3–6 months",
  futureUpdates: false,
};

const partner = {
  source: "business",
  fullName: "Test Partner",
  companyName: "Example Co",
  email: "partner@example.com",
  phone: "+84987654321",
  industry: "Healthcare",
  companyWebsite: "https://example.com",
  partnershipTypes: ["Exhibiting"],
  message: "We can help.",
};

let nextIp = 1;
function request(body, options = {}) {
  const ip = `192.0.2.${nextIp++}`;
  return new Request("https://vietnam-living-summit.com/api/registration", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "CF-Connecting-IP": ip,
      Origin: options.origin || "https://vietnam-living-summit.com",
    },
    body: JSON.stringify(body),
  });
}

function environment() {
  const sent = [];
  return {
    sent,
    env: {
      EMAIL_FROM: "hello@vietnam-living-summit.com",
      REGISTRATION_NOTIFY_TO: "marketing@tubudd.com",
      EMAIL: { async send(email) { sent.push(email); return { messageId: `test-${sent.length}` }; } },
    },
  };
}

test("attendee registration sends the team details and an acknowledgement", async () => {
  const { sent, env } = environment();
  const response = await handleRegistrationRequest(request(attendee), env);
  assert.equal(response.status, 200);
  assert.equal(sent.length, 2);
  assert.equal(sent[0].to.email, "marketing@tubudd.com");
  assert.match(sent[0].text, /Consultation area: Visa & immigration/);
  assert.equal(sent[1].to.email, attendee.email);
});

test("partner enquiry sends the selected partnership type", async () => {
  const { sent, env } = environment();
  const response = await handleRegistrationRequest(request(partner), env);
  assert.equal(response.status, 200);
  assert.match(sent[0].text, /Partnership interests: Exhibiting/);
  assert.equal(sent[1].to.email, partner.email);
});

test("invalid or cross-site submissions send no email", async () => {
  const { sent, env } = environment();
  assert.equal((await handleRegistrationRequest(request({ ...attendee, interests: [] }), env)).status, 400);
  assert.equal((await handleRegistrationRequest(request(partner, { origin: "https://other.example" }), env)).status, 403);
  assert.equal((await handleRegistrationRequest(request({ ...partner, partnershipTypes: [] }), env)).status, 400);
  assert.equal(sent.length, 0);
});

test("notification HTML escapes applicant input", async () => {
  const { sent, env } = environment();
  assert.equal((await handleRegistrationRequest(request({ ...partner, message: "<script>alert(1)</script>" }), env)).status, 200);
  assert.ok(sent[0].html.includes("&lt;script&gt;"));
  assert.ok(!sent[0].html.includes("<script>"));
});
