import { handleBookletRequest } from "./booklet-email.mjs";

export default {
  async fetch(request, env) {
    if (new URL(request.url).pathname === "/api/booklet") return handleBookletRequest(request, env);
    return env.ASSETS.fetch(request);
  },
};
