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
    body: JSON.stringify({ requestId: crypto.randomUUID(), ...body }),
  });
}

function environment() {
  const sent = [];
  const records = new Map();
  const partnerRecords = new Map();
  const database = {
    records,
    partnerRecords,
    prepare(sql) {
      return {
        bind(...values) {
          return {
            async run() {
              if (sql.startsWith("INSERT OR IGNORE")) {
                const target = sql.includes("partner_enquiries") ? partnerRecords : records;
                if (target.has(values[0])) return { success: true, meta: { changes: 0 } };
                if (target === partnerRecords) {
                  target.set(values[0], { email: values[2], company_name: values[4], team_notification_status: "pending", confirmation_status: "pending" });
                } else {
                  target.set(values[0], { email: values[2], fullName: values[1], confirmationStatus: "pending", interests: JSON.parse(values[7]) });
                }
                return { success: true, meta: { changes: 1 } };
              }
              if (sql.startsWith("UPDATE partner_enquiries")) {
                const record = partnerRecords.get(values[2]);
                const prefix = sql.includes("team_notification_status") ? "team_notification" : "confirmation";
                record[`${prefix}_status`] = values[0];
                record[`${prefix}_message_id`] = values[1];
                return { success: true, meta: { changes: 1 } };
              }
              if (sql.startsWith("UPDATE attendee_registrations")) {
                const record = records.get(values[2]);
                record.confirmationStatus = values[0];
                record.confirmationMessageId = values[1];
                return { success: true, meta: { changes: 1 } };
              }
              throw new Error("Unexpected SQL statement");
            },
            async first() {
              if (sql.includes("partner_enquiries")) return partnerRecords.get(values[0]) ?? null;
              const record = records.get(values[0]);
              return record ? { email: record.email, confirmation_status: record.confirmationStatus } : null;
            },
          };
        },
      };
    },
  };
  return {
    sent,
    records,
    partnerRecords,
    env: {
      EMAIL_FROM: "hello@vietnam-living-summit.com",
      REGISTRATION_NOTIFY_TO: "marketing@tubudd.com",
      PARTNER_FOLLOW_UP_DAYS: "3",
      PARTNER_CONTACT_EMAIL: "marketing@tubudd.com",
      REGISTRATIONS: database,
      EMAIL: { async send(email) { sent.push(email); return { messageId: `test-${sent.length}` }; } },
    },
  };
}

test("attendee registration is stored and sends the requested confirmation", async () => {
  const { sent, records, env } = environment();
  const response = await handleRegistrationRequest(request(attendee), env);
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { registered: true, emailSent: true });
  assert.equal(records.size, 1);
  assert.equal([...records.values()][0].confirmationStatus, "sent");
  assert.deepEqual([...records.values()][0].interests, attendee.interests);
  assert.equal(sent.length, 2);
  assert.equal(sent[0].to.email, attendee.email);
  assert.equal(sent[0].subject, "Your VLS2026 Spot is Confirmed");
  assert.equal(sent[0].replyTo.email, "hello@vietnam-living-summit.com");
  assert.equal(sent[0].text, `Hi Test Attendee,\n\nThank you for registering for Vietnam Living Summit 2026. We're excited to have you join us.\n\nIf you have any urgent questions about relocation, investment, or visas, please reply to this email. We'll arrange a call with the right person on our team so you can get help before the event.\n\nWe look forward to meeting you in Hanoi on 30 October 2026.\n\nBest,\nThuy Anh\nVLS2026 Organizing Team`);
  assert.equal(sent[1].to.email, "marketing@tubudd.com");
  assert.match(sent[1].text, /Consultation area: Visa & immigration/);
});

