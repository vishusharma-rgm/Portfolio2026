const defaultQuery = "query userProfileCalendar($username: String!, $year: Int) { matchedUser(username: $username) { userCalendar(year: $year) { submissionCalendar } } }";

export default async function handler(request, response) {
  if (request.method !== "POST") {
    response.status(405).json({ error: "Method not allowed" });
    return;
  }

  try {
    const body = typeof request.body === "string" ? JSON.parse(request.body) : request.body || {};
    const upstream = await fetch("https://leetcode.com/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json", Origin: "https://leetcode.com", Referer: "https://leetcode.com/" },
      body: JSON.stringify({ operationName: body.operationName || "userProfileCalendar", query: body.query || defaultQuery, variables: body.variables || {} }),
    });
    const payload = await upstream.json();
    response.status(upstream.status).json(payload);
  } catch {
    response.status(502).json({ error: "Unable to reach LeetCode" });
  }
}
