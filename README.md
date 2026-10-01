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

## Search discovery

English pages are `/` and `/partners`; Vietnamese pages are `/vi` and `/vi/partners`. Each has its own title, description, canonical URL, and language alternate. The production Worker redirects `www` to the apex domain. `public/robots.txt` points to the sitemap; Cloudflare may prepend its content signals policy when serving it. The shadow Worker keeps all preview pages out of search results.

`public/sitemap.xml` lists the four public page URLs. Update it when an indexable page is added or removed, and keep redirected paths out. The public IndexNow verification file is `public/c853848d524236ffc3d5b8fcc5f42167.txt`; it can be used to notify Bing and other IndexNow participants when pages change. Google discovers the sitemap from `robots.txt`; a verified Search Console property also allows direct submission and indexing reports.

The attendee pages render `WebSite` and `Event` JSON-LD in their exported HTML. `app/components/EventStructuredData.tsx` includes the confirmed date, times, organizers, and free registration, with a description and registration link matching the page language. The venue is undecided, so `location` is intentionally omitted. Add the confirmed venue name and street address when announced; Google event rich-result validation will report the missing location until then. Do not use the footer's office address as the event venue.

## Roadmap booklet email

The `/api/booklet` Worker endpoint sends the download-link email through the Cloudflare Email Sending binding named `EMAIL`. It sends from `hello@vietnam-living-summit.com` with no reply-to address and includes the event-registration link. Booklet requests are not stored in D1.

The email contains a download link to `public/downloads/TUBUDD-2026-Vietnam-Relocation-Guide.pdf`; the PDF is not attached. The original PDF at the project root is left unchanged.

The sender, binding, and registration URL are configured in the Wrangler files. The sending domain must remain enabled in Cloudflare Email Sending for delivery to work.

## Event and partner registration

Both registration forms are part of the site. On deployment, `POST /api/registration` is handled by the Cloudflare Worker. Attendee submissions are validated and saved to the private Cloudflare D1 `attendee_registrations` table before the confirmation email is sent. The email subject is **Your VLS2026 Spot is Confirmed**, and replies to `hello@vietnam-living-summit.com` are forwarded to `marketing@tubudd.com` through Cloudflare Email Routing. A separate notification with the registration details is also sent to `REGISTRATION_NOTIFY_TO` (`marketing@tubudd.com`). Partner enquiries are saved to `partner_enquiries` before email delivery and receive a confirmation in the site language selected when the form is submitted (`EN` or `VI`). `PARTNER_FOLLOW_UP_DAYS` and `PARTNER_CONTACT_EMAIL` must be set before the partner form accepts submissions, so the confirmation never sends an unfilled timeline or contact address. No Google Form or Mailchimp submission is used for these registrations.

Shadow and production have separate APAC D1 databases: `vls2026-attendees-shadow` and `vls2026-attendees`. Both are bound as `REGISTRATIONS` only in their respective Workers; there is no public submission-list route. The tables contain attendee details and answers and partner enquiry details, along with submission times and email delivery status. See the `migrations` directory for the schemas. Authorized Cloudflare account users can inspect or export records in D1. There is no automatic retention or deletion rule yet.

Before deploying a fresh environment, apply its migrations with `wrangler d1 migrations apply <database-name> --remote --config <wrangler-config>`. Do not copy submission data between shadow and production.

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
