import { handleBookletRequest } from "./booklet-email.mjs";
import { handleRegistrationRequest } from "./registration.mjs";

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname === "/api/booklet") return handleBookletRequest(request, env);
    if (url.pathname === "/api/registration") return handleRegistrationRequest(request, env);
    if (url.pathname === "/relocate" || url.pathname === "/relocate/") {
      url.pathname = "/";
      return Response.redirect(url, 308);
    }
    return env.ASSETS.fetch(request);
  },
};
