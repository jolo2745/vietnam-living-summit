import { handleBookletRequest } from "./booklet-email.mjs";
import { handleRegistrationRequest } from "./registration.mjs";

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.hostname === "www.vietnam-living-summit.com") {
      url.hostname = "vietnam-living-summit.com";
      return Response.redirect(url, 308);
    }
    if (url.pathname === "/api/booklet") return handleBookletRequest(request, env);
    if (url.pathname === "/api/registration") return handleRegistrationRequest(request, env);
    if (url.pathname === "/relocate" || url.pathname === "/relocate/") {
      url.pathname = "/";
      return Response.redirect(url, 308);
    }
    if (url.pathname === "/robots.txt") {
      const original = await env.ASSETS.fetch(request);
      if (!original.ok) return original;
      const text = await original.text();
      const headers = new Headers(original.headers);
      headers.delete("Content-Length");
      headers.delete("ETag");
      headers.set("Content-Type", "text/plain; charset=utf-8");
      const sitemap = "Sitemap: https://vietnam-living-summit.com/sitemap.xml";
      return new Response(`${text.trimEnd()}\n${text.includes(sitemap) ? "" : `${sitemap}\n`}`, {
        status: original.status,
        headers,
      });
    }
    return env.ASSETS.fetch(request);
  },
};
