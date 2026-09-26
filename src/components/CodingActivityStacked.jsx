import { useEffect, useState } from "react";
import { FiArrowUpRight, FiCode, FiGithub, FiTrendingUp } from "react-icons/fi";
import { profile } from "../data/portfolio";
import "../styles/CodingActivityStacked.css";

const cfHandle = "vishu__00";
const lcHandle = "vishu___00";

async function loadLeetCodeCalendar(year) {
  const query = "query userProfileCalendar($username: String!, $year: Int) { matchedUser(username: $username) { userCalendar(year: $year) { submissionCalendar } } }";
  try {
    const response = await fetch("/api/leetcode", { method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify({ operationName: "userProfileCalendar", query, variables: { username: lcHandle, year } }) });
    const payload = await response.json();
    const raw = payload.data?.matchedUser?.userCalendar?.submissionCalendar;
    if (raw) return JSON.parse(raw);
  } catch {}
  return {};
}

function RealGrid({ counts }) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const start = new Date(today);
  start.setDate(today.getDate() - 363);
  start.setDate(start.getDate() - start.getDay());
  return <div className="real-grid">{Array.from({ length: 364 }, (_, index) => {
    const date = new Date(start);
    date.setDate(start.getDate() + index);
    const key = date.toISOString().slice(0, 10);
    const value = date > today ? 0 : counts[key] || 0;
    const level = value === 0 ? 0 : value < 2 ? 1 : value < 4 ? 2 : value < 7 ? 3 : 4;
    return <i className={`level-${level}`} title={`${key}: ${value} submissions`} key={key} />;
  })}</div>;
}

function Board({ name, handle, href, icon: Icon, children, status, showMonths = true }) {
  return <article className="activity-board"><div className="activity-board-head"><span><Icon /> {handle}</span><a href={href} target="_blank" rel="noreferrer" aria-label={`Open ${name} profile`}><FiArrowUpRight /></a></div>{showMonths && <div className="activity-months"><span>Oct</span><span>Nov</span><span>Dec</span><span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span><span>Jul</span><span>Aug</span><span>Sep</span></div>}{status === "loading" ? <div className="activity-loading">Loading live activity...</div> : status === "empty" ? <div className="activity-loading">Activity data unavailable right now.</div> : children}<span className="activity-caption">{name} · Real activity data · Open profile</span></article>;
}

export default function CodingActivityStacked() {
  const [data, setData] = useState({ Codeforces: null, LeetCode: null });
  const [loading, setLoading] = useState({ Codeforces: true, LeetCode: true });

  useEffect(() => {
    const loadCodeforces = async () => {
      for (const host of ["https://codeforces.com", "https://codeforces.me"]) {
        try {
          const endpoint = host === "https://codeforces.com" ? `/api/codeforces/user.status?handle=${cfHandle}&from=1&count=1000` : `${host}/api/user.status?handle=${cfHandle}&from=1&count=1000`;
          const payload = await fetch(endpoint).then((r) => r.json());
          if (payload.status !== "OK") continue;
          const counts = {};
          payload.result?.forEach((item) => {
            const key = new Date(item.creationTimeSeconds * 1000).toISOString().slice(0, 10);
            counts[key] = (counts[key] || 0) + 1;
          });
          if (Object.keys(counts).length) setData((current) => ({ ...current, Codeforces: counts }));
          return;
        } catch {}
      }
    };
    loadCodeforces().finally(() => setLoading((current) => ({ ...current, Codeforces: false })));
    Promise.all([new Date().getFullYear(), new Date().getFullYear() - 1].map(loadLeetCodeCalendar)).then((calendars) => { const counts = {}; calendars.forEach((calendar) => Object.entries(calendar || {}).forEach(([stamp, count]) => { const numericStamp = Number(stamp); const value = Number(count); if (!Number.isFinite(numericStamp) || !Number.isFinite(value) || value <= 0) return; const key = new Date(numericStamp * 1000).toISOString().slice(0, 10); counts[key] = (counts[key] || 0) + value; })); setData((current) => ({ ...current, LeetCode: Object.keys(counts).length ? counts : null })); }).catch(() => {}).finally(() => setLoading((current) => ({ ...current, LeetCode: false })));
  }, []);

  return <section className="coding-activity-stacked" id="coding-activity"><div className="coding-heading"><span className="eyebrow">Coding Activity</span><h2 className="h">Built in public, one problem at a time.</h2><p>Real contribution activity across all three platforms.</p></div><div className="activity-stack"><Board name="GitHub" handle={profile.github.split("/").pop()} href={profile.github} icon={FiGithub} showMonths={false}><img className="github-real-chart" src={`https://ghchart.rshah.org/40c463/${profile.github.split("/").pop()}`} alt="GitHub contribution chart" /></Board><Board name="LeetCode" handle={lcHandle} href={`https://leetcode.com/u/${lcHandle}/`} icon={FiCode} status={loading.LeetCode ? "loading" : data.LeetCode ? "ready" : "empty"}>{data.LeetCode && <RealGrid counts={data.LeetCode} />}</Board><Board name="Codeforces" handle={cfHandle} href={`https://codeforces.com/profile/${cfHandle}`} icon={FiTrendingUp} status={loading.Codeforces ? "loading" : data.Codeforces ? "ready" : "empty"}>{data.Codeforces && <RealGrid counts={data.Codeforces} />}</Board></div></section>;
}
