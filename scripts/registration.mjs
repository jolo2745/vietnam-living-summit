const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 5;
const MAX_BODY_BYTES = 12_000;
const attempts = new Map();

const STATUS_OPTIONS = ["Considering a move", "Just arrived (0–6 months)", "Living here (6 months–2 years)", "Long-term resident (2+ years)", "Other"];
const ROLE_OPTIONS = ["Expat", "Digital nomad", "Foreign investor", "Business owner", "Teacher", "Other"];
const INTEREST_OPTIONS = ["Visa & legal", "Real estate & housing", "Business setup", "Healthcare", "Networking", "Education / schooling"];
const DISCOVERY_OPTIONS = ["Instagram", "Facebook Page", "TikTok", "Friend", "TUBUDD website", "Other"];
const CONSULTATION_AREAS = ["Visa & immigration", "Business setup / company formation", "Real estate / housing", "Healthcare", "Banking & finance", "Tax", "Other"];
const PARTNERSHIP_TYPES = ["Sponsorship", "Exhibiting", "Service alliance", "Speaking"];

function json(body, status = 200) {
  return Response.json(body, { status, headers: { "Cache-Control": "no-store" } });
}

function text(value, maxLength, required = false) {
  if (typeof value !== "string" || value.length > maxLength) return null;
  const cleaned = value.trim();
  return required && !cleaned ? null : cleaned;
}

function selected(value, choices, required = false) {
  const cleaned = text(value, 100, required);
  return cleaned !== null && (!cleaned && !required || choices.includes(cleaned)) ? cleaned : null;
}

function selectedMany(value, choices) {
  return Array.isArray(value) && value.length > 0 && value.length <= choices.length &&
    value.every(item => typeof item === "string" && choices.includes(item)) &&
    new Set(value).size === value.length ? value : null;
}

function validEmail(value) {
  return typeof value === "string" && value.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, character => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" })[character]);
}

function overLimit(request) {
  const key = request.headers.get("CF-Connecting-IP") || "local";
  const now = Date.now();
  const current = attempts.get(key);
  if (!current || now - current.startedAt > WINDOW_MS) {
    attempts.set(key, { count: 1, startedAt: now });
    return false;
  }
  current.count += 1;
  return current.count > MAX_REQUESTS;
}

function validate(body) {
  if (!body || (body.source !== "people" && body.source !== "business")) return null;
  const language = body.language === "vi" ? "vi" : "en";
  const fullName = text(body.fullName, 100, true);
  const email = text(body.email, 254, true)?.toLowerCase();
  const phone = text(body.phone, 40, true);
  if (!fullName || !validEmail(email) || !phone) return null;

  if (body.source === "people") {
    const nationality = text(body.nationality, 80, true);
    const residencyStatus = selected(body.residencyStatus, STATUS_OPTIONS, true);
    const role = selected(body.role, ROLE_OPTIONS, true);
    const interests = selectedMany(body.interests, INTEREST_OPTIONS);
    const heardFrom = selected(body.heardFrom, DISCOVERY_OPTIONS, true);
    const consultation = selected(body.consultation, ["Yes", "No"], true);
    if (!nationality || !residencyStatus || !role || !interests || !heardFrom || !consultation) return null;

    const consultationArea = consultation === "Yes" ? selected(body.consultationArea || "", CONSULTATION_AREAS) : "";
    const consultationQuestion = consultation === "Yes" ? text(body.consultationQuestion || "", 2000) : "";
    const urgency = consultation === "Yes" ? selected(body.urgency || "", ["Exploring", "3–6 months", "Urgent"]) : "";
    if (consultationArea === null || consultationQuestion === null || urgency === null) return null;
    return {
      source: "people", language, fullName, email, phone, nationality, residencyStatus, role,
      interests, heardFrom, futureUpdates: body.futureUpdates === true, consultation,
      consultationArea, consultationQuestion, urgency,
    };
  }

  const companyName = text(body.companyName, 120, true);
  const industry = text(body.industry, 100, true);
  const companyWebsite = text(body.companyWebsite || "", 300);
  const partnershipTypes = selectedMany(body.partnershipTypes, PARTNERSHIP_TYPES);
  const message = text(body.message || "", 2000);
  if (!companyName || !industry || companyWebsite === null || !partnershipTypes || message === null) return null;
  if (companyWebsite) {
    try {
      const url = new URL(companyWebsite);
      if (!(["https:", "http:"].includes(url.protocol))) return null;
    } catch { return null; }
  }
  return { source: "business", language, fullName, email, phone, companyName, industry, companyWebsite, partnershipTypes, message };
}

