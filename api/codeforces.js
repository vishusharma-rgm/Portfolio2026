export default async function handler(request, response) {
  const handle = request.query?.handle || new URL(request.url, "http://localhost").searchParams.get("handle");
  if (!handle) return response.status(400).json({ status: "FAILED", comment: "Missing handle" });
  try {
    const [infoResponse, ratingResponse, statusResponse] = await Promise.all([
      fetch(`https://codeforces.com/api/user.info?handles=${encodeURIComponent(handle)}`),
      fetch(`https://codeforces.com/api/user.rating?handle=${encodeURIComponent(handle)}`),
      fetch(`https://codeforces.com/api/user.status?handle=${encodeURIComponent(handle)}&from=1&count=1000`),
    ]);
    const [info, rating, submissions] = await Promise.all([infoResponse.json(), ratingResponse.json(), statusResponse.json()]);
    if (info.status !== "OK" || submissions.status !== "OK") return response.status(502).json({ status: "FAILED" });
    const counts = {};
    submissions.result.forEach((submission) => { const key = new Date(submission.creationTimeSeconds * 1000).toISOString().slice(0, 10); counts[key] = (counts[key] || 0) + 1; });
    const user = info.result[0];
    const maxRating = rating.status === "OK" && rating.result.length ? Math.max(...rating.result.map((contest) => contest.newRating)) : user.maxRating;
    return response.json({ status: "OK", counts, stats: [["Rating", user.rating || "-"], ["Max rating", maxRating || "-"], ["Rank", user.rank || "-"], ["Contests", rating.status === "OK" ? rating.result.length : "-"], ["Submissions", submissions.result.length]] });
  } catch {
    return response.status(502).json({ status: "FAILED" });
  }
}
