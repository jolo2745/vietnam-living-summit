import { handleBookletRequest } from "./booklet-email.mjs";

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const pathname = url.pathname;
    if (pathname === "/relocate" || pathname === "/relocate/") {
      url.pathname = "/";
      return new Response(null, {
        status: 308,
        headers: {
          Location: url.toString(),
          "X-Robots-Tag": "noindex, nofollow, noarchive",
        },
      });
    }
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