function notification(registration) {
  const isBusiness = registration.source === "business";
  const rows = isBusiness ? [
    ["Company", registration.companyName],
    ["Contact", registration.fullName],
    ["Email", registration.email],
    ["Phone", registration.phone],
    ["Industry", registration.industry],
    ["Website", registration.companyWebsite],
    ["Partnership interests", registration.partnershipTypes.join(", ")],
    ["Message", registration.message],
  ] : [
    ["Name", registration.fullName],
    ["Email", registration.email],
    ["Phone", registration.phone],
    ["Nationality", registration.nationality],
    ["Status in Vietnam", registration.residencyStatus],
    ["Role", registration.role],
    ["Interests", registration.interests.join(", ")],
    ["Heard from", registration.heardFrom],
    ["Future event updates", registration.futureUpdates ? "Yes" : "No"],
    ["Consultation", registration.consultation],
    ["Consultation area", registration.consultationArea],
    ["Question", registration.consultationQuestion],
    ["Urgency", registration.urgency],
  ];
  const title = isBusiness ? "New partnership enquiry" : "New attendee registration";
  return {
    subject: `Vietnam Living Summit 2026 — ${title}`,
    text: [title, "", ...rows.map(([label, value]) => `${label}: ${value || "—"}`)].join("\n"),
    html: `<h1>${title}</h1><dl>${rows.map(([label, value]) => `<dt><strong>${label}</strong></dt><dd style="white-space:pre-wrap;margin:0 0 12px">${escapeHtml(value || "—")}</dd>`).join("")}</dl>`,
  };
}

export async function handleRegistrationRequest(request, env) {
  if (request.method !== "POST") return json({ message: "Method not allowed." }, 405);
  const requestUrl = new URL(request.url);
  const origin = request.headers.get("Origin");
  if (origin) {
    try {
      if (new URL(origin).origin !== requestUrl.origin) return json({ message: "Invalid request origin." }, 403);
    } catch { return json({ message: "Invalid request origin." }, 403); }
  }
  if (overLimit(request)) return json({ message: "Too many requests. Please try again later." }, 429);
  if (Number(request.headers.get("Content-Length")) > MAX_BODY_BYTES) return json({ message: "Form is too large." }, 413);

  const raw = await request.text();
  if (new TextEncoder().encode(raw).byteLength > MAX_BODY_BYTES) return json({ message: "Form is too large." }, 413);
  let body;
  try { body = JSON.parse(raw); } catch { return json({ message: "Invalid form data." }, 400); }
  if (body?.trapWebsite) return json({ sent: true });
  const registration = validate(body);
  if (!registration) return json({ message: "Please check the required fields." }, 400);
  if (!env.EMAIL || !env.EMAIL_FROM || !env.REGISTRATION_NOTIFY_TO) return json({ message: "Registration delivery is not connected." }, 503);

  const details = notification(registration);
  let result;
  try {
    result = await env.EMAIL.send({
      from: { email: env.EMAIL_FROM, name: "Vietnam Living Summit" },
      to: { email: env.REGISTRATION_NOTIFY_TO, name: "Event team" },
      ...details,
    });
  } catch (error) {
    console.error("Registration delivery failed", error?.code, error?.message);
    return json({ message: "We could not send your registration right now." }, 502);
  }
  if (!result?.messageId) return json({ message: "We could not confirm your registration right now." }, 502);

  try {
    const vietnamese = registration.language === "vi";
    const subject = registration.source === "business"
      ? vietnamese ? "Đã nhận thông tin hợp tác của bạn" : "We received your partnership enquiry"
      : vietnamese ? "Đã nhận đăng ký Vietnam Living Summit" : "We received your Vietnam Living Summit registration";
    const followUp = registration.source === "business"
      ? vietnamese ? "thông tin hợp tác" : "partnership enquiry"
      : vietnamese ? "thông tin đăng ký" : "registration";
    const acknowledgement = vietnamese
      ? `Chào ${registration.fullName},\n\nCảm ơn bạn đã quan tâm đến Vietnam Living Summit 2026. Chúng tôi đã nhận được ${followUp} của bạn và sẽ liên hệ về các bước tiếp theo.\n\nĐội ngũ Vietnam Living Summit`
      : `Hi ${registration.fullName},\n\nThank you for your interest in Vietnam Living Summit 2026. We received your ${followUp} and will follow up with the next steps.\n\nVietnam Living Summit team`;
    await env.EMAIL.send({
      from: { email: env.EMAIL_FROM, name: "Vietnam Living Summit" },
      to: { email: registration.email, name: registration.fullName },
      subject,
      text: acknowledgement,
      html: `<div style="white-space:pre-line;font-family:Arial,sans-serif;line-height:1.6">${escapeHtml(acknowledgement).replaceAll("\n", "<br>")}</div>`,
    });
  } catch (error) {
    console.error("Registration acknowledgement failed", error?.code, error?.message);
  }

  console.log("Registration accepted", result.messageId, registration.source);
  return json({ sent: true });
}
