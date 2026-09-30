# Vietnam Living Summit 2026

Public website for Vietnam Living Summit 2026, with dedicated experiences for people relocating to Vietnam and businesses joining the TUBUDD alliance.

## Local development

```bash
npm install
npm run dev
```

Open `http://127.0.0.1:3000`.

## Build and deploy

The site is exported as static files and deployed through Cloudflare Workers Static Assets.

```bash
npm run build
npm run deploy
```

## Roadmap booklet email

The `/api/booklet` Worker endpoint uses the Cloudflare Email Sending binding named `EMAIL`. It sends from `hello@vietnam-living-summit.com` with no reply-to address and includes the event-registration link.

The email-ready PDF is served from `public/downloads/TUBUDD-2026-Vietnam-Relocation-Guide.pdf` and attached to each message. It is an optimized copy of the original source document so the complete message remains below Cloudflare's 5 MiB limit. The original PDF at the project root is left unchanged.

The sender, binding, and registration URL are configured in the Wrangler files. The sending domain must remain enabled in Cloudflare Email Sending for delivery to work.

## Event and partner registration

Both registration forms are part of the site. On deployment, `POST /api/registration` is handled by the Cloudflare Worker: it validates the form, emails the details to `REGISTRATION_NOTIFY_TO`, and sends a short acknowledgement to the applicant. The Wrangler configurations set the recipient to `marketing@tubudd.com`. No Google Form or Mailchimp submission is used for these registrations.

The Next.js local preview is a static export and does not serve the Worker API. It shows and validates the forms in the browser; submission can be tested through the Worker handler or after a Worker deployment.
# Monthly email subscriptions

The booklet form can add people who explicitly opt in to a Mailchimp audience with `pending` status, which triggers the confirmation step before they become marketing subscribers.

Configure these Worker secrets for both the production and shadow Workers:

```bash
npx wrangler secret put MAILCHIMP_API_KEY
npx wrangler secret put MAILCHIMP_SERVER_PREFIX
npx wrangler secret put MAILCHIMP_AUDIENCE_ID
```

Use the Mailchimp audience to create and send monthly campaigns. Keep the unsubscribe link enabled in every campaign.
