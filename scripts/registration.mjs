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

function validRequestId(value) {
  return typeof value === "string" && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(value);
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

function attendeeConfirmation(name) {
  const body = `Hi ${name},\n\nThank you for registering for Vietnam Living Summit 2026. We're excited to have you join us.\n\nIf you have any urgent questions about relocation, investment, or visas, please reply to this email. We'll arrange a call with the right person on our team so you can get help before the event.\n\nWe look forward to meeting you in Hanoi on 30 October 2026.\n\nBest,\nThuy Anh\nVLS2026 Organizing Team`;
  return {
    subject: "Your VLS2026 Spot is Confirmed",
    text: body,
    html: `<div style="font-family:Arial,sans-serif;line-height:1.6;color:#132d3e">${escapeHtml(body).replaceAll("\n", "<br>")}</div>`,
  };
}

function partnerConfirmation(registration, followUpDays, contactEmail) {
  const vietnamese = registration.language === "vi";
  const body = vietnamese
    ? `Kính gửi ${registration.fullName},\n\nCảm ơn quý đối tác đã tham gia Liên minh Vietnam Living Summit! Chúng tôi rất vui khi có ${registration.companyName} đồng hành cùng chúng tôi xây dựng một hệ sinh thái đối tác dịch vụ uy tín, dài hạn dành cho người nước ngoài tại Việt Nam.\n\nLiên minh không chỉ đồng hành cùng nhau trong sự kiện lần này mà là khởi đầu cho một mối quan hệ hợp tác lâu dài, nơi chúng ta kết nối cộng đồng và cùng nhau phát triển trong việc phục vụ người nước ngoài, nhà đầu tư và tất cả những ai đang xây dựng cuộc sống tại đây.\n\nĐăng ký tham gia liên minh của quý công ty đã được xác nhận\nYêu cầu tham gia liên minh của bạn đã được tiếp nhận và xử lý.\n\n--------------------------\nVietnam Living Summit 2026\n📅 Ngày 30 tháng 10, 2026\n📍 Hà Nội\n\n--------------------------\nCác bước tiếp theo sau email này:\nBạn sẽ được thêm vào nhóm Zalo chung của Liên minh, nơi chúng tôi sẽ chia sẻ các bước tiếp theo và cùng phối hợp\nĐội ngũ chúng tôi sẽ liên hệ trong vòng ${followUpDays} ngày làm việc để trao đổi cụ thể về cách hợp tác — tại sự kiện và sau đó\nBạn sẽ nhận được thông tin chi tiết và vé sự kiện gần ngày diễn ra\n\nCó thắc mắc?\nLiên hệ với chúng tôi bất cứ lúc nào:\n📞 Ms. Thuý Anh — +84 966 743 471\n✉️ ${contactEmail}\n\nRất mong được cùng nhau xây dựng một liên minh bền vững và tạo ra nhiều giá trị.\nTrân trọng,\nThuy Anh\nVLS 2026 Organizing Team`
    : `Dear ${registration.fullName},\n\nThank you for joining the Vietnam Living Summit Alliance! We're excited to have ${registration.companyName} on board as we build a long-term ecosystem of trusted service partners for foreign residents in Vietnam.\n\nThe Alliance isn't just about standing together for this one event — it's the start of an ongoing partnership, where we connect our communities and grow together in serving expats, investors, and everyone building a life here.\n\nYour alliance registration has been confirmed\nYour request to join the Alliance has been received and processed.\n\n--------------------------\nVietnam Living Summit 2026\n📅 October 30, 2026\n📍 Hanoi\n\n--------------------------\nWhat happens next:\nYou'll be added to our Alliance Zalo group, where we'll share next steps and coordinate together\nOur team will reach out within ${followUpDays} business days to walk through how we'll collaborate — at the event and beyond\nYou'll receive event details and passes closer to the date\n\nHave questions?\nFeel free to reach out anytime:\n📞 Ms. Thuý Anh — +84 966 743 471\n✉️ ${contactEmail}\n\nWe look forward to building a lasting alliance together and creating great value along the way.\nWarm regards,\nThuy Anh\nVLS 2026 Organizing Team`;
  return {
    subject: vietnamese
      ? "Bạn đã đăng ký tham gia thành công Liên minh Vietnam Living Summit"
      : "Welcome to the Vietnam Living Summit Alliance!",
    text: body,
    html: `<div style="font-family:Arial,sans-serif;line-height:1.6;color:#132d3e">${escapeHtml(body).replaceAll("\n", "<br>")}</div>`,
  };
}

async function saveAttendee(database, id, registration) {
  const result = await database.prepare(`INSERT OR IGNORE INTO attendee_registrations (
    id, full_name, email, phone, nationality, residency_status, role, interests_json,
    heard_from, future_updates, consultation, consultation_area, consultation_question,
    urgency, language
  ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`)
    .bind(id, registration.fullName, registration.email, registration.phone, registration.nationality,
      registration.residencyStatus, registration.role, JSON.stringify(registration.interests),
      registration.heardFrom, registration.futureUpdates ? 1 : 0, registration.consultation,
      registration.consultationArea, registration.consultationQuestion, registration.urgency,
      registration.language)
    .run();
  if (!result?.success) throw new Error("Attendee registration insert failed");
  if (result.meta?.changes) return { created: true, confirmationStatus: "pending" };

  const existing = await database.prepare("SELECT email, confirmation_status FROM attendee_registrations WHERE id = ?")
    .bind(id).first();
  if (!existing || existing.email !== registration.email) return null;
  return { created: false, confirmationStatus: existing.confirmation_status };
}

async function updateConfirmation(database, id, status, messageId = null) {
  const result = await database.prepare("UPDATE attendee_registrations SET confirmation_status = ?, confirmation_message_id = ? WHERE id = ?")
    .bind(status, messageId, id).run();
  if (!result?.success || result.meta?.changes !== 1) throw new Error("Confirmation status update failed");
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
  if (!env.EMAIL || !env.EMAIL_FROM) return json({ message: "Registration delivery is not connected." }, 503);

  if (registration.source === "people") {
    if (!validRequestId(body.requestId)) return json({ message: "Invalid registration ID." }, 400);
    if (!env.REGISTRATIONS) return json({ message: "Registration storage is not connected." }, 503);
    let saved;
    try {
      saved = await saveAttendee(env.REGISTRATIONS, body.requestId, registration);
    } catch (error) {
      console.error("Attendee registration storage failed", error?.message);
      return json({ message: "We could not save your registration right now." }, 503);
    }
    if (!saved) return json({ message: "Registration ID already used." }, 409);

    let emailSent = saved.confirmationStatus === "sent";
    if (!emailSent) {
      try {
        const result = await env.EMAIL.send({
          from: { email: env.EMAIL_FROM, name: "Thuy Anh | VLS2026" },
          to: { email: registration.email, name: registration.fullName },
          replyTo: { email: env.EMAIL_FROM, name: "Thuy Anh" },
          ...attendeeConfirmation(registration.fullName),
        });
        if (!result?.messageId) throw new Error("Confirmation message ID missing");
        emailSent = true;
        await updateConfirmation(env.REGISTRATIONS, body.requestId, "sent", result.messageId);
      } catch (error) {
        console.error("Attendee confirmation failed", error?.code, error?.message);
        if (!emailSent) {
          try { await updateConfirmation(env.REGISTRATIONS, body.requestId, "failed"); }
          catch (storageError) { console.error("Confirmation status update failed", storageError?.message); }
        }
      }
    }

    if (saved.created && env.REGISTRATION_NOTIFY_TO) {
      try {
        await env.EMAIL.send({
          from: { email: env.EMAIL_FROM, name: "Vietnam Living Summit" },
          to: { email: env.REGISTRATION_NOTIFY_TO, name: "Event team" },
          ...notification(registration),
        });
      } catch (error) {
        console.error("Attendee team notification failed", error?.code, error?.message);
      }
    }
    console.log("Attendee registration saved", body.requestId, emailSent ? "confirmed" : "email_failed");
    return json({ registered: true, emailSent });
  }

  if (!env.REGISTRATION_NOTIFY_TO) return json({ message: "Registration delivery is not connected." }, 503);
  const followUpDays = Number(env.PARTNER_FOLLOW_UP_DAYS);
  const contactEmail = typeof env.PARTNER_CONTACT_EMAIL === "string" ? env.PARTNER_CONTACT_EMAIL.trim() : "";
  if (!Number.isSafeInteger(followUpDays) || followUpDays < 1 || !validEmail(contactEmail)) {
    return json({ message: "Partnership confirmation is not configured." }, 503);
  }

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
    await env.EMAIL.send({
      from: { email: env.EMAIL_FROM, name: "Vietnam Living Summit" },
      to: { email: registration.email, name: registration.fullName },
      ...partnerConfirmation(registration, followUpDays, contactEmail),
    });
  } catch (error) {
    console.error("Registration acknowledgement failed", error?.code, error?.message);
  }

  console.log("Registration accepted", result.messageId, registration.source);
  return json({ sent: true });
}
