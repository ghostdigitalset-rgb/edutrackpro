import React, { useState } from 'react';

// ============================================================
// GLOBAL STYLES (injected once)
// ============================================================
const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=DM+Mono:wght@400;500&display=swap');
  @import url('https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/tabler-icons.min.css');

  :root {
    --bg: #0a0c10; --bg2: #111318; --bg3: #181c24; --bg4: #1e2330;
    --border: rgba(255,255,255,0.07); --border2: rgba(255,255,255,0.12);
    --text: #e8eaf0; --text2: #8b90a0; --text3: #545a6a;
    --accent: #6366f1; --accent2: #818cf8; --accent3: #312e81;
    --green: #22c55e; --green-bg: rgba(34,197,94,0.1);
    --red: #ef4444; --red-bg: rgba(239,68,68,0.1);
    --amber: #f59e0b; --amber-bg: rgba(245,158,11,0.1);
    --blue: #3b82f6; --blue-bg: rgba(59,130,246,0.1);
    --purple: #a855f7; --purple-bg: rgba(168,85,247,0.1);
    --teal: #14b8a6; --teal-bg: rgba(20,184,166,0.1);
    --sidebar-w: 240px; --r: 12px; --r-sm: 8px;
    --shadow: 0 1px 3px rgba(0,0,0,0.4);
  }
  .light {
    --bg: #f8f9fc; --bg2: #ffffff; --bg3: #f1f3f8; --bg4: #e8ecf5;
    --border: rgba(0,0,0,0.07); --border2: rgba(0,0,0,0.12);
    --text: #111827; --text2: #6b7280; --text3: #9ca3af;
    --accent: #4f46e5; --accent2: #6366f1; --accent3: #e0e7ff;
    --green-bg: rgba(34,197,94,0.08); --red-bg: rgba(239,68,68,0.08);
    --amber-bg: rgba(245,158,11,0.08); --blue-bg: rgba(59,130,246,0.08);
    --purple-bg: rgba(168,85,247,0.08); --teal-bg: rgba(20,184,166,0.08);
    --shadow: 0 1px 3px rgba(0,0,0,0.08);
  }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'DM Sans', sans-serif; background: var(--bg); color: var(--text); min-height: 100vh; overflow-x: hidden; }
  input, select, textarea, button { font-family: inherit; }

  .app { display: flex; min-height: 100vh; }
  .sidebar { width: var(--sidebar-w); background: var(--bg2); border-right: 1px solid var(--border); display: flex; flex-direction: column; position: fixed; top: 0; left: 0; height: 100vh; z-index: 100; transition: transform 0.3s; }
  .main { margin-left: var(--sidebar-w); flex: 1; min-height: 100vh; display: flex; flex-direction: column; }
  .topbar { background: var(--bg2); border-bottom: 1px solid var(--border); padding: 0 24px; height: 60px; display: flex; align-items: center; justify-content: space-between; position: sticky; top: 0; z-index: 50; }
  .content { padding: 24px; flex: 1; }

  .sidebar-logo { padding: 20px 20px 16px; border-bottom: 1px solid var(--border); }
  .logo-mark { display: flex; align-items: center; gap: 10px; }
  .logo-icon { width: 32px; height: 32px; background: linear-gradient(135deg, var(--accent), var(--purple)); border-radius: 8px; display: flex; align-items: center; justify-content: center; color: white; font-size: 16px; }
  .logo-text { font-size: 16px; font-weight: 700; letter-spacing: -0.3px; }
  .logo-badge { font-size: 10px; background: var(--accent3); color: var(--accent); padding: 2px 6px; border-radius: 4px; font-weight: 600; letter-spacing: 0.5px; }
  .sidebar-section { padding: 12px 12px 4px; }
  .sidebar-section-label { font-size: 10px; font-weight: 600; color: var(--text3); letter-spacing: 1px; text-transform: uppercase; padding: 0 8px; margin-bottom: 4px; }
  .nav-item { display: flex; align-items: center; gap: 10px; padding: 8px 12px; border-radius: var(--r-sm); cursor: pointer; color: var(--text2); font-size: 13.5px; font-weight: 500; transition: all 0.15s; margin-bottom: 2px; }
  .nav-item:hover { background: var(--bg3); color: var(--text); }
  .nav-item.active { background: var(--accent3); color: var(--accent2); }
  .light .nav-item.active { color: var(--accent); }
  .nav-item i { font-size: 17px; width: 20px; text-align: center; }
  .nav-badge { margin-left: auto; background: var(--red); color: white; font-size: 10px; font-weight: 700; padding: 1px 6px; border-radius: 10px; min-width: 18px; text-align: center; }
  .sidebar-user { margin-top: auto; border-top: 1px solid var(--border); padding: 14px 16px; display: flex; align-items: center; gap: 10px; cursor: pointer; }
  .avatar { width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 700; color: white; flex-shrink: 0; }
  .user-info { flex: 1; min-width: 0; }
  .user-name { font-size: 13px; font-weight: 600; }
  .user-role { font-size: 11px; color: var(--text2); }
  .role-switcher { display: flex; gap: 6px; flex-wrap: wrap; padding: 12px 16px; border-bottom: 1px solid var(--border); }
  .role-btn { font-size: 11px; padding: 4px 10px; border-radius: 20px; border: 1px solid var(--border2); background: var(--bg3); color: var(--text2); cursor: pointer; font-weight: 500; transition: all 0.15s; }
  .role-btn.active { background: var(--accent); color: white; border-color: var(--accent); }

  .search-box { display: flex; align-items: center; gap: 8px; background: var(--bg3); border: 1px solid var(--border); border-radius: var(--r-sm); padding: 6px 12px; width: 260px; }
  .search-box i { color: var(--text3); font-size: 15px; }
  .search-box input { background: none; border: none; color: var(--text); font-size: 13px; outline: none; width: 100%; }
  .search-box input::placeholder { color: var(--text3); }
  .topbar-right { display: flex; align-items: center; gap: 8px; }
  .icon-btn { width: 36px; height: 36px; border-radius: var(--r-sm); border: 1px solid var(--border); background: var(--bg3); display: flex; align-items: center; justify-content: center; cursor: pointer; color: var(--text2); font-size: 16px; transition: all 0.15s; }
  .icon-btn:hover { background: var(--bg4); color: var(--text); }
  .notif-dot { position: relative; }
  .notif-dot::after { content: ''; position: absolute; top: 4px; right: 4px; width: 7px; height: 7px; background: var(--red); border-radius: 50%; border: 1px solid var(--bg2); }

  .card { background: var(--bg2); border: 1px solid var(--border); border-radius: var(--r); padding: 20px; }
  .card-sm { padding: 16px; }
  .stat-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 14px; }
  .stat-card { background: var(--bg2); border: 1px solid var(--border); border-radius: var(--r); padding: 18px; position: relative; overflow: hidden; }
  .stat-card::before { content: ''; position: absolute; top: 0; right: 0; width: 60px; height: 60px; border-radius: 0 var(--r) 0 100%; opacity: 0.08; }
  .stat-card.green::before { background: var(--green); }
  .stat-card.blue::before { background: var(--blue); }
  .stat-card.amber::before { background: var(--amber); }
  .stat-card.purple::before { background: var(--purple); }
  .stat-card.teal::before { background: var(--teal); }
  .stat-card.red::before { background: var(--red); }
  .stat-label { font-size: 12px; color: var(--text2); font-weight: 500; display: flex; align-items: center; gap: 6px; margin-bottom: 8px; }
  .stat-value { font-size: 28px; font-weight: 700; line-height: 1; letter-spacing: -0.5px; }
  .stat-change { font-size: 11px; margin-top: 6px; display: flex; align-items: center; gap: 3px; }
  .stat-change.up { color: var(--green); }
  .stat-change.down { color: var(--red); }

  .table-wrap { overflow-x: auto; }
  table { width: 100%; border-collapse: collapse; font-size: 13px; }
  th { font-size: 11px; font-weight: 600; color: var(--text3); text-transform: uppercase; letter-spacing: 0.5px; padding: 10px 14px; text-align: left; border-bottom: 1px solid var(--border); white-space: nowrap; }
  td { padding: 12px 14px; border-bottom: 1px solid var(--border); color: var(--text2); vertical-align: middle; }
  tr:last-child td { border-bottom: none; }
  tr:hover td { background: var(--bg3); }
  .td-main { color: var(--text); font-weight: 500; }

  .badge { display: inline-flex; align-items: center; gap: 4px; font-size: 11px; font-weight: 600; padding: 3px 8px; border-radius: 20px; }
  .badge-green { background: var(--green-bg); color: var(--green); }
  .badge-red { background: var(--red-bg); color: var(--red); }
  .badge-amber { background: var(--amber-bg); color: var(--amber); }
  .badge-blue { background: var(--blue-bg); color: var(--blue); }
  .badge-purple { background: var(--purple-bg); color: var(--purple); }
  .badge-teal { background: var(--teal-bg); color: var(--teal); }
  .badge-gray { background: var(--bg3); color: var(--text2); }

  .btn { display: inline-flex; align-items: center; gap: 7px; padding: 8px 16px; border-radius: var(--r-sm); font-size: 13px; font-weight: 600; cursor: pointer; border: none; transition: all 0.15s; }
  .btn-primary { background: var(--accent); color: white; }
  .btn-primary:hover { background: var(--accent2); }
  .btn-outline { background: var(--bg3); color: var(--text); border: 1px solid var(--border2); }
  .btn-outline:hover { background: var(--bg4); }
  .btn-ghost { background: transparent; color: var(--text2); border: 1px solid var(--border); }
  .btn-ghost:hover { background: var(--bg3); }
  .btn-danger { background: var(--red-bg); color: var(--red); border: 1px solid var(--red); }
  .btn-success { background: var(--green-bg); color: var(--green); border: 1px solid var(--green); }
  .btn-sm { padding: 5px 10px; font-size: 12px; }
  .btn-icon { padding: 8px; }

  .form-group { margin-bottom: 16px; }
  .form-label { font-size: 12px; font-weight: 600; color: var(--text2); margin-bottom: 6px; display: block; }
  .form-input { width: 100%; background: var(--bg3); border: 1px solid var(--border2); border-radius: var(--r-sm); padding: 9px 12px; color: var(--text); font-size: 13px; outline: none; transition: border 0.15s; }
  .form-input:focus { border-color: var(--accent); }
  .form-input::placeholder { color: var(--text3); }
  select.form-input { cursor: pointer; }
  textarea.form-input { resize: vertical; min-height: 80px; }
  .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }

  .progress-bar { background: var(--bg3); border-radius: 20px; height: 6px; overflow: hidden; }
  .progress-fill { height: 100%; border-radius: 20px; transition: width 0.3s; }

  .tabs { display: flex; gap: 2px; background: var(--bg3); padding: 4px; border-radius: var(--r-sm); width: fit-content; margin-bottom: 20px; }
  .tab { padding: 6px 14px; border-radius: 6px; font-size: 13px; font-weight: 500; cursor: pointer; color: var(--text2); transition: all 0.15s; }
  .tab.active { background: var(--bg2); color: var(--text); box-shadow: var(--shadow); }

  .section-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px; }
  .section-title { font-size: 15px; font-weight: 700; }
  .ref-code-box { background: var(--bg3); border: 1px dashed var(--border2); border-radius: var(--r-sm); padding: 10px 14px; display: flex; align-items: center; justify-content: space-between; }
  .ref-code { font-family: 'DM Mono', monospace; font-size: 13px; color: var(--accent2); letter-spacing: 1px; }

  .timeline { list-style: none; padding: 0; }
  .timeline-item { display: flex; gap: 12px; padding: 10px 0; }
  .timeline-dot { width: 8px; height: 8px; border-radius: 50%; margin-top: 5px; flex-shrink: 0; }

  .empty-state { text-align: center; padding: 48px 24px; }
  .empty-icon { font-size: 48px; color: var(--text3); margin-bottom: 12px; }
  .empty-title { font-size: 15px; font-weight: 600; margin-bottom: 6px; }
  .empty-desc { font-size: 13px; color: var(--text2); }

  .modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.6); z-index: 200; display: flex; align-items: center; justify-content: center; padding: 20px; backdrop-filter: blur(4px); }
  .modal { background: var(--bg2); border: 1px solid var(--border); border-radius: 16px; width: 100%; max-width: 560px; max-height: 90vh; overflow-y: auto; box-shadow: 0 24px 64px rgba(0,0,0,0.4); }
  .modal-header { padding: 20px 24px 16px; border-bottom: 1px solid var(--border); display: flex; align-items: center; justify-content: space-between; }
  .modal-body { padding: 20px 24px; }
  .modal-footer { padding: 16px 24px; border-top: 1px solid var(--border); display: flex; justify-content: flex-end; gap: 10px; }

  .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
  .grid-3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 16px; }
  .flex { display: flex; } .items-center { align-items: center; } .justify-between { justify-content: space-between; }
  .gap-2 { gap: 8px; } .gap-3 { gap: 12px; } .gap-4 { gap: 16px; }
  .mt-1{margin-top:4px} .mt-2{margin-top:8px} .mt-3{margin-top:12px} .mt-4{margin-top:16px} .mb-4{margin-bottom:16px} .mb-6{margin-bottom:24px}
  .text-sm{font-size:13px} .text-xs{font-size:11px} .text-muted{color:var(--text2)} .text-green{color:var(--green)} .text-red{color:var(--red)} .text-amber{color:var(--amber)} .text-accent{color:var(--accent2)}
  .font-bold{font-weight:700} .font-semibold{font-weight:600} .font-mono{font-family:'DM Mono',monospace} .truncate{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
  h2{font-size:18px;font-weight:700;letter-spacing:-0.3px} h3{font-size:15px;font-weight:600}

  .chart-container { display: flex; align-items: flex-end; gap: 6px; height: 80px; padding: 0 4px; }
  .chart-bar-wrap { flex: 1; display: flex; flex-direction: column; align-items: center; gap: 4px; }
  .chart-bar { width: 100%; border-radius: 4px 4px 0 0; }
  .chart-label { font-size: 10px; color: var(--text3); }

  .stepper { display: flex; align-items: center; gap: 0; margin-bottom: 24px; }
  .step { display: flex; align-items: center; }
  .step-circle { width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 700; border: 2px solid var(--border2); background: var(--bg3); color: var(--text2); }
  .step-circle.done { background: var(--green); border-color: var(--green); color: white; }
  .step-circle.active { background: var(--accent); border-color: var(--accent); color: white; }
  .step-line { flex: 1; height: 2px; background: var(--border); min-width: 24px; }
  .step-line.done { background: var(--green); }
  .step-label { font-size: 11px; color: var(--text2); margin-left: 6px; white-space: nowrap; }
  .step-label.active { color: var(--text); font-weight: 600; }

  .course-card { background: var(--bg2); border: 1px solid var(--border); border-radius: var(--r); overflow: hidden; transition: all 0.2s; cursor: pointer; }
  .course-card:hover { border-color: var(--accent); transform: translateY(-2px); box-shadow: 0 8px 24px rgba(99,102,241,0.15); }
  .course-thumb { height: 120px; display: flex; align-items: center; justify-content: center; font-size: 40px; }
  .course-body { padding: 14px; }
  .course-title { font-size: 14px; font-weight: 700; margin-bottom: 4px; line-height: 1.3; }
  .course-meta { font-size: 11px; color: var(--text2); display: flex; align-items: center; gap: 8px; flex-wrap: wrap; margin-bottom: 10px; }
  .course-meta-item { display: flex; align-items: center; gap: 3px; }

  @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
  .fade-in { animation: fadeIn 0.2s ease; }

  @media(max-width: 768px) {
    .sidebar { transform: translateX(-100%); }
    .sidebar.open { transform: translateX(0); }
    .main { margin-left: 0; }
    .stat-grid { grid-template-columns: repeat(2, 1fr); }
    .form-row { grid-template-columns: 1fr; }
    .grid-2, .grid-3 { grid-template-columns: 1fr; }
    .search-box { display: none; }
  }
`;

// ============================================================
// INITIAL DATA
// ============================================================
const initialData = {
  currentRole: 'admin',
  currentView: 'dashboard',
  darkMode: true,
  showModal: null,
  regStep: 1,
  toast: null,
  studentFilter: 'all',
  sidebarOpen: false,

  courses: [
    { id: 1, title: 'Full-Stack Web Development Bootcamp', category: 'Technology', duration: '12 weeks', price: 2499, spots: 30, enrolled: 24, status: 'active', thumb: '💻', color: '#6366f1', desc: 'Comprehensive full-stack training covering React, Node.js, and cloud deployment.' },
    { id: 2, title: 'Data Science & Machine Learning', category: 'Technology', duration: '10 weeks', price: 2999, spots: 25, enrolled: 20, status: 'active', thumb: '🧠', color: '#a855f7', desc: 'From Python basics to production ML models, covering pandas, scikit-learn, and TensorFlow.' },
    { id: 3, title: 'Digital Marketing Mastery', category: 'Business', duration: '6 weeks', price: 1299, spots: 40, enrolled: 38, status: 'active', thumb: '📊', color: '#14b8a6', desc: 'SEO, paid ads, content strategy, and analytics for modern digital marketing.' },
    { id: 4, title: 'Project Management Professional', category: 'Business', duration: '8 weeks', price: 1799, spots: 20, enrolled: 15, status: 'active', thumb: '📋', color: '#f59e0b', desc: 'PMP certification prep with agile, scrum, and traditional PM methodologies.' },
    { id: 5, title: 'UX/UI Design Fundamentals', category: 'Design', duration: '8 weeks', price: 1599, spots: 30, enrolled: 12, status: 'upcoming', thumb: '🎨', color: '#ec4899', desc: 'Design thinking, wireframing, prototyping, and user research for product designers.' },
    { id: 6, title: 'Cybersecurity Essentials', category: 'Technology', duration: '6 weeks', price: 1999, spots: 20, enrolled: 8, status: 'upcoming', thumb: '🔐', color: '#ef4444', desc: 'Penetration testing, network security, and compliance frameworks for IT professionals.' },
  ],

  students: [
    { id: 1, name: 'Sarah Mitchell', email: 'sarah.m@example.com', course: 1, status: 'approved', date: '2024-11-15', referral: 'REF001', docs: true, progress: 68 },
    { id: 2, name: 'James Okafor', email: 'james.o@example.com', course: 2, status: 'pending', date: '2024-11-18', referral: 'REF002', docs: true, progress: 0 },
    { id: 3, name: 'Maria Santos', email: 'maria.s@example.com', course: 1, status: 'approved', date: '2024-11-10', referral: null, docs: true, progress: 82 },
    { id: 4, name: 'Chen Wei', email: 'chen.w@example.com', course: 3, status: 'rejected', date: '2024-11-12', referral: 'REF003', docs: false, progress: 0 },
    { id: 5, name: 'Amina Diallo', email: 'amina.d@example.com', course: 2, status: 'pending', date: '2024-11-20', referral: 'REF001', docs: true, progress: 0 },
    { id: 6, name: 'Lucas Ferrari', email: 'lucas.f@example.com', course: 4, status: 'approved', date: '2024-11-08', referral: null, docs: true, progress: 45 },
    { id: 7, name: 'Priya Sharma', email: 'priya.s@example.com', course: 3, status: 'approved', date: '2024-11-05', referral: 'REF002', docs: true, progress: 91 },
    { id: 8, name: 'David Kim', email: 'david.k@example.com', course: 1, status: 'pending', date: '2024-11-21', referral: 'REF001', docs: false, progress: 0 },
  ],

  referrals: [
    { id: 'REF001', name: 'Alex Thompson', email: 'alex.t@example.com', code: 'ALEX2024', conversions: 3, clicks: 47, commission: 750, rate: 6.4, joined: '2024-09-01', tier: 'Gold' },
    { id: 'REF002', name: 'Jennifer Park', email: 'jen.p@example.com', code: 'JEN2024', conversions: 2, clicks: 31, commission: 450, rate: 6.5, joined: '2024-09-15', tier: 'Silver' },
    { id: 'REF003', name: 'Marcus Brown', email: 'marcus.b@example.com', code: 'MARC2024', conversions: 1, clicks: 22, commission: 150, rate: 4.5, joined: '2024-10-01', tier: 'Bronze' },
    { id: 'REF004', name: 'Sophie Laurent', email: 'sophie.l@example.com', code: 'SOPH2024', conversions: 0, clicks: 12, commission: 0, rate: 0, joined: '2024-11-01', tier: 'Bronze' },
  ],

  auditLog: [
    { action: 'Student approved', user: 'Admin', target: 'Sarah Mitchell', time: '10 min ago', type: 'success' },
    { action: 'New registration', user: 'System', target: 'David Kim → Full-Stack Bootcamp', time: '1 hr ago', type: 'info' },
    { action: 'Course updated', user: 'Admin', target: 'Data Science & ML', time: '2 hrs ago', type: 'info' },
    { action: 'Student rejected', user: 'Admin', target: 'Chen Wei — missing docs', time: '3 hrs ago', type: 'error' },
    { action: 'Referral registered', user: 'System', target: 'Alex Thompson (REF001)', time: '5 hrs ago', type: 'success' },
  ],
};

// ============================================================
// HELPERS
// ============================================================
function formatCurrency(n) { return '$' + n.toLocaleString(); }

function getCourse(courses, id) { return courses.find(c => c.id === id); }

function getAvatar(name, color) {
  const initials = name.split(' ').map(p => p[0]).join('').slice(0, 2);
  const colors = ['#6366f1','#a855f7','#14b8a6','#f59e0b','#ef4444','#3b82f6','#22c55e','#ec4899'];
  const bg = color || colors[name.charCodeAt(0) % colors.length];
  return <div className="avatar" style={{ background: bg }}>{initials}</div>;
}

function StatusBadge({ status }) {
  const map = {
    approved: ['badge-green', 'Approved'],
    pending: ['badge-amber', 'Pending'],
    rejected: ['badge-red', 'Rejected'],
    active: ['badge-green', 'Active'],
    upcoming: ['badge-blue', 'Upcoming'],
    completed: ['badge-gray', 'Completed'],
    info: ['badge-blue', 'Info'],
    success: ['badge-green', 'Success'],
    error: ['badge-red', 'Error'],
  };
  const [cls, label] = map[status] || ['badge-gray', status];
  return <span className={`badge ${cls}`}>{label}</span>;
}

function TierBadge({ tier }) {
  const map = { Gold: 'badge-amber', Silver: 'badge-gray', Bronze: 'badge-teal' };
  return <span className={`badge ${map[tier] || 'badge-gray'}`}>{tier}</span>;
}

// ============================================================
// SIDEBAR
// ============================================================
function Sidebar({ state, onNavigate, onSwitchRole }) {
  const adminNav = [
    { icon: 'ti-dashboard', label: 'Dashboard', view: 'dashboard' },
    { icon: 'ti-books', label: 'Courses', view: 'courses' },
    { icon: 'ti-users', label: 'Students', view: 'students', badge: state.students.filter(s => s.status === 'pending').length },
    { icon: 'ti-link', label: 'Referrals', view: 'referrals' },
    { icon: 'ti-chart-bar', label: 'Analytics', view: 'analytics' },
    { icon: 'ti-file-text', label: 'Audit Log', view: 'audit' },
  ];
  const studentNav = [
    { icon: 'ti-search', label: 'Browse Courses', view: 'browse' },
    { icon: 'ti-clipboard-list', label: 'My Application', view: 'my-app' },
    { icon: 'ti-book', label: 'My Courses', view: 'my-courses' },
  ];
  const repNav = [
    { icon: 'ti-dashboard', label: 'Dashboard', view: 'rep-dashboard' },
    { icon: 'ti-link', label: 'My Referral Link', view: 'rep-link' },
    { icon: 'ti-users', label: 'My Referrals', view: 'rep-referrals' },
    { icon: 'ti-coin', label: 'Commissions', view: 'rep-commissions' },
  ];
  const nav = state.currentRole === 'admin' ? adminNav : state.currentRole === 'student' ? studentNav : repNav;
  const roleNames = { admin: 'Administrator', student: 'Student', rep: 'Sales Rep' };
  const roleColors = { admin: '#6366f1', student: '#14b8a6', rep: '#f59e0b' };
  const userName = state.currentRole === 'admin' ? 'Admin User' : state.currentRole === 'student' ? 'Sarah Mitchell' : 'Alex Thompson';

  return (
    <aside className={`sidebar ${state.sidebarOpen ? 'open' : ''}`}>
      <div className="sidebar-logo">
        <div className="logo-mark">
          <div className="logo-icon"><i className="ti ti-school" /></div>
          <div>
            <div className="logo-text">EduTrack</div>
            <div className="logo-badge">PRO</div>
          </div>
        </div>
      </div>
      <div className="role-switcher">
        {['admin','student','rep'].map(r => (
          <button key={r} className={`role-btn ${state.currentRole === r ? 'active' : ''}`} onClick={() => onSwitchRole(r)}>
            {r === 'rep' ? 'Rep' : r.charAt(0).toUpperCase() + r.slice(1)}
          </button>
        ))}
      </div>
      <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 8 }}>
        <div className="sidebar-section">
          <div className="sidebar-section-label">{roleNames[state.currentRole]}</div>
          {nav.map(item => (
            <div key={item.view} className={`nav-item ${state.currentView === item.view ? 'active' : ''}`} onClick={() => onNavigate(item.view)}>
              <i className={`ti ${item.icon}`} />
              <span>{item.label}</span>
              {item.badge ? <span className="nav-badge">{item.badge}</span> : null}
            </div>
          ))}
        </div>
      </div>
      <div className="sidebar-user">
        {getAvatar(userName, roleColors[state.currentRole])}
        <div className="user-info">
          <div className="user-name truncate">{userName}</div>
          <div className="user-role">{roleNames[state.currentRole]}</div>
        </div>
        <i className="ti ti-settings text-muted" style={{ fontSize: 15 }} />
      </div>
    </aside>
  );
}

// ============================================================
// TOPBAR
// ============================================================
function Topbar({ state, onToggleTheme }) {
  const titles = {
    dashboard: 'Dashboard', courses: 'Course Management', students: 'Student Applications',
    referrals: 'Referral Management', analytics: 'Analytics & Reports', audit: 'Audit Log',
    browse: 'Browse Courses', 'my-app': 'My Application', 'my-courses': 'My Courses',
    'rep-dashboard': 'Rep Dashboard', 'rep-link': 'My Referral Link',
    'rep-referrals': 'My Referrals', 'rep-commissions': 'Commissions',
  };
  const userName = state.currentRole === 'admin' ? 'Admin User' : state.currentRole === 'student' ? 'Sarah Mitchell' : 'Alex Thompson';
  return (
    <header className="topbar">
      <div className="search-box">
        <i className="ti ti-search" />
        <input type="text" placeholder="Search students, courses..." />
      </div>
      <span style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', fontSize: 14, fontWeight: 600 }}>
        {titles[state.currentView] || ''}
      </span>
      <div className="topbar-right">
        <div className="icon-btn notif-dot"><i className="ti ti-bell" /></div>
        <div className="icon-btn" onClick={onToggleTheme}><i className={`ti ti-${state.darkMode ? 'sun' : 'moon'}`} /></div>
        {getAvatar(userName)}
      </div>
    </header>
  );
}

// ============================================================
// DASHBOARD VIEW
// ============================================================
function Dashboard({ state, onNavigate, onShowModal }) {
  const { students, courses, referrals, auditLog } = state;
  const total = students.length;
  const pending = students.filter(s => s.status === 'pending').length;
  const approved = students.filter(s => s.status === 'approved').length;
  const rejected = students.filter(s => s.status === 'rejected').length;
  const totalRevenue = students.filter(s => s.status === 'approved').reduce((sum, s) => sum + (getCourse(courses, s.course)?.price || 0), 0);
  const refConversions = referrals.reduce((s, r) => s + r.conversions, 0);
  const months = ['Jul','Aug','Sep','Oct','Nov','Dec'];
  const regs = [4, 7, 9, 12, 8, students.length];
  const maxReg = Math.max(...regs);
  const recentStudents = [...students].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 5);

  return (
    <div className="fade-in">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2>Welcome back, Admin 👋</h2>
          <p className="text-sm text-muted mt-1">Here's what's happening with your platform today.</p>
        </div>
        <button className="btn btn-primary" onClick={() => onShowModal('add-course')}><i className="ti ti-plus" />New Course</button>
      </div>

      <div className="stat-grid mb-6">
        {[
          { label: 'Total Registrations', value: total, cls: 'blue', icon: 'ti-users', change: '+12% vs last month', up: true },
          { label: 'Pending Review', value: pending, cls: 'amber', icon: 'ti-clock', change: 'Needs attention', up: false, amber: true },
          { label: 'Enrolled Students', value: approved, cls: 'green', icon: 'ti-check', change: '+8% vs last month', up: true },
          { label: 'Referral Conversions', value: refConversions, cls: 'purple', icon: 'ti-link', change: '+3 this month', up: true },
          { label: 'Total Revenue', value: formatCurrency(totalRevenue), cls: 'teal', icon: 'ti-currency-dollar', change: '+15% vs last month', up: true },
          { label: 'Rejected', value: rejected, cls: 'red', icon: 'ti-x', change: '-2 vs last month', up: false },
        ].map((s, i) => (
          <div key={i} className={`stat-card ${s.cls}`}>
            <div className="stat-label"><i className={`ti ${s.icon}`} style={{ color: `var(--${s.cls})` }} />{s.label}</div>
            <div className="stat-value">{s.value}</div>
            <div className={`stat-change ${s.up ? 'up' : s.amber ? '' : 'down'}`} style={s.amber ? { color: 'var(--amber)' } : {}}>
              <i className={`ti ti-trending-${s.up ? 'up' : 'down'}`} />{s.change}
            </div>
          </div>
        ))}
      </div>

      <div className="grid-2 mb-4">
        <div className="card">
          <div className="section-header">
            <h3 className="section-title">Monthly Registrations</h3>
            <span className="badge badge-green">+24% YTD</span>
          </div>
          <div className="chart-container">
            {months.map((m, i) => (
              <div key={m} className="chart-bar-wrap">
                <div className="chart-bar" style={{ height: Math.round((regs[i]/maxReg)*72), background: i === months.length-1 ? 'var(--accent)' : 'var(--bg4)' }} />
                <div className="chart-label">{m}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="card">
          <div className="section-header">
            <h3 className="section-title">Course Enrollment</h3>
            <button className="btn btn-ghost btn-sm" onClick={() => onNavigate('courses')}>View All</button>
          </div>
          {courses.slice(0,4).map(c => (
            <div key={c.id} style={{ marginBottom: 14 }}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm truncate" style={{ maxWidth: 220 }}>{c.title.split(' ').slice(0,4).join(' ')}...</span>
                <span className="text-xs text-muted">{c.enrolled}/{c.spots}</span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${Math.round((c.enrolled/c.spots)*100)}%`, background: c.color }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid-2">
        <div className="card">
          <div className="section-header">
            <h3 className="section-title">Recent Registrations</h3>
            <button className="btn btn-ghost btn-sm" onClick={() => onNavigate('students')}>View All</button>
          </div>
          <div className="table-wrap">
            <table>
              <thead><tr><th>Student</th><th>Course</th><th>Status</th></tr></thead>
              <tbody>
                {recentStudents.map(s => (
                  <tr key={s.id} style={{ cursor: 'pointer' }} onClick={() => onNavigate('students')}>
                    <td><div className="flex items-center gap-2">{getAvatar(s.name)}<span className="td-main text-sm">{s.name}</span></div></td>
                    <td><span className="text-sm">{getCourse(courses, s.course)?.thumb} {getCourse(courses, s.course)?.category}</span></td>
                    <td><StatusBadge status={s.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="card">
          <div className="section-header">
            <h3 className="section-title">Activity Log</h3>
            <button className="btn btn-ghost btn-sm" onClick={() => onNavigate('audit')}>View All</button>
          </div>
          <ul className="timeline">
            {auditLog.map((log, i) => (
              <li key={i} className="timeline-item">
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div className="timeline-dot" style={{ background: log.type === 'success' ? 'var(--green)' : log.type === 'error' ? 'var(--red)' : 'var(--blue)' }} />
                  {i < auditLog.length - 1 && <div style={{ width: 1, flex: 1, background: 'var(--border)', margin: '4px 0' }} />}
                </div>
                <div style={{ paddingBottom: i < auditLog.length - 1 ? 10 : 0 }}>
                  <div className="text-sm font-semibold">{log.action}</div>
                  <div className="text-xs text-muted">{log.target}</div>
                  <div className="text-xs text-muted mt-1">{log.time}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// COURSES VIEW
// ============================================================
function CoursesView({ state, onShowModal }) {
  const { courses } = state;
  return (
    <div className="fade-in">
      <div className="section-header mb-6">
        <div>
          <h2>Course Management</h2>
          <p className="text-sm text-muted mt-1">{courses.length} courses · {courses.filter(c => c.status === 'active').length} active</p>
        </div>
        <div className="flex gap-2">
          <button className="btn btn-outline"><i className="ti ti-download" />Export</button>
          <button className="btn btn-primary" onClick={() => onShowModal('add-course')}><i className="ti ti-plus" />Add Course</button>
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(280px,1fr))', gap: 16 }}>
        {courses.map(c => (
          <div key={c.id} className="course-card">
            <div className="course-thumb" style={{ background: c.color + '22' }}>{c.thumb}</div>
            <div className="course-body">
              <div className="course-title">{c.title}</div>
              <div className="course-meta">
                <span className="course-meta-item"><i className="ti ti-tag" style={{ fontSize: 12 }} />{c.category}</span>
                <span className="course-meta-item"><i className="ti ti-clock" style={{ fontSize: 12 }} />{c.duration}</span>
                <span className="course-meta-item"><i className="ti ti-users" style={{ fontSize: 12 }} />{c.enrolled}/{c.spots}</span>
              </div>
              <div className="flex items-center justify-between mt-2">
                <div><StatusBadge status={c.status} /><span className="font-bold text-sm" style={{ color: c.color, marginLeft: 8 }}>{formatCurrency(c.price)}</span></div>
                <div className="flex gap-1">
                  <button className="btn btn-ghost btn-sm btn-icon"><i className="ti ti-edit" /></button>
                  <button className="btn btn-ghost btn-sm btn-icon"><i className="ti ti-trash" style={{ color: 'var(--red)' }} /></button>
                </div>
              </div>
              <div className="progress-bar mt-3">
                <div className="progress-fill" style={{ width: `${Math.round((c.enrolled/c.spots)*100)}%`, background: c.color }} />
              </div>
              <div className="text-xs text-muted mt-1">{Math.round((c.enrolled/c.spots)*100)}% full</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================================================
// STUDENTS VIEW
// ============================================================
function StudentsView({ state, onUpdateStudent, onSetFilter, onShowModal }) {
  const { students, courses, studentFilter } = state;
  const filtered = studentFilter === 'all' ? students : students.filter(s => s.status === studentFilter);
  return (
    <div className="fade-in">
      <div className="section-header mb-4">
        <div>
          <h2>Student Applications</h2>
          <p className="text-sm text-muted mt-1">{students.length} total · {students.filter(s=>s.status==='pending').length} pending review</p>
        </div>
        <div className="flex gap-2">
          <button className="btn btn-outline"><i className="ti ti-download" />Export CSV</button>
          <button className="btn btn-primary" onClick={() => onShowModal('add-student')}><i className="ti ti-plus" />Add Student</button>
        </div>
      </div>
      <div className="tabs">
        {['all','pending','approved','rejected'].map(f => (
          <div key={f} className={`tab ${studentFilter === f ? 'active' : ''}`} onClick={() => onSetFilter(f)}>
            {f.charAt(0).toUpperCase()+f.slice(1)}{f !== 'all' ? ` (${students.filter(s=>s.status===f).length})` : ''}
          </div>
        ))}
      </div>
      <div className="card">
        <div className="table-wrap">
          <table>
            <thead><tr><th>Student</th><th>Course</th><th>Date</th><th>Referral</th><th>Docs</th><th>Status</th><th>Actions</th></tr></thead>
            <tbody>
              {filtered.map(s => {
                const course = getCourse(courses, s.course);
                return (
                  <tr key={s.id}>
                    <td>
                      <div className="flex items-center gap-2">
                        {getAvatar(s.name)}
                        <div><div className="td-main">{s.name}</div><div className="text-xs text-muted">{s.email}</div></div>
                      </div>
                    </td>
                    <td><div className="text-sm">{course?.thumb} {course?.title.split(' ').slice(0,3).join(' ')}...</div></td>
                    <td className="text-sm">{s.date}</td>
                    <td>{s.referral ? <span className="badge badge-purple font-mono">{s.referral}</span> : <span className="text-muted text-xs">—</span>}</td>
                    <td>
                      {s.docs
                        ? <span className="badge badge-green">✓ Uploaded</span>
                        : <span className="badge badge-red">✗ Missing</span>}
                    </td>
                    <td><StatusBadge status={s.status} /></td>
                    <td>
                      <div className="flex gap-1">
                        {s.status === 'pending' ? <>
                          <button className="btn btn-success btn-sm" onClick={() => onUpdateStudent(s.id, 'approved')}>Approve</button>
                          <button className="btn btn-danger btn-sm" onClick={() => onUpdateStudent(s.id, 'rejected')}>Reject</button>
                        </> : <button className="btn btn-ghost btn-sm">View</button>}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// REFERRALS VIEW
// ============================================================
function ReferralsView({ state, onShowModal, onShowToast }) {
  const { referrals } = state;
  const totalClicks = referrals.reduce((s,r)=>s+r.clicks,0);
  const totalConversions = referrals.reduce((s,r)=>s+r.conversions,0);
  const totalCommission = referrals.reduce((s,r)=>s+r.commission,0);

  return (
    <div className="fade-in">
      <div className="section-header mb-6">
        <div>
          <h2>Referral Management</h2>
          <p className="text-sm text-muted mt-1">{referrals.length} affiliates · {totalConversions} total conversions</p>
        </div>
        <button className="btn btn-primary" onClick={() => onShowModal('add-referral')}><i className="ti ti-plus" />Add Affiliate</button>
      </div>
      <div className="stat-grid mb-6" style={{ gridTemplateColumns: 'repeat(4,1fr)' }}>
        <div className="stat-card purple"><div className="stat-label">Active Affiliates</div><div className="stat-value">{referrals.length}</div></div>
        <div className="stat-card teal"><div className="stat-label">Total Clicks</div><div className="stat-value">{totalClicks}</div></div>
        <div className="stat-card green"><div className="stat-label">Conversions</div><div className="stat-value">{totalConversions}</div></div>
        <div className="stat-card amber"><div className="stat-label">Total Commission</div><div className="stat-value">{formatCurrency(totalCommission)}</div></div>
      </div>
      <div className="card">
        <div className="table-wrap">
          <table>
            <thead><tr><th>Affiliate</th><th>Code</th><th>Tier</th><th>Clicks</th><th>Conversions</th><th>Conv. Rate</th><th>Commission</th><th>Actions</th></tr></thead>
            <tbody>
              {referrals.map(r => (
                <tr key={r.id}>
                  <td><div className="flex items-center gap-2">{getAvatar(r.name)}<div><div className="td-main">{r.name}</div><div className="text-xs text-muted">{r.email}</div></div></div></td>
                  <td><span className="badge badge-purple font-mono">{r.code}</span></td>
                  <td><TierBadge tier={r.tier} /></td>
                  <td className="font-semibold">{r.clicks}</td>
                  <td className="font-semibold text-green">{r.conversions}</td>
                  <td>
                    <div className="flex items-center gap-2">
                      <div className="progress-bar" style={{ width: 60 }}><div className="progress-fill" style={{ width: `${Math.min(r.rate*10,100)}%`, background: 'var(--accent)' }} /></div>
                      <span className="text-sm">{r.rate.toFixed(1)}%</span>
                    </div>
                  </td>
                  <td className="font-bold text-green">{formatCurrency(r.commission)}</td>
                  <td>
                    <div className="flex gap-1">
                      <button className="btn btn-ghost btn-sm btn-icon" onClick={() => onShowToast('Referral link copied!')}><i className="ti ti-copy" /></button>
                      <button className="btn btn-ghost btn-sm btn-icon"><i className="ti ti-eye" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// ANALYTICS VIEW
// ============================================================
function AnalyticsView({ state, onNavigate }) {
  const { students, courses, referrals } = state;
  const approved = students.filter(s=>s.status==='approved');
  const totalRevenue = approved.reduce((sum,s)=>sum+(getCourse(courses,s.course)?.price||0),0);
  const convRate = ((approved.length / students.length) * 100).toFixed(1);
  const refRate = ((students.filter(s=>s.referral).length / students.length) * 100).toFixed(1);
  const avgRevenue = Math.round(totalRevenue / Math.max(approved.length, 1));

  return (
    <div className="fade-in">
      <div className="section-header mb-6">
        <h2>Analytics & Reports</h2>
        <div className="flex gap-2">
          <select className="form-input" style={{ width: 'auto', padding: '7px 12px' }}>
            <option>Last 30 days</option><option>Last 90 days</option><option>This year</option>
          </select>
          <button className="btn btn-outline"><i className="ti ti-download" />Export Report</button>
        </div>
      </div>
      <div className="stat-grid mb-6">
        <div className="stat-card blue"><div className="stat-label">Total Revenue</div><div className="stat-value">{formatCurrency(totalRevenue)}</div><div className="stat-change up"><i className="ti ti-trending-up" />+15%</div></div>
        <div className="stat-card green"><div className="stat-label">Conversion Rate</div><div className="stat-value">{convRate}%</div><div className="stat-change up"><i className="ti ti-trending-up" />+4.2%</div></div>
        <div className="stat-card purple"><div className="stat-label">Referral Rate</div><div className="stat-value">{refRate}%</div><div className="stat-change up"><i className="ti ti-trending-up" />+8.1%</div></div>
        <div className="stat-card amber"><div className="stat-label">Avg. Revenue/Student</div><div className="stat-value">{formatCurrency(avgRevenue)}</div></div>
      </div>
      <div className="grid-2 mb-4">
        <div className="card">
          <h3 className="mb-4">Revenue by Course</h3>
          {courses.map(c => {
            const rev = students.filter(s => s.course === c.id && s.status === 'approved').length * c.price;
            return (
              <div key={c.id} style={{ marginBottom: 14 }}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm">{c.thumb} {c.title.split(' ').slice(0,3).join(' ')}...</span>
                  <span className="text-sm font-bold" style={{ color: c.color }}>{formatCurrency(rev)}</span>
                </div>
                <div className="progress-bar"><div className="progress-fill" style={{ width: `${Math.round((rev/10000)*100)}%`, background: c.color }} /></div>
              </div>
            );
          })}
        </div>
        <div className="card">
          <h3 className="mb-4">Registration Funnel</h3>
          {[
            { label: 'Visited Registration', count: 142, color: '--blue' },
            { label: 'Started Application', count: 89, color: '--purple' },
            { label: 'Submitted', count: students.length, color: '--amber' },
            { label: 'Approved & Enrolled', count: approved.length, color: '--green' },
          ].map(item => (
            <div key={item.label} style={{ marginBottom: 10 }}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm">{item.label}</span>
                <span className="text-sm font-bold">{item.count}</span>
              </div>
              <div className="progress-bar"><div className="progress-fill" style={{ width: `${Math.round((item.count/142)*100)}%`, background: `var(${item.color})` }} /></div>
            </div>
          ))}
          <div className="card card-sm mt-4" style={{ background: 'var(--bg3)' }}>
            <div className="text-xs text-muted mb-1">Overall Conversion</div>
            <div className="font-bold" style={{ fontSize: 22, color: 'var(--green)' }}>{convRate}%</div>
            <div className="text-xs text-muted">of visitors complete enrollment</div>
          </div>
        </div>
      </div>
      <div className="card">
        <div className="section-header">
          <h3>Top Performing Affiliates</h3>
          <button className="btn btn-ghost btn-sm" onClick={() => onNavigate('referrals')}>View All</button>
        </div>
        <div className="table-wrap">
          <table>
            <thead><tr><th>Affiliate</th><th>Tier</th><th>Conversions</th><th>Revenue Generated</th><th>Commission</th><th>Rate</th></tr></thead>
            <tbody>
              {referrals.map(r => (
                <tr key={r.id}>
                  <td><div className="flex items-center gap-2">{getAvatar(r.name)}<div><div className="td-main">{r.name}</div><div className="text-xs text-muted">{r.code}</div></div></div></td>
                  <td><TierBadge tier={r.tier} /></td>
                  <td className="font-bold">{r.conversions}</td>
                  <td className="text-green font-semibold">{formatCurrency(r.conversions * 1800)}</td>
                  <td className="font-bold">{formatCurrency(r.commission)}</td>
                  <td>
                    <div className="flex items-center gap-2">
                      <div className="progress-bar" style={{ width: 50 }}><div className="progress-fill" style={{ width: `${Math.min(r.rate*10,100)}%`, background: 'var(--accent)' }} /></div>
                      <span className="text-sm">{r.rate.toFixed(1)}%</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// AUDIT LOG VIEW
// ============================================================
function AuditView({ state }) {
  const extended = [
    ...state.auditLog,
    { action: 'New affiliate added', user: 'Admin', target: 'Sophie Laurent', time: '1 day ago', type: 'info' },
    { action: 'Course created', user: 'Admin', target: 'Cybersecurity Essentials', time: '2 days ago', type: 'success' },
    { action: 'Student enrolled', user: 'System', target: 'Lucas Ferrari → PMP', time: '3 days ago', type: 'success' },
    { action: 'Password reset', user: 'System', target: 'priya.s@example.com', time: '4 days ago', type: 'info' },
  ];
  return (
    <div className="fade-in">
      <div className="section-header mb-6">
        <h2>Audit Log</h2>
        <button className="btn btn-outline"><i className="ti ti-download" />Export Log</button>
      </div>
      <div className="card">
        <div className="table-wrap">
          <table>
            <thead><tr><th>Action</th><th>User</th><th>Target</th><th>Time</th><th>Type</th></tr></thead>
            <tbody>
              {extended.map((log, i) => (
                <tr key={i}>
                  <td className="td-main">{log.action}</td>
                  <td className="text-sm">{log.user}</td>
                  <td className="text-sm text-muted">{log.target}</td>
                  <td className="text-xs text-muted">{log.time}</td>
                  <td><StatusBadge status={log.type === 'success' ? 'approved' : log.type === 'error' ? 'rejected' : 'pending'} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// STUDENT VIEWS
// ============================================================
function BrowseView({ state, onNavigate }) {
  return (
    <div className="fade-in">
      <div className="section-header mb-4">
        <h2>Browse Courses</h2>
        <select className="form-input" style={{ width: 'auto' }}><option>All Categories</option><option>Technology</option><option>Business</option><option>Design</option></select>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(280px,1fr))', gap: 16 }}>
        {state.courses.map(c => (
          <div key={c.id} className="course-card" onClick={() => onNavigate('my-app')}>
            <div className="course-thumb" style={{ background: c.color + '22' }}>{c.thumb}</div>
            <div className="course-body">
              <div className="course-title">{c.title}</div>
              <p className="text-xs text-muted mb-2" style={{ lineHeight: 1.5 }}>{c.desc}</p>
              <div className="course-meta">
                <span className="course-meta-item"><i className="ti ti-clock" style={{ fontSize: 12 }} />{c.duration}</span>
                <span className="course-meta-item"><i className="ti ti-users" style={{ fontSize: 12 }} />{c.spots - c.enrolled} spots left</span>
              </div>
              <div className="flex items-center justify-between mt-3">
                <span className="font-bold" style={{ color: c.color, fontSize: 16 }}>{formatCurrency(c.price)}</span>
                <button className="btn btn-primary btn-sm" onClick={e => { e.stopPropagation(); onNavigate('my-app'); }}>Apply Now</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function MyAppView({ state, onSetRegStep, onNavigate, onShowToast }) {
  const steps = ['Personal Info', 'Course Selection', 'Documents', 'Review'];
  const step = state.regStep;
  return (
    <div className="fade-in">
      <div className="mb-6"><h2>Course Application</h2><p className="text-sm text-muted mt-1">Complete all steps to submit your application</p></div>
      <div className="stepper mb-6">
        {steps.map((s, i) => (
          <div key={s} className="step">
            <div className={`step-circle ${i+1 < step ? 'done' : i+1 === step ? 'active' : ''}`}>
              {i+1 < step ? <i className="ti ti-check" style={{ fontSize: 13 }} /> : i+1}
            </div>
            <span className={`step-label ${i+1 === step ? 'active' : ''}`}>{s}</span>
            {i < steps.length-1 && <div className={`step-line ${i+1 < step ? 'done' : ''}`} />}
          </div>
        ))}
      </div>
      <div className="card" style={{ maxWidth: 640 }}>
        {step === 1 && <>
          <h3 className="mb-4">Personal Information</h3>
          <div className="form-row">
            <div className="form-group"><label className="form-label">First Name</label><input className="form-input" defaultValue="Sarah" /></div>
            <div className="form-group"><label className="form-label">Last Name</label><input className="form-input" defaultValue="Mitchell" /></div>
          </div>
          <div className="form-group"><label className="form-label">Email Address</label><input className="form-input" type="email" defaultValue="sarah.m@example.com" /></div>
          <div className="form-row">
            <div className="form-group"><label className="form-label">Phone Number</label><input className="form-input" type="tel" placeholder="+1 (555) 000-0000" /></div>
            <div className="form-group"><label className="form-label">Date of Birth</label><input className="form-input" type="date" /></div>
          </div>
          <div className="form-group"><label className="form-label">Referral Code (optional)</label><input className="form-input" placeholder="e.g. ALEX2024" /></div>
        </>}
        {step === 2 && <>
          <h3 className="mb-4">Select Your Course</h3>
          {state.courses.filter(c => c.status === 'active').map(c => (
            <label key={c.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 14, border: '1px solid var(--border)', borderRadius: 'var(--r-sm)', marginBottom: 10, cursor: 'pointer' }}>
              <input type="radio" name="course" style={{ accentColor: 'var(--accent)' }} />
              <span style={{ fontSize: 24 }}>{c.thumb}</span>
              <div style={{ flex: 1 }}><div className="font-semibold text-sm">{c.title}</div><div className="text-xs text-muted">{c.duration} · {c.spots - c.enrolled} spots</div></div>
              <span className="font-bold" style={{ color: 'var(--accent)' }}>{formatCurrency(c.price)}</span>
            </label>
          ))}
        </>}
        {step === 3 && <>
          <h3 className="mb-4">Upload Documents</h3>
          {[{label:'ID Document (Passport or National ID)',req:true},{label:'Academic Certificate / Transcript',req:true},{label:'CV / Resume',req:false},{label:'Motivation Letter',req:false}].map(doc => (
            <div key={doc.label} style={{ border: '1px dashed var(--border2)', borderRadius: 'var(--r-sm)', padding: 16, marginBottom: 12, textAlign: 'center' }}>
              <i className="ti ti-upload" style={{ fontSize: 24, color: 'var(--text3)' }} />
              <div className="text-sm font-semibold mt-2">{doc.label} {doc.req && <span style={{ color: 'var(--red)' }}>*</span>}</div>
              <div className="text-xs text-muted mt-1">PDF, JPG, PNG · Max 5MB</div>
              <button className="btn btn-outline btn-sm mt-3">Choose File</button>
            </div>
          ))}
        </>}
        {step === 4 && <>
          <h3 className="mb-4">Review & Submit</h3>
          <div style={{ background: 'var(--bg3)', borderRadius: 'var(--r-sm)', padding: 16, marginBottom: 16 }}>
            <div className="text-xs text-muted mb-3 font-semibold" style={{ textTransform: 'uppercase', letterSpacing: '0.5px' }}>Application Summary</div>
            {[['Name','Sarah Mitchell'],['Email','sarah.m@example.com'],['Course','💻 Full-Stack Web Development Bootcamp'],['Duration','12 weeks'],['Tuition','$2,499'],['Documents','2 of 2 required uploaded'],['Referral Code','ALEX2024']].map(([k,v]) => (
              <div key={k} className="flex items-center justify-between" style={{ padding: '8px 0', borderBottom: '1px solid var(--border)' }}>
                <span className="text-xs text-muted">{k}</span>
                <span className="text-sm font-semibold">{v}</span>
              </div>
            ))}
          </div>
          <div style={{ background: 'var(--blue-bg)', border: '1px solid var(--blue)', borderRadius: 'var(--r-sm)', padding: 12, marginBottom: 16 }}>
            <div className="text-sm" style={{ color: 'var(--blue)' }}><i className="ti ti-info-circle" /> Your application will be reviewed within 2–3 business days.</div>
          </div>
        </>}
        <div className="flex justify-between mt-4">
          {step > 1 ? <button className="btn btn-outline" onClick={() => onSetRegStep(step-1)}><i className="ti ti-arrow-left" />Back</button> : <div />}
          {step < 4
            ? <button className="btn btn-primary" onClick={() => onSetRegStep(step+1)}>Continue <i className="ti ti-arrow-right" /></button>
            : <button className="btn btn-primary" onClick={() => { onShowToast("Application submitted! You'll hear back in 2–3 days."); onNavigate('my-courses'); }}><i className="ti ti-send" />Submit Application</button>}
        </div>
      </div>
    </div>
  );
}

function MyCoursesView({ state }) {
  const myCourses = state.students.filter(s => s.status === 'approved').slice(0, 3);
  return (
    <div className="fade-in">
      <h2 className="mb-6">My Enrolled Courses</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(300px,1fr))', gap: 16 }}>
        {myCourses.map(s => {
          const c = getCourse(state.courses, s.course);
          return (
            <div key={s.id} className="card">
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
                <div style={{ width: 44, height: 44, background: c.color+'22', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>{c.thumb}</div>
                <div><div className="font-semibold text-sm">{c.title.split(' ').slice(0,4).join(' ')}...</div><div className="text-xs text-muted">{c.duration}</div></div>
              </div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-muted">Progress</span>
                <span className="text-xs font-bold" style={{ color: c.color }}>{s.progress}%</span>
              </div>
              <div className="progress-bar mb-3"><div className="progress-fill" style={{ width: `${s.progress}%`, background: c.color }} /></div>
              <button className="btn btn-primary btn-sm" style={{ width: '100%' }}>Continue Learning</button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ============================================================
// REP VIEWS
// ============================================================
function RepDashboard({ state, onNavigate }) {
  const me = state.referrals[0];
  const myStudents = state.students.filter(s => s.referral === me.id);
  return (
    <div className="fade-in">
      <div className="section-header mb-6">
        <div><h2>Sales Rep Dashboard</h2><p className="text-sm text-muted mt-1">Welcome back, {me.name}</p></div>
        <TierBadge tier={me.tier} />
      </div>
      <div className="stat-grid mb-6">
        <div className="stat-card blue"><div className="stat-label">Total Clicks</div><div className="stat-value">{me.clicks}</div></div>
        <div className="stat-card green"><div className="stat-label">Conversions</div><div className="stat-value">{me.conversions}</div></div>
        <div className="stat-card purple"><div className="stat-label">Conv. Rate</div><div className="stat-value">{me.rate.toFixed(1)}%</div></div>
        <div className="stat-card amber"><div className="stat-label">Commission</div><div className="stat-value">{formatCurrency(me.commission)}</div></div>
      </div>
      <div className="card mb-4">
        <h3 className="mb-3">Your Referral Link</h3>
        <div className="ref-code-box">
          <span className="ref-code">https://edutrack.pro/register?ref={me.code}</span>
          <button className="btn btn-primary btn-sm"><i className="ti ti-copy" />Copy</button>
        </div>
        <div className="flex gap-2 mt-3">
          <button className="btn btn-outline btn-sm"><i className="ti ti-brand-whatsapp" />WhatsApp</button>
          <button className="btn btn-outline btn-sm"><i className="ti ti-mail" />Email</button>
          <button className="btn btn-outline btn-sm"><i className="ti ti-brand-linkedin" />LinkedIn</button>
        </div>
      </div>
      <div className="card">
        <h3 className="mb-3">My Referred Students</h3>
        <div className="table-wrap">
          <table>
            <thead><tr><th>Student</th><th>Course</th><th>Status</th><th>Date</th></tr></thead>
            <tbody>
              {myStudents.map(s => (
                <tr key={s.id}>
                  <td><div className="flex items-center gap-2">{getAvatar(s.name)}<span className="td-main">{s.name}</span></div></td>
                  <td className="text-sm">{getCourse(state.courses, s.course)?.thumb} {getCourse(state.courses, s.course)?.title.split(' ').slice(0,3).join(' ')}...</td>
                  <td><StatusBadge status={s.status} /></td>
                  <td className="text-xs text-muted">{s.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function RepLinkView({ state }) {
  const me = state.referrals[0];
  return (
    <div className="fade-in">
      <h2 className="mb-6">My Referral Link</h2>
      <div className="card mb-4" style={{ maxWidth: 560 }}>
        <div className="text-xs text-muted mb-1 font-semibold" style={{ textTransform: 'uppercase', letterSpacing: '0.5px' }}>Your Code</div>
        <div className="font-mono font-bold mb-3" style={{ fontSize: 28, letterSpacing: 3, color: 'var(--accent2)' }}>{me.code}</div>
        <div className="ref-code-box mb-3">
          <span className="ref-code" style={{ fontSize: 12 }}>https://edutrack.pro/register?ref={me.code}</span>
          <button className="btn btn-primary btn-sm"><i className="ti ti-copy" /></button>
        </div>
      </div>
      <div className="card" style={{ maxWidth: 560 }}>
        <h3 className="mb-3">Commission Structure</h3>
        {[{tier:'Bronze',range:'0–1 conversions',rate:'5%',color:'var(--teal)'},{tier:'Silver',range:'2–4 conversions',rate:'8%',color:'var(--text2)'},{tier:'Gold',range:'5+ conversions',rate:'12%',color:'var(--amber)'}].map(t => (
          <div key={t.tier} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 12, border: `1px solid ${me.tier === t.tier ? 'var(--accent)' : 'var(--border)'}`, background: me.tier === t.tier ? 'var(--accent3)' : 'transparent', borderRadius: 'var(--r-sm)', marginBottom: 8 }}>
            <div><div className="font-semibold" style={{ color: t.color }}>{t.tier}</div><div className="text-xs text-muted">{t.range}</div></div>
            <div className="font-bold" style={{ fontSize: 20, color: t.color }}>{t.rate}</div>
            {me.tier === t.tier && <span className="badge badge-blue">Current</span>}
          </div>
        ))}
      </div>
    </div>
  );
}

function RepReferralsView({ state }) {
  const me = state.referrals[0];
  const myStudents = state.students.filter(s => s.referral === me.id);
  return (
    <div className="fade-in">
      <h2 className="mb-6">My Referred Students</h2>
      <div className="card">
        {myStudents.length > 0 ? (
          <div className="table-wrap">
            <table>
              <thead><tr><th>Student</th><th>Course</th><th>Applied</th><th>Status</th><th>Commission</th></tr></thead>
              <tbody>
                {myStudents.map(s => {
                  const c = getCourse(state.courses, s.course);
                  const comm = s.status === 'approved' ? Math.round(c.price * 0.08) : 0;
                  return (
                    <tr key={s.id}>
                      <td><div className="flex items-center gap-2">{getAvatar(s.name)}<div><div className="td-main">{s.name}</div><div className="text-xs text-muted">{s.email}</div></div></div></td>
                      <td className="text-sm">{c.thumb} {c.title.split(' ').slice(0,3).join(' ')}...</td>
                      <td className="text-xs text-muted">{s.date}</td>
                      <td><StatusBadge status={s.status} /></td>
                      <td className={comm > 0 ? 'text-green font-bold' : 'text-muted'}>{comm > 0 ? formatCurrency(comm) : '—'}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="empty-state"><div className="empty-icon"><i className="ti ti-users" /></div><div className="empty-title">No referrals yet</div><div className="empty-desc">Share your referral link to start tracking conversions.</div></div>
        )}
      </div>
    </div>
  );
}

function RepCommissionsView({ state }) {
  const me = state.referrals[0];
  const approved = state.students.filter(s => s.referral === me.id && s.status === 'approved');
  return (
    <div className="fade-in">
      <h2 className="mb-6">Commission Tracking</h2>
      <div className="stat-grid mb-6">
        <div className="stat-card amber"><div className="stat-label">Total Earned</div><div className="stat-value">{formatCurrency(me.commission)}</div></div>
        <div className="stat-card green"><div className="stat-label">Paid Out</div><div className="stat-value">{formatCurrency(500)}</div></div>
        <div className="stat-card blue"><div className="stat-label">Pending</div><div className="stat-value">{formatCurrency(me.commission - 500)}</div></div>
      </div>
      <div className="card">
        <h3 className="mb-4">Commission History</h3>
        <div className="table-wrap">
          <table>
            <thead><tr><th>Student</th><th>Course</th><th>Amount</th><th>Rate</th><th>Status</th></tr></thead>
            <tbody>
              {approved.map(s => {
                const c = getCourse(state.courses, s.course);
                return (
                  <tr key={s.id}>
                    <td className="td-main">{s.name}</td>
                    <td className="text-sm">{c.thumb} {c.title.split(' ').slice(0,3).join(' ')}...</td>
                    <td className="text-green font-bold">{formatCurrency(Math.round(c.price * 0.08))}</td>
                    <td className="text-sm">8%</td>
                    <td><span className="badge badge-amber">Pending Payout</span></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// MODAL
// ============================================================
function Modal({ type, courses, onClose, onSave }) {
  if (!type) return null;
  const configs = {
    'add-course': {
      title: 'Add New Course',
      body: (
        <>
          <div className="form-group"><label className="form-label">Course Title</label><input className="form-input" placeholder="e.g. Advanced Python Programming" /></div>
          <div className="form-row">
            <div className="form-group"><label className="form-label">Category</label><select className="form-input"><option>Technology</option><option>Business</option><option>Design</option></select></div>
            <div className="form-group"><label className="form-label">Duration</label><input className="form-input" placeholder="e.g. 8 weeks" /></div>
          </div>
          <div className="form-row">
            <div className="form-group"><label className="form-label">Price (USD)</label><input className="form-input" type="number" placeholder="1999" /></div>
            <div className="form-group"><label className="form-label">Max Spots</label><input className="form-input" type="number" placeholder="30" /></div>
          </div>
          <div className="form-group"><label className="form-label">Description</label><textarea className="form-input" placeholder="Course description..." /></div>
        </>
      ),
    },
    'add-student': {
      title: 'Add Student Manually',
      body: (
        <>
          <div className="form-row">
            <div className="form-group"><label className="form-label">First Name</label><input className="form-input" placeholder="First name" /></div>
            <div className="form-group"><label className="form-label">Last Name</label><input className="form-input" placeholder="Last name" /></div>
          </div>
          <div className="form-group"><label className="form-label">Email</label><input className="form-input" type="email" placeholder="student@example.com" /></div>
          <div className="form-group"><label className="form-label">Select Course</label>
            <select className="form-input">{courses.map(c => <option key={c.id} value={c.id}>{c.thumb} {c.title}</option>)}</select>
          </div>
          <div className="form-group"><label className="form-label">Referral Code (optional)</label><input className="form-input" placeholder="ALEX2024" /></div>
        </>
      ),
    },
    'add-referral': {
      title: 'Add New Affiliate',
      body: (
        <>
          <div className="form-row">
            <div className="form-group"><label className="form-label">Full Name</label><input className="form-input" placeholder="Alex Thompson" /></div>
            <div className="form-group"><label className="form-label">Email</label><input className="form-input" type="email" placeholder="affiliate@example.com" /></div>
          </div>
          <div className="form-row">
            <div className="form-group"><label className="form-label">Referral Code</label><input className="form-input" placeholder="ALEX2024" /></div>
            <div className="form-group"><label className="form-label">Tier</label><select className="form-input"><option>Bronze</option><option>Silver</option><option>Gold</option></select></div>
          </div>
          <div className="form-group"><label className="form-label">Commission Rate (%)</label><input className="form-input" type="number" placeholder="8" /></div>
        </>
      ),
    },
  };
  const cfg = configs[type];
  if (!cfg) return null;
  return (
    <div className="modal-overlay" onClick={e => e.target.classList.contains('modal-overlay') && onClose()}>
      <div className="modal">
        <div className="modal-header">
          <h3>{cfg.title}</h3>
          <button className="icon-btn" onClick={onClose}><i className="ti ti-x" /></button>
        </div>
        <div className="modal-body">{cfg.body}</div>
        <div className="modal-footer">
          <button className="btn btn-outline" onClick={onClose}>Cancel</button>
          <button className="btn btn-primary" onClick={onSave}><i className="ti ti-check" />Save</button>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// TOAST
// ============================================================
function Toast({ message }) {
  if (!message) return null;
  return (
    <div style={{ position: 'fixed', bottom: 24, right: 24, background: 'var(--bg2)', border: '1px solid var(--border2)', borderRadius: 'var(--r)', padding: '12px 18px', display: 'flex', alignItems: 'center', gap: 10, boxShadow: '0 8px 24px rgba(0,0,0,0.3)', zIndex: 300, animation: 'fadeIn 0.2s ease' }}>
      <i className="ti ti-check" style={{ color: 'var(--green)' }} />
      <span className="text-sm font-semibold">{message}</span>
    </div>
  );
}

// ============================================================
// MAIN APP
// ============================================================
export default function App() {
  const [state, setState] = useState(initialData);

  // Inject styles once
  React.useEffect(() => {
    if (!document.getElementById('edutrack-styles')) {
      const style = document.createElement('style');
      style.id = 'edutrack-styles';
      style.textContent = globalStyles;
      document.head.appendChild(style);
    }
  }, []);

  // Toast auto-dismiss
  React.useEffect(() => {
    if (state.toast) {
      const t = setTimeout(() => setState(s => ({ ...s, toast: null })), 3000);
      return () => clearTimeout(t);
    }
  }, [state.toast]);

  const navigate = view => setState(s => ({ ...s, currentView: view, sidebarOpen: false }));
  const switchRole = role => {
    const defaults = { admin: 'dashboard', student: 'browse', rep: 'rep-dashboard' };
    setState(s => ({ ...s, currentRole: role, currentView: defaults[role] }));
  };
  const toggleTheme = () => setState(s => ({ ...s, darkMode: !s.darkMode }));
  const showModal = type => setState(s => ({ ...s, showModal: type }));
  const closeModal = () => setState(s => ({ ...s, showModal: null }));
  const saveModal = () => {
    setState(s => ({ ...s, showModal: null, toast: 'Saved successfully!' }));
  };
  const showToast = msg => setState(s => ({ ...s, toast: msg }));
  const setStudentFilter = f => setState(s => ({ ...s, studentFilter: f }));
  const setRegStep = step => setState(s => ({ ...s, regStep: step }));
  const updateStudent = (id, status) => {
    setState(s => {
      const students = s.students.map(st => st.id === id ? { ...st, status } : st);
      const student = s.students.find(st => st.id === id);
      return {
        ...s,
        students,
        toast: `Student ${status}!`,
        auditLog: [{ action: `Student ${status}`, user: 'Admin', target: student?.name || '', time: 'just now', type: status === 'approved' ? 'success' : 'error' }, ...s.auditLog],
      };
    });
  };

  const viewProps = { state, onNavigate: navigate, onShowModal: showModal, onShowToast: showToast, onUpdateStudent: updateStudent, onSetFilter: setStudentFilter, onSetRegStep: setRegStep };

  const views = {
    dashboard: <Dashboard {...viewProps} />,
    courses: <CoursesView {...viewProps} />,
    students: <StudentsView {...viewProps} />,
    referrals: <ReferralsView {...viewProps} />,
    analytics: <AnalyticsView {...viewProps} />,
    audit: <AuditView {...viewProps} />,
    browse: <BrowseView {...viewProps} />,
    'my-app': <MyAppView {...viewProps} />,
    'my-courses': <MyCoursesView {...viewProps} />,
    'rep-dashboard': <RepDashboard {...viewProps} />,
    'rep-link': <RepLinkView {...viewProps} />,
    'rep-referrals': <RepReferralsView {...viewProps} />,
    'rep-commissions': <RepCommissionsView {...viewProps} />,
  };

  return (
    <div className={`app ${state.darkMode ? '' : 'light'}`}>
      <Sidebar state={state} onNavigate={navigate} onSwitchRole={switchRole} />
      <div className="main">
        <Topbar state={state} onToggleTheme={toggleTheme} />
        <div className="content">{views[state.currentView] || <div className="empty-state"><div className="empty-title">View not found</div></div>}</div>
      </div>
      <Modal type={state.showModal} courses={state.courses} onClose={closeModal} onSave={saveModal} />
      <Toast message={state.toast} />
    </div>
  );
}
