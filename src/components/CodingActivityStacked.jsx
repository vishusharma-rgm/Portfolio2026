import { useEffect, useMemo, useState } from "react";
import { FiArrowUpRight, FiCode, FiGithub, FiTrendingUp } from "react-icons/fi";
import { profile } from "../data/portfolio";
import "../styles/CodingActivityStacked.css";

const codeforcesHandle = "vishu__00";
const leetcodeHandle = "vishu___00";
const year = new Date().getFullYear();

function toDateKey(timestamp) {
  return new Date(timestamp).toISOString().slice(0, 10);
}

function ActivityGrid({ counts = {} }) {
  const cells = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const start = new Date(today);
    start.setDate(today.getDate() - 363);
    start.setDate(start.getDate() - start.getDay());
    return Array.from({ length: 364 }, (_, index) => {
      const date = new Date(start);
      date.setDate(start.getDate() + index);
      const key = toDateKey(date);
      const value = date > today ? 0 : Number(counts[key] || 0);
      const level = value === 0 ? 0 : value < 2 ? 1 : value < 4 ? 2 : value < 7 ? 3 : 4;
      return { key, value, level };
    });
  }, [counts]);
  return <div className="activity-grid" aria-label="Last year of activity">{cells.map(({ key, value, level }) => <i className={`level-${level}`} title={`${key}: ${value} submissions`} key={key} />)}</div>;
}

function Stats({ items = [] }) {
  return <div className="activity-stats">{items.map(([label, value]) => <div key={label}><strong>{value ?? "-"}</strong><span>{label}</span></div>)}</div>;
}

function Board({ name, handle, href, icon: Icon, children, status, meta, stats }) {
  return <article className="activity-row"><div className="activity-row-head"><div className="activity-identity"><Icon /><strong>{name}</strong><span>{handle}</span></div><a href={href} target="_blank" rel="noreferrer" aria-label={`Open ${name} profile`}><FiArrowUpRight /></a></div>{stats?.length > 0 && <Stats items={stats} />}<div className="activity-row-body">{status === "loading" && <div className="activity-state">Loading live activity...</div>}{status === "empty" && <div className="activity-state">Live activity is unavailable right now.</div>}{status === "ready" && children}</div><div className="activity-row-foot"><span>{meta}</span><span>Last 12 months</span></div></article>;
}

async function loadLeetCodeCalendar() {
  const query = "query profile($username: String!, $year: Int) { matchedUser(username: $username) { profile { ranking } submitStatsGlobal { acSubmissionNum { difficulty count } } userContestRanking { rating globalRanking } userCalendar(year: $year) { submissionCalendar } } }";
  const response = await fetch("/api/leetcode", { method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify({ operationName: "userProfileCalendar", query, variables: { username: leetcodeHandle, year } }) });
  if (!response.ok) throw new Error("LeetCode API request failed");
  const payload = await response.json();
  const user = payload.data?.matchedUser;
  const raw = user?.userCalendar?.submissionCalendar;
  const counts = raw ? Object.fromEntries(Object.entries(JSON.parse(raw)).map(([stamp, count]) => [toDateKey(Number(stamp) * 1000), Number(count) || 0])) : {};
  const solved = Object.fromEntries((user?.submitStatsGlobal?.acSubmissionNum || []).map(({ difficulty, count }) => [difficulty, count]));
  return { counts, stats: [["Solved", solved.All || 0], ["Easy", solved.Easy || 0], ["Medium", solved.Medium || 0], ["Hard", solved.Hard || 0], ["Rating", Math.round(user?.userContestRanking?.rating || 0) || "-"], ["Rank", user?.profile?.ranking?.toLocaleString?.() || "-"]] };
}

async function loadCodeforcesActivity() {
  const response = await fetch(`/api/codeforces?handle=${encodeURIComponent(codeforcesHandle)}`);
  if (response.ok) {
    const payload = await response.json();
    if (payload.status === "OK") return payload;
  }
  const [infoResponse, ratingResponse, statusResponse] = await Promise.all([
    fetch(`https://codeforces.com/api/user.info?handles=${encodeURIComponent(codeforcesHandle)}`),
    fetch(`https://codeforces.com/api/user.rating?handle=${encodeURIComponent(codeforcesHandle)}`),
    fetch(`https://codeforces.com/api/user.status?handle=${encodeURIComponent(codeforcesHandle)}&from=1&count=1000`),
  ]);
  const [info, rating, submissions] = await Promise.all([infoResponse.json(), ratingResponse.json(), statusResponse.json()]);
  if (info.status !== "OK" || submissions.status !== "OK") return null;
  const counts = submissions.result.reduce((result, submission) => { const key = toDateKey(submission.creationTimeSeconds * 1000); result[key] = (result[key] || 0) + 1; return result; }, {});
  const user = info.result[0];
  const maxRating = rating.status === "OK" && rating.result.length ? Math.max(...rating.result.map((contest) => contest.newRating)) : user.maxRating;
  return { counts, stats: [["Rating", user.rating || "-"], ["Max rating", maxRating || "-"], ["Rank", user.rank || "-"], ["Contests", rating.status === "OK" ? rating.result.length : "-"], ["Submissions", submissions.result.length]] };
}

export default function CodingActivityStacked() {
  const [data, setData] = useState({ LeetCode: null, Codeforces: null });
  const [loading, setLoading] = useState({ LeetCode: true, Codeforces: true });
  const githubHandle = profile.github.split("/").pop();

  useEffect(() => {
    loadLeetCodeCalendar().then((result) => setData((current) => ({ ...current, LeetCode: result?.counts && Object.keys(result.counts).length ? result : null }))).catch(() => setData((current) => ({ ...current, LeetCode: null }))).finally(() => setLoading((current) => ({ ...current, LeetCode: false })));
    loadCodeforcesActivity().then((result) => setData((current) => ({ ...current, Codeforces: result }))).catch(() => setData((current) => ({ ...current, Codeforces: null }))).finally(() => setLoading((current) => ({ ...current, Codeforces: false })));
  }, []);

  return <section className="coding-activity-stacked" id="coding-activity"><div className="coding-heading"><span className="eyebrow">Coding Activity</span><h2 className="h">A year of building and solving.</h2><p>Live activity from the platforms where I write, compete, and learn.</p></div><div className="activity-shell"><Board name="GitHub" handle={githubHandle} href={profile.github} icon={FiGithub} status="ready" meta="Contributions"><img className="github-real-chart" src={`https://ghchart.rshah.org/40c463/${githubHandle}`} alt="GitHub contribution activity" /></Board><Board name="LeetCode" handle={leetcodeHandle} href={`https://leetcode.com/u/${leetcodeHandle}/`} icon={FiCode} status={loading.LeetCode ? "loading" : data.LeetCode ? "ready" : "empty"} stats={data.LeetCode?.stats} meta="Submissions"><ActivityGrid counts={data.LeetCode?.counts || {}} /></Board><Board name="Codeforces" handle={codeforcesHandle} href={`https://codeforces.com/profile/${codeforcesHandle}`} icon={FiTrendingUp} status={loading.Codeforces ? "loading" : data.Codeforces ? "ready" : "empty"} stats={data.Codeforces?.stats} meta="Accepted and attempted solutions"><ActivityGrid counts={data.Codeforces?.counts || {}} /></Board></div></section>;
}
