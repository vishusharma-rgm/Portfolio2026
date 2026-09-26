import { useEffect, useState } from "react";
import { FiArrowUpRight, FiCode, FiGithub, FiTrendingUp } from "react-icons/fi";
import { profile } from "../data/portfolio";
import "../styles/CodingActivity.css";

const codeforcesHandle = "vishu__00";
const leetcodeHandle = "vishu___00";

function ContributionGrid({ counts = {} }) {
  const today = new Date();
  return <div className="contribution-grid">{Array.from({ length: 364 }, (_, index) => { const date = new Date(today); date.setDate(today.getDate() - (363 - index)); const key = date.toISOString().slice(0, 10); const count = counts[key] || 0; const level = count === 0 ? 0 : count < 2 ? 1 : count < 4 ? 2 : count < 7 ? 3 : 4; return <i className={`level-${level}`} title={`${key}: ${count} submissions`} key={key} />; })}</div>;
}

export default function CodingActivity() {
  const [cf, setCf] = useState(null);
  const [platform, setPlatform] = useState(() => {
    const path = window.location.pathname;
    return path.includes("codeforces") ? "Codeforces" : path.includes("leetcode") ? "LeetCode" : "GitHub";
  });
  const [activity, setActivity] = useState({});

  useEffect(() => {
    fetch(`https://codeforces.com/api/user.info?handles=${codeforcesHandle}`)
      .then((response) => response.json())
      .then((data) => setCf(data.result?.[0] || null))
      .catch(() => setCf(null));
    fetch(`https://codeforces.com/api/user.status?handle=${codeforcesHandle}&from=1&count=1000`).then((response) => response.json()).then((data) => { const counts = {}; data.result?.forEach((item) => { const key = new Date(item.creationTimeSeconds * 1000).toISOString().slice(0, 10); counts[key] = (counts[key] || 0) + 1; }); setActivity((current) => ({ ...current, Codeforces: counts })); }).catch(() => {});
    fetch("https://leetcode.com/graphql", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ query: "query userProfileCalendar($username: String!, $year: Int) { matchedUser(username: $username) { userCalendar(year: $year) { submissionCalendar } } }", variables: { username: leetcodeHandle, year: new Date().getFullYear() } }) }).then((response) => response.json()).then((data) => { const raw = data.data?.matchedUser?.userCalendar?.submissionCalendar; if (raw) setActivity((current) => ({ ...current, LeetCode: Object.fromEntries(Object.entries(JSON.parse(raw)).map(([stamp, count]) => [new Date(Number(stamp) * 1000).toISOString().slice(0, 10), count])) })); }).catch(() => {});
  }, []);

  const active = platform === "GitHub" ? { handle: profile.github.split("/").pop(), href: profile.github, meta: "Contributions · Repositories" } : platform === "Codeforces" ? { handle: codeforcesHandle, href: `https://codeforces.com/profile/${codeforcesHandle}`, meta: `Rating ${cf?.rating || "Loading"} · Contest activity` } : { handle: leetcodeHandle, href: `https://leetcode.com/u/${leetcodeHandle}/`, meta: "Problems · Streak · Contest history" };
  return (
    <section className="coding-activity" id="coding-activity">
      <div className="coding-heading"><span className="eyebrow">Coding Activity</span><h2 className="h">Built in public, one problem at a time.</h2><p>Choose a platform to open its dedicated page.</p><div className="coding-page-links"><a href="/coding/github">GitHub</a><a href="/coding/codeforces">Codeforces</a><a href="/coding/leetcode">LeetCode</a></div></div>
      <div className="coding-board"><a className="coding-board-link" href={active.href} target="_blank" rel="noreferrer"><div className="coding-card-top"><span>{platform === "GitHub" ? <FiGithub /> : platform === "Codeforces" ? <FiTrendingUp /> : <FiCode />} {active.handle}</span><FiArrowUpRight /></div><div className="activity-months"><span>Oct</span><span>Nov</span><span>Dec</span><span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span><span>Jul</span><span>Aug</span><span>Sep</span></div>{platform === "GitHub" ? <img className="real-github-chart" src={`https://ghchart.rshah.org/40c463/${active.handle}`} alt="GitHub contribution chart" /> : <ContributionGrid counts={activity[platform] || {}} />}<span className="coding-caption">{active.meta} · Open profile</span></a></div>
    </section>
  );
}
