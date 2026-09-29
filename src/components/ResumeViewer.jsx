import { FiDownload, FiExternalLink, FiFileText, FiX } from "react-icons/fi";
import { profile } from "../data/portfolio";
import "../styles/ResumeViewer.css";

function getDriveId(url) {
  return url.match(/\/d\/([^/]+)/)?.[1] || "";
}

export default function ResumeViewer({ open, onClose }) {
  if (!open) return null;
  const fileId = getDriveId(profile.resume);
  const previewUrl = `https://drive.google.com/file/d/${fileId}/preview`;
  const downloadUrl = `https://drive.google.com/uc?export=download&id=${fileId}`;

  return <div className="resume-viewer" role="dialog" aria-modal="true" aria-label="Resume preview"><div className="resume-viewer-topbar"><div className="resume-viewer-title"><FiFileText /><div><strong>Resume</strong><span>{profile.role}</span></div></div><div className="resume-viewer-actions"><a href={previewUrl} target="_blank" rel="noreferrer"><FiExternalLink /> Open in new tab</a><a className="resume-download" href={downloadUrl} target="_blank" rel="noreferrer"><FiDownload /> Download PDF</a><button onClick={onClose} title="Close resume"><FiX /></button></div></div><div className="resume-viewer-frame"><iframe title="Resume PDF" src={previewUrl} /></div></div>;
}