test("partner enquiry sends the selected partnership type", async () => {
  const { sent, partnerRecords, env } = environment();
  const response = await handleRegistrationRequest(request(partner), env);
  assert.equal(response.status, 200);
  assert.equal(partnerRecords.size, 1);
  assert.equal([...partnerRecords.values()][0].team_notification_status, "sent");
  assert.equal([...partnerRecords.values()][0].confirmation_status, "sent");
  assert.match(sent[0].text, /Partnership interests: Exhibiting/);
  assert.equal(sent[1].to.email, partner.email);
  assert.equal(sent[1].subject, "Welcome to the Vietnam Living Summit Alliance!");
  assert.notEqual(sent[1].subject, "Your VLS2026 Spot is Confirmed");
  assert.match(sent[1].text, /^Dear Test Partner,/);
  assert.match(sent[1].text, /We're pleased to welcome Example Co/);
  assert.match(sent[1].text, /within 3 business days/);
  assert.match(sent[1].text, /marketing@tubudd.com/);
  assert.match(sent[1].html, /<table role="presentation"/);
  assert.match(sent[1].html, /mailto:marketing@tubudd.com/);
  assert.ok(!sent[1].text.includes("[Name]"));
  assert.ok(!sent[1].text.includes("[X]"));
});

test("partner retry uses its stored delivery status without sending twice", async () => {
  const { sent, partnerRecords, env } = environment();
  const body = { ...partner, requestId: crypto.randomUUID() };
  assert.equal((await handleRegistrationRequest(request(body), env)).status, 200);
  assert.equal((await handleRegistrationRequest(request(body), env)).status, 200);
  assert.equal(partnerRecords.size, 1);
  assert.equal(sent.length, 2);
});

test("partner storage failure sends no email", async () => {
  const { sent, env } = environment();
  delete env.REGISTRATIONS;
  assert.equal((await handleRegistrationRequest(request(partner), env)).status, 503);
  assert.equal(sent.length, 0);
});

test("saved partner enquiry reports a failed confirmation accurately", async () => {
  const { sent, partnerRecords, env } = environment();
  env.EMAIL.send = async email => {
    if (email.to.email === partner.email) throw new Error("simulated send failure");
    sent.push(email);
    return { messageId: "team-1" };
  };
  const response = await handleRegistrationRequest(request(partner), env);
  assert.deepEqual(await response.json(), { sent: true, emailSent: false });
  assert.equal([...partnerRecords.values()][0].team_notification_status, "sent");
  assert.equal([...partnerRecords.values()][0].confirmation_status, "failed");
  assert.equal(sent.length, 1);
});

test("partner acknowledgement follows the selected site language", async () => {
  const { sent, env } = environment();
  assert.equal((await handleRegistrationRequest(request({ ...partner, language: "vi" }), env)).status, 200);
  assert.equal(sent[1].to.email, partner.email);
  assert.equal(sent[1].subject, "Bạn đã đăng ký tham gia thành công Liên minh Vietnam Living Summit");
  assert.match(sent[1].text, /^Kính gửi Test Partner,/);
  assert.match(sent[1].text, /có Example Co cùng xây dựng/);
  assert.match(sent[1].text, /trong vòng 3 ngày làm việc/);
  assert.match(sent[1].text, /marketing@tubudd.com/);
  assert.match(sent[1].html, /<html lang="vi">/);

  assert.equal((await handleRegistrationRequest(request({ ...partner, language: "en" }), env)).status, 200);
  assert.equal(sent[3].to.email, partner.email);
  assert.equal(sent[3].subject, "Welcome to the Vietnam Living Summit Alliance!");
  assert.match(sent[3].text, /^Dear Test Partner,/);
  assert.match(sent[3].text, /Your Alliance registration is confirmed/);
  assert.match(sent[3].html, /<html lang="en">/);
});

test("partner confirmation is withheld when its promised details are missing", async () => {
  const { sent, env } = environment();
  delete env.PARTNER_FOLLOW_UP_DAYS;
  const response = await handleRegistrationRequest(request(partner), env);
  assert.equal(response.status, 503);
  assert.equal(sent.length, 0);

  env.PARTNER_FOLLOW_UP_DAYS = "3";
  delete env.PARTNER_CONTACT_EMAIL;
  const missingContact = await handleRegistrationRequest(request(partner), env);
  assert.equal(missingContact.status, 503);
  assert.equal(sent.length, 0);
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

test("partner confirmation HTML escapes the contact and company names", async () => {
  const { sent, env } = environment();
  const response = await handleRegistrationRequest(request({ ...partner, fullName: "<Alex>", companyName: "<Company>" }), env);
  assert.equal(response.status, 200);
  assert.ok(sent[1].html.includes("Dear &lt;Alex&gt;"));
  assert.ok(sent[1].html.includes("&lt;Company&gt; to a network"));
  assert.ok(!sent[1].html.includes("<Company>"));
});

test("attendee confirmation escapes the name and a retry does not send twice", async () => {
  const { sent, records, env } = environment();
  const body = { ...attendee, requestId: crypto.randomUUID(), fullName: "<Alex>" };
  assert.equal((await handleRegistrationRequest(request(body), env)).status, 200);
  assert.ok(sent[0].html.includes("Hi &lt;Alex&gt;,"));
  assert.ok(!sent[0].html.includes("<Alex>"));
  assert.equal((await handleRegistrationRequest(request(body), env)).status, 200);
  assert.equal(sent.length, 2);
  assert.equal(records.size, 1);
});

test("attendee storage failure sends no email", async () => {
  const { sent, env } = environment();
  delete env.REGISTRATIONS;
  const response = await handleRegistrationRequest(request(attendee), env);
  assert.equal(response.status, 503);
  assert.equal(sent.length, 0);
});

test("saved registration reports a failed confirmation accurately", async () => {
  const { sent, records, env } = environment();
  env.EMAIL.send = async email => {
    if (email.to.email === attendee.email) throw new Error("simulated send failure");
    sent.push(email);
    return { messageId: "team-1" };
  };
  const response = await handleRegistrationRequest(request(attendee), env);
  assert.deepEqual(await response.json(), { registered: true, emailSent: false });
  assert.equal([...records.values()][0].confirmationStatus, "failed");
  assert.equal(sent.length, 1);
  assert.equal(sent[0].to.email, "marketing@tubudd.com");
});
