# Responsive audit — 2 October 2026

Checked the attendee and partner pages in English and Vietnamese in the shared Chromium browser. Each page was loaded in a same-origin iframe with a real CSS viewport at the requested dimensions. This exercises viewport media queries, viewport units, scrolling, and the real hydrated website without changing the shared browser's other tabs.

## Coverage

- 25 screen configurations per page: 100 layout checks, from 320 to 1920 CSS pixels wide, including tablet/desktop breakpoint boundaries and 844 × 390 landscape.
- Both native registration forms, in both languages: 52 additional checks of step two, including optional attendee consultation fields.
- Mobile navigation opens, closes with Escape and the backdrop, locks/restores scrolling, and closes when resized to desktop.
- Required fields stop progression when empty. Continue and Back work and retain entered details.
- English/Vietnamese switching preserves the partner route and section anchor.
- All tested same-page anchor links have targets.
- No broken or pending site images after scrolling each page.
- All 12 industry cards are reachable. Rows contain 1, 2 or 3 cards as appropriate, with equal heights within each row.
- All three social profile cards remain accessible through their horizontal scroll area at phone width.

## Fixes

- Stack the “Who we are” layout at 920px and below, before its two columns exceed the available width.
- Use the mobile navigation at 1240px and below, giving the longer Vietnamese labels enough separation from the partner logos.
- Keep the navigation's resize behaviour in sync with that CSS breakpoint.
- Allow long industry and event overview headings to wrap within their cards.
- Reduce the partner hero's second statistic slightly on narrow screens so the full number fits.

The final layout checks found no unexpected horizontal overflow, clipped text, or header overlap. Decorative pseudo-elements and intentional social/carousel scrolling are excluded from text clipping checks. Mobile and short landscape pages scroll vertically to preserve all content.

## Evidence

- [Before measurements](before.json)
- [Final measurements](after.json)
- [Second-step measurements](step-two.json)
- [Phone partner hero](phone-partner-hero-cropped.png)
- [Tablet Who we are](tablet-who-we-are-cropped.png)
- [Vietnamese desktop](desktop-vietnamese-cropped.png)

## Limits

These are Chromium viewport and interaction checks, not physical iPhone/Android, Safari, or Firefox tests. Third-party iframe interiors are controlled by their providers and could not be inspected across origins. No final registrations were submitted, and this audit did not send emails or create database records.
