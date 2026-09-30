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

Both registration forms are part of the site. On deployment, `POST /api/registration` is handled by the Cloudflare Worker. Attendee submissions are validated and saved to the private Cloudflare D1 `attendee_registrations` table before the confirmation email is sent. The email subject is **Your VLS2026 Spot is Confirmed**, and replies to `hello@vietnam-living-summit.com` are forwarded to `marketing@tubudd.com` through Cloudflare Email Routing. A separate notification with the registration details is also sent to `REGISTRATION_NOTIFY_TO` (`marketing@tubudd.com`). Partner enquiries still use the existing email notification and acknowledgement flow. No Google Form or Mailchimp submission is used for these registrations.

Shadow and production have separate APAC D1 databases: `vls2026-attendees-shadow` and `vls2026-attendees`. Both are bound as `REGISTRATIONS` only in their respective Workers; there is no public attendee-list route. The table contains contact details, answers, optional consultation requests, the future-updates choice, registration time, and confirmation delivery status. See `migrations/0001_attendee_registrations.sql` for the exact schema. Authorized Cloudflare account users can inspect or export records in D1. There is no automatic retention or deletion rule yet.

Before deploying a fresh environment, apply its migration with `wrangler d1 migrations apply <database-name> --remote --config <wrangler-config>`. The two databases above were created and migrated on 2026-09-30; both were empty after migration. Do not copy attendee data between shadow and production.

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
