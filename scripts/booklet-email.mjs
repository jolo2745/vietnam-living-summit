const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 5;
const BOOKLET_PATH = "/downloads/TUBUDD-2026-Vietnam-Relocation-Guide.pdf";
const BOOKLET_FILENAME = "TUBUDD-2026-Vietnam-Relocation-Guide.pdf";
const MAX_ATTACHMENT_BYTES = 3 * 1024 * 1024;
const attempts = new Map();

function json(body, status = 200) {
  return Response.json(body, { status, headers: { "Cache-Control": "no-store" } });
}

function validEmail(value) {
  return typeof value === "string" && value.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function safeHttpUrl(value) {
  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:" ? url.toString() : null;
  } catch {
    return null;
  }
}

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, character => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" })[character]);
}

export function createBookletEmailHtml(registrationUrl) {
  const safeRegistrationUrl = escapeHtml(registrationUrl);

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="color-scheme" content="light">
    <meta name="supported-color-schemes" content="light">
    <title>Your Vietnam Relocation Roadmap</title>
    <style>
      body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
      table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
      table { border-collapse: collapse !important; }
      body { width: 100% !important; min-width: 100%; margin: 0 !important; padding: 0 !important; }
      a { color: inherit; }
      @media only screen and (max-width: 640px) {
        .email-shell { padding: 16px 8px !important; }
        .email-card { width: 100% !important; }
        .hero { padding: 34px 24px 36px !important; }
        .content { padding: 30px 24px 34px !important; }
        .footer { padding: 24px !important; }
        .headline { font-size: 36px !important; line-height: 39px !important; }
        .cta { display: block !important; text-align: center !important; padding: 16px 18px !important; }
      }
    </style>
  </head>
  <body style="background-color:#edf6fb;color:#182838;font-family:Arial,Helvetica,sans-serif;">
    <div style="display:none;font-size:1px;color:#edf6fb;line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden;">
      Your Vietnam relocation guide is attached and ready to explore.
    </div>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%;background-color:#edf6fb;">
      <tr>
        <td class="email-shell" align="center" style="padding:32px 12px;">
          <table class="email-card" role="presentation" width="620" cellpadding="0" cellspacing="0" border="0" style="width:620px;max-width:620px;background-color:#ffffff;border-radius:24px;overflow:hidden;box-shadow:0 14px 40px rgba(24,40,56,0.14);">
            <tr>
              <td style="height:8px;background-color:#ff611b;font-size:0;line-height:0;">&nbsp;</td>
            </tr>
            <tr>
              <td class="hero" style="padding:42px 42px 44px;background-color:#273d52;color:#ffffff;">
                <p style="margin:0 0 28px;font-size:12px;line-height:16px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#cfe0eb;">Vietnam Living Summit 2026</p>
                <h1 class="headline" style="margin:0;font-size:46px;line-height:49px;font-weight:700;letter-spacing:-1.5px;color:#ffffff;">Your Vietnam<br><span style="color:#ff8f40;">Relocation Roadmap</span></h1>
              </td>
            </tr>
            <tr>
              <td class="content" style="padding:38px 42px 42px;background-color:#ffffff;">
                <p style="margin:0 0 18px;font-size:17px;line-height:27px;color:#182838;">Thank you for your interest in Vietnam Living Summit 2026.</p>
                <p style="margin:0 0 28px;font-size:17px;line-height:27px;color:#536471;">Your relocation guide is attached to this email. Inside, you’ll find practical guidance to help you prepare for living in Vietnam.</p>
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%;margin:0 0 30px;background-color:#edf6fb;border:1px solid #d7e8f2;border-radius:16px;">
                  <tr>
                    <td style="padding:20px 22px;">
                      <p style="margin:0 0 5px;font-size:11px;line-height:15px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#b64012;">Attached guide</p>
                      <p style="margin:0;font-size:16px;line-height:23px;font-weight:700;color:#182838;">The 2026 Relocate to Vietnam Guide &amp; Checklist</p>
                    </td>
                  </tr>
                </table>
                <p style="margin:0 0 18px;font-size:16px;line-height:25px;color:#536471;">Ready to join us? Reserve your place at the summit.</p>
                <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                  <tr>
                    <td style="border-radius:999px;background-color:#ff611b;">
                      <a class="cta" href="${safeRegistrationUrl}" target="_blank" style="display:inline-block;padding:16px 26px;border:1px solid #ff611b;border-radius:999px;font-size:15px;line-height:18px;font-weight:700;text-decoration:none;color:#ffffff;background-color:#ff611b;">Register for the summit&nbsp;&nbsp;→</a>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td class="footer" style="padding:26px 42px;background-color:#182838;">
                <p style="margin:0;font-size:12px;line-height:19px;color:#c0cdd6;">Vietnam Living Summit 2026 · Hanoi · October 2026</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

function overLimit(request) {
  const now = Date.now();
  const key = request.headers.get("CF-Connecting-IP") || "local";
  const current = attempts.get(key);
  if (!current || now - current.startedAt > WINDOW_MS) {
    attempts.set(key, { count: 1, startedAt: now });
    return false;
  }
  current.count += 1;
  return current.count > MAX_REQUESTS;
}

export async function handleBookletRequest(request, env) {
  if (request.method !== "POST") return json({ message: "Method not allowed." }, 405);

  const requestUrl = new URL(request.url);
  const origin = request.headers.get("Origin");
  if (origin && new URL(origin).host !== requestUrl.host) return json({ message: "Invalid request origin." }, 403);
  if (overLimit(request)) return json({ message: "Too many requests. Please try again in a few minutes." }, 429);

  let body;
  try {
    body = await request.json();
  } catch {
    return json({ message: "Please enter a valid email address." }, 400);
  }

  if (body.website) return json({ sent: true });
  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  if (!validEmail(email)) return json({ message: "Please enter a valid email address." }, 400);

  const registrationUrl = safeHttpUrl(env.REGISTRATION_URL);
  if (!env.EMAIL || !env.EMAIL_FROM || !registrationUrl || !env.ASSETS) {
    return json({ message: "Email delivery is still being connected. Please try again soon." }, 503);
  }

  const bookletResponse = await env.ASSETS.fetch(new URL(BOOKLET_PATH, request.url));
  if (!bookletResponse.ok) {
    console.error("Booklet asset unavailable", bookletResponse.status);
    return json({ message: "The booklet is temporarily unavailable. Please try again." }, 503);
  }
  const bookletContent = await bookletResponse.arrayBuffer();
  if (bookletContent.byteLength > MAX_ATTACHMENT_BYTES) {
    console.error("Booklet attachment is too large", bookletContent.byteLength);
    return json({ message: "The booklet is temporarily unavailable. Please try again." }, 503);
  }

  let sendResult;
  try {
    sendResult = await env.EMAIL.send({
      from: { email: env.EMAIL_FROM, name: "Vietnam Living Summit" },
      to: { email, name: "" },
      subject: "Your Vietnam Relocation Roadmap",
      html: createBookletEmailHtml(registrationUrl),
      text: `Your Vietnam Relocation Roadmap\n\nYour relocation guide booklet is attached to this email.\n\nRegister for the event: ${registrationUrl}`,
      attachments: [{
        content: bookletContent,
        filename: BOOKLET_FILENAME,
        type: "application/pdf",
        disposition: "attachment",
      }],
    });
  } catch (error) {
    console.error("Booklet email delivery failed", error?.code, error?.message);
    return json({ message: "We could not send the booklet right now. Please try again." }, 502);
  }

  if (!sendResult || typeof sendResult.messageId !== "string" || !sendResult.messageId) {
    console.error("Cloudflare accepted the email call without returning a message ID");
    return json({ message: "We could not confirm the booklet email. Please try again." }, 502);
  }

  console.log("Booklet email accepted", sendResult.messageId);
  return json({ sent: true, messageId: sendResult.messageId });
}
