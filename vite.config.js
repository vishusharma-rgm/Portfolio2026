import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

function codeforcesDevApi() {
  return {
    name: "codeforces-dev-api",
    configureServer(server) {
      server.middlewares.use("/api/codeforces", async (request, response) => {
        const handle = new URL(request.url, "http://localhost").searchParams.get("handle");
        if (!handle) { response.statusCode = 400; response.end(JSON.stringify({ status: "FAILED" })); return; }
        try {
          const base = "https://codeforces.com/api";
          const [infoResponse, ratingResponse, statusResponse] = await Promise.all([
            fetch(`${base}/user.info?handles=${encodeURIComponent(handle)}`),
            fetch(`${base}/user.rating?handle=${encodeURIComponent(handle)}`),
            fetch(`${base}/user.status?handle=${encodeURIComponent(handle)}&from=1&count=1000`),
          ]);
          const [info, rating, submissions] = await Promise.all([infoResponse.json(), ratingResponse.json(), statusResponse.json()]);
          const user = info.result?.[0];
          if (info.status !== "OK" || submissions.status !== "OK" || !user) throw new Error("Codeforces unavailable");
          const counts = submissions.result.reduce((result, submission) => { const key = new Date(submission.creationTimeSeconds * 1000).toISOString().slice(0, 10); result[key] = (result[key] || 0) + 1; return result; }, {});
          const maxRating = rating.status === "OK" && rating.result.length ? Math.max(...rating.result.map((contest) => contest.newRating)) : user.maxRating;
          response.setHeader("Content-Type", "application/json");
          response.end(JSON.stringify({ status: "OK", counts, stats: [["Rating", user.rating || "-"], ["Max rating", maxRating || "-"], ["Rank", user.rank || "-"], ["Contests", rating.status === "OK" ? rating.result.length : "-"], ["Submissions", submissions.result.length]] }));
        } catch { response.statusCode = 502; response.end(JSON.stringify({ status: "FAILED" })); }
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), codeforcesDevApi()],
  server: {
    proxy: {
      "/api/leetcode": {
        target: "https://leetcode.com",
        changeOrigin: true,
        secure: true,
        rewrite: () => "/graphql",
      },
    },
  },
});
