import { handleBookletRequest } from "./booklet-email.mjs";

// Shadow-only routing: production continues to serve static assets directly.
export default {
  async fetch(request, env) {
    const pathname = new URL(request.url).pathname;
    const response = pathname === "/api/booklet"
      ? await handleBookletRequest(request, env)
      : pathname === "/robots.txt"
      ? new Response("User-agent: *\nDisallow: /\n", {
          headers: { "Content-Type": "text/plain; charset=utf-8" },
        })
      : await env.ASSETS.fetch(request);

    const preview = new Response(response.body, response);
    preview.headers.set("X-Robots-Tag", "noindex, nofollow, noarchive");
    return preview;
  },
};
