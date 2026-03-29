'use client'

import Link from "next/link";
import { useState, useEffect, useRef } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,500;0,9..144,700;1,9..144,400&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..500&display=swap');

  .da-root {
    --bg: #090909;
    --surface: #111111;
    --surface2: #161616;
    --surface3: #1c1c1c;
    --border: rgba(255,255,255,0.06);
    --border2: rgba(255,255,255,0.11);
    --text: #efefef;
    --muted: #777;
    --muted2: #555;
    --accent: #7b6cf6;
    --accent-soft: rgba(123,108,246,0.12);
    --accent-border: rgba(123,108,246,0.28);
    --green: #22c55e;
    --green-bg: rgba(34,197,94,0.1);
    font-family: 'DM Sans', sans-serif;
    background: var(--bg);
    color: var(--text);
    overflow-x: hidden;
  }

  .da-root * { box-sizing: border-box; margin: 0; padding: 0; }
  .da-root a { text-decoration: none; }
  .da-root button { cursor: pointer; font-family: inherit; }

  /* NAV */
  .da-nav {
    position: sticky; top: 0; z-index: 50;
    display: flex; align-items: center; justify-content: space-between;
    padding: 0 2rem; height: 54px;
    background: rgba(9,9,9,0.88);
    backdrop-filter: blur(14px);
    border-bottom: 0.5px solid var(--border);
  }
  .da-nav-logo {
    font-family: 'Fraunces', serif; font-size: 14px;
    font-weight: 300; color: var(--text); letter-spacing: 0.03em;
  }
  .da-nav-links { display: flex; gap: 2rem; }
  .da-nav-links a {
    color: var(--muted); font-size: 13px; font-weight: 400;
    transition: color 0.2s;
  }
  .da-nav-links a:hover { color: var(--text); }
  .da-nav-cta {
    background: var(--text); color: #000; border: none;
    padding: 7px 18px; border-radius: 7px;
    font-size: 13px; font-weight: 500;
    transition: opacity 0.15s, transform 0.15s;
  }
  .da-nav-cta:hover { opacity: 0.88; transform: translateY(-1px); }
  @media (max-width: 600px) { .da-nav-links { display: none; } }

  /* HERO */
  .da-hero {
    min-height: 92vh;
    display: flex; flex-direction: column;
    align-items: center; justify-content: center;
    text-align: center; padding: 6rem 1.5rem 4rem;
    position: relative; overflow: hidden;
  }
  .da-hero-glow {
    position: absolute; top: 0; left: 50%; transform: translateX(-50%);
    width: 700px; height: 400px; pointer-events: none;
    background: radial-gradient(ellipse at 50% 0%, rgba(123,108,246,0.14) 0%, transparent 68%);
  }
  .da-pill {
    display: inline-flex; align-items: center; gap: 7px;
    background: var(--accent-soft); border: 0.5px solid var(--accent-border);
    color: #a99fff; font-size: 12px; font-weight: 400;
    padding: 5px 14px; border-radius: 999px; margin-bottom: 2rem;
    animation: daFadeUp 0.55s ease both;
  }
  .da-pill-dot {
    width: 6px; height: 6px; border-radius: 50%; background: var(--accent);
    animation: daPulse 2s ease-in-out infinite;
  }
  @keyframes daPulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.5;transform:scale(0.8)} }

  .da-hero h1 {
    font-family: 'Fraunces', serif;
    font-size: clamp(2.6rem, 6.5vw, 5.2rem);
    font-weight: 700; line-height: 1.07; letter-spacing: -0.025em;
    color: var(--text); max-width: 740px;
    animation: daFadeUp 0.55s 0.08s ease both;
  }
  .da-hero h1 em { font-style: italic; color: #a99fff; font-weight: 400; }

  .da-hero-sub {
    margin-top: 1.25rem; color: var(--muted); font-size: 16px;
    font-weight: 300; max-width: 460px; line-height: 1.7;
    animation: daFadeUp 0.55s 0.16s ease both;
  }
  .da-hero-actions {
    display: flex; gap: 10px; margin-top: 2.5rem;
    flex-wrap: wrap; justify-content: center;
    animation: daFadeUp 0.55s 0.24s ease both;
  }
  .da-btn-primary {
    background: var(--text); color: #000; border: none;
    padding: 12px 28px; border-radius: 8px;
    font-size: 14px; font-weight: 500;
    transition: transform 0.15s, opacity 0.15s;
  }
  .da-btn-primary:hover { transform: translateY(-2px); opacity: 0.9; }
  .da-btn-ghost {
    background: transparent; color: var(--muted);
    border: 0.5px solid var(--border2); padding: 12px 28px; border-radius: 8px;
    font-size: 14px; font-weight: 400;
    transition: color 0.2s, border-color 0.2s;
  }
  .da-btn-ghost:hover { color: var(--text); border-color: rgba(255,255,255,0.22); }
  .da-hero-note {
    margin-top: 0.9rem; font-size: 11px; color: #3a3a3a;
    letter-spacing: 0.07em; text-transform: uppercase;
    animation: daFadeUp 0.55s 0.32s ease both;
  }

  /* PHONE SECTION */
  .da-phone-section {
    display: flex; justify-content: center; align-items: center;
    padding: 2rem 1.5rem 5rem; position: relative;
  }
  .da-phone-wrap {
    position: relative; animation: daFloat 6s ease-in-out infinite;
  }
  @keyframes daFloat { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-14px)} }

  .da-phone {
    width: 246px;
    background: #181818;
    border-radius: 40px;
    border: 1.5px solid rgba(255,255,255,0.1);
    padding: 10px;
    box-shadow: 0 50px 100px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.06);
  }
  .da-phone-screen {
    background: #f2f2f0; border-radius: 32px;
    overflow: hidden; min-height: 460px; position: relative;
  }
  .da-phone-status {
    display: flex; justify-content: space-between;
    padding: 10px 16px 2px; font-size: 10px; color: #333; font-weight: 600;
  }
  .da-phone-body { padding: 8px 14px 60px; }
  .da-phone-header {
    display: flex; justify-content: space-between; align-items: center;
    margin-bottom: 14px;
  }
  .da-phone-title {
    font-family: 'Fraunces', serif; font-size: 18px;
    color: #111; font-weight: 700;
  }
  .da-phone-x {
    width: 22px; height: 22px; background: #e0e0e0;
    border-radius: 50%; display: flex; align-items: center;
    justify-content: center; font-size: 11px; color: #666;
  }
  .da-note-item {
    display: flex; align-items: center; gap: 10px;
    padding: 9px 0; border-bottom: 0.5px solid #e2e2e2;
    font-size: 12px; color: #1a1a1a; font-weight: 400;
  }
  .da-note-item.highlighted {
    background: #2a2a2a; border-radius: 8px;
    padding: 9px 10px; margin: 4px -10px;
    border-bottom: none;
  }
  .da-note-item.highlighted span { color: #eee; }
  .da-ndot {
    width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0;
  }
  .da-phone-tabs {
    position: absolute; bottom: 0; left: 0; right: 0;
    background: #f2f2f0; border-top: 0.5px solid #e2e2e2;
    display: flex; justify-content: space-around; padding: 10px 20px 14px;
  }

  .da-float-chip {
    position: absolute; left: -96px; top: 28%;
    background: var(--surface2); border: 0.5px solid var(--border2);
    border-radius: 12px; padding: 10px 14px; width: 130px;
    animation: daFloatChip 5s ease-in-out infinite;
  }
  @keyframes daFloatChip { 0%,100%{transform:translateY(0) rotate(-2deg)} 50%{transform:translateY(-10px) rotate(-2deg)} }
  .da-float-chip-label { font-size: 10px; color: var(--muted); margin-bottom: 4px; }
  .da-float-chip-title { font-size: 12px; color: var(--text); font-weight: 500; line-height: 1.4; }
  .da-float-chip-tag {
    display: inline-block; margin-top: 6px;
    background: var(--green-bg); color: var(--green);
    font-size: 10px; padding: 2px 8px; border-radius: 999px;
  }
  @media (max-width: 520px) { .da-float-chip { display: none; } }

  /* FEATURES BENTO */
  .da-features { padding: 5rem 1.5rem 4rem; }
  .da-features-inner { max-width: 1040px; margin: 0 auto; }
  .da-section-label {
    font-size: 11px; color: #a99fff; letter-spacing: 0.1em;
    text-transform: uppercase; margin-bottom: 0.75rem;
  }
  .da-section-title {
    font-family: 'Fraunces', serif;
    font-size: clamp(1.9rem, 3.5vw, 2.8rem);
    font-weight: 700; line-height: 1.13; letter-spacing: -0.02em;
    color: var(--text); max-width: 520px;
  }
  .da-section-sub {
    color: var(--muted); font-size: 15px; max-width: 420px;
    margin-top: 0.75rem; line-height: 1.65; font-weight: 300;
  }

  .da-bento {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    gap: 10px; margin-top: 3rem;
  }
  .da-card {
    background: var(--surface); border: 0.5px solid var(--border);
    border-radius: 16px; padding: 1.5rem;
    transition: border-color 0.22s, transform 0.22s;
    overflow: hidden; position: relative;
  }
  .da-card:hover { border-color: var(--border2); transform: translateY(-2px); }

  .da-c1 { grid-column: span 7; }
  .da-c2 { grid-column: span 5; background: linear-gradient(135deg, rgba(123,108,246,0.07) 0%, var(--surface) 60%); border-color: rgba(123,108,246,0.18); }
  .da-c3 { grid-column: span 4; }
  .da-c4 { grid-column: span 4; }
  .da-c5 { grid-column: span 4; }

  @media (max-width: 860px) {
    .da-c1, .da-c2 { grid-column: span 12; }
    .da-c3, .da-c4, .da-c5 { grid-column: span 6; }
    .da-c5 { grid-column: span 12; }
  }
  @media (max-width: 520px) {
    .da-c3, .da-c4, .da-c5 { grid-column: span 12; }
  }

  .da-card-chip {
    display: inline-flex; align-items: center; gap: 5px;
    font-size: 10px; padding: 3px 10px; border-radius: 999px;
    font-weight: 500; margin-bottom: 0.9rem;
  }
  .da-chip-green { background: var(--green-bg); color: var(--green); }
  .da-chip-purple { background: var(--accent-soft); color: #a99fff; }
  .da-chip-amber { background: rgba(251,191,36,0.1); color: #fbbf24; }

  .da-card h3 {
    font-family: 'Fraunces', serif; font-size: 1.2rem;
    font-weight: 700; line-height: 1.2; color: var(--text); margin-bottom: 0.45rem;
  }
  .da-card p { font-size: 13px; color: var(--muted); line-height: 1.65; font-weight: 300; }

  .da-card-preview {
    margin-top: 1.1rem; background: var(--surface2); border-radius: 10px;
    border: 0.5px solid var(--border); padding: 1rem;
  }
  .da-preview-top {
    display: flex; align-items: center; justify-content: space-between;
    margin-bottom: 8px;
  }
  .da-preview-label { font-size: 11px; color: var(--muted); }
  .da-preview-badge {
    font-size: 10px; background: var(--accent-soft); color: #a99fff;
    padding: 2px 8px; border-radius: 999px;
  }
  .da-bar { height: 6px; border-radius: 3px; background: var(--surface3); margin: 5px 0; }
  .da-bar-fill { height: 6px; border-radius: 3px; background: linear-gradient(90deg, var(--accent), #a99fff); }

  .da-smart-icon {
    width: 38px; height: 38px; background: var(--accent-soft);
    border: 0.5px solid var(--accent-border); border-radius: 10px;
    display: flex; align-items: center; justify-content: center;
    font-size: 18px; margin-bottom: 1rem;
  }

  /* BOTTOM FEATURES */
  .da-features-row {
    padding: 0 1.5rem 5rem;
  }
  .da-features-row-inner {
    max-width: 1040px; margin: 0 auto;
    display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 0; border: 0.5px solid var(--border); border-radius: 16px; overflow: hidden;
  }
  .da-feat {
    padding: 1.75rem 1.5rem;
    border-right: 0.5px solid var(--border);
    border-bottom: 0.5px solid var(--border);
    transition: background 0.2s;
  }
  .da-feat:hover { background: var(--surface2); }
  .da-feat-icon {
    width: 36px; height: 36px; background: var(--surface2);
    border: 0.5px solid var(--border2); border-radius: 9px;
    display: flex; align-items: center; justify-content: center;
    font-size: 16px; margin-bottom: 0.9rem;
  }
  .da-feat h4 {
    font-family: 'Fraunces', serif; font-size: 1rem;
    font-weight: 700; margin-bottom: 0.35rem; color: var(--text);
  }
  .da-feat p { font-size: 12.5px; color: var(--muted); line-height: 1.6; font-weight: 300; }

  /* CTA */
  .da-cta { padding: 4rem 1.5rem 6rem; display: flex; justify-content: center; }
  .da-cta-box {
    max-width: 660px; width: 100%;
    background: var(--surface); border: 0.5px solid var(--border2);
    border-radius: 24px; padding: 4rem 2.5rem;
    text-align: center; position: relative; overflow: hidden;
  }
  .da-cta-glow {
    position: absolute; top: -80px; left: 50%; transform: translateX(-50%);
    width: 320px; height: 240px; pointer-events: none;
    background: radial-gradient(ellipse, rgba(123,108,246,0.18) 0%, transparent 68%);
  }
  .da-cta-box h2 {
    font-family: 'Fraunces', serif;
    font-size: clamp(2rem, 4vw, 3rem);
    font-weight: 700; line-height: 1.1;
    letter-spacing: -0.022em; margin-bottom: 0.9rem;
  }
  .da-cta-box p { color: var(--muted); font-size: 15px; margin-bottom: 2rem; font-weight: 300; }
  .da-cta-note {
    margin-top: 0.75rem; font-size: 11px; color: #3a3a3a;
    text-transform: uppercase; letter-spacing: 0.08em;
  }

  /* FOOTER */
  .da-footer {
    border-top: 0.5px solid var(--border);
    padding: 1.25rem 2rem;
    display: flex; justify-content: space-between; align-items: center;
    flex-wrap: wrap; gap: 0.75rem;
  }
  .da-footer-logo {
    font-family: 'Fraunces', serif; font-size: 13px;
    font-weight: 300; color: var(--muted2);
  }
  .da-footer-links { display: flex; gap: 1.5rem; }
  .da-footer-links a { font-size: 12px; color: var(--muted2); transition: color 0.2s; }
  .da-footer-links a:hover { color: var(--muted); }
  .da-footer-copy { font-size: 11px; color: var(--muted2); }

  /* ANIMATIONS */
  @keyframes daFadeUp {
    from { opacity: 0; transform: translateY(18px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .da-reveal {
    opacity: 0; transform: translateY(22px);
    transition: opacity 0.55s ease, transform 0.55s ease;
  }
  .da-reveal.da-visible { opacity: 1; transform: translateY(0); }
  .da-reveal-d1 { transition-delay: 0.08s; }
  .da-reveal-d2 { transition-delay: 0.16s; }
  .da-reveal-d3 { transition-delay: 0.24s; }
  .da-reveal-d4 { transition-delay: 0.32s; }
`;

function useReveal() {
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { el.classList.add("da-visible"); obs.disconnect(); } },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

function PhoneMockup() {
  const notes = [
    { label: "Morning Reflection", color: "#7b6cf6", highlight: false },
    { label: "Archive", color: "#f97316", highlight: false },
    { label: "Do It Now", color: "#22c55e", highlight: false },
    { label: "Do It Now", color: "#3b82f6", highlight: true },
    { label: "Do It Now", color: "#7b6cf6", highlight: false },
    { label: "Do It Now", color: "#ec4899", highlight: false },
    { label: "Go PO", color: "#f59e0b", highlight: false },
  ];
  return (
    <div className="da-phone">
      <div className="da-phone-screen">
        <div className="da-phone-status">
          <span>9:41</span><span>▲ ◀ ■</span>
        </div>
        <div className="da-phone-body">
          <div className="da-phone-header">
            <span className="da-phone-title">Mood Muses</span>
            <div className="da-phone-x">✕</div>
          </div>
          {notes.map((n, i) => (
            <div key={i} className={`da-note-item${n.highlight ? " highlighted" : ""}`}>
              <span className="da-ndot" style={{ background: n.color }} />
              <span>{n.label}</span>
            </div>
          ))}
        </div>
        <div className="da-phone-tabs">
          {["⊞", "○", "↑"].map((ic, i) => (
            <span key={i} style={{ fontSize: 18, opacity: i === 1 ? 1 : 0.35, color: "#333" }}>{ic}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function DigitalAtelier() {
  const r1 = useReveal(), r2 = useReveal(), r3 = useReveal();
  const r4 = useReveal(), r5 = useReveal(), r6 = useReveal();

  return (
    <div className="da-root">
      <style>{styles}</style>

      {/* NAV */}
      <nav className="da-nav">
        <span className="da-nav-logo">Digital Atelier</span>
        <div className="da-nav-links">
          <a href="#">Features</a>
          <a href="#">Pricing</a>
        </div>
        <Link href={'/mynotes/sign-in'} className="da-nav-cta">Get Started</Link>
      </nav>

      {/* HERO */}
      <section className="da-hero">
        <div className="da-hero-glow" />
        <div className="da-pill">
          <span className="da-pill-dot" />
          Refined for deep thinkers
        </div>
        <h1>
          The Digital Atelier<br />
          <em>for Your Thoughts.</em>
        </h1>
        <p className="da-hero-sub">
          Refined, focused, and designed for the modern thinker. Capture ideas in a distraction-free environment that prioritises intellectual clarity.
        </p>
        <div className="da-hero-actions">
          <button className="da-btn-primary">Start Your Collection</button>
          <button className="da-btn-ghost">View Demo</button>
        </div>
        <p className="da-hero-note">No credit card required · Always free to start</p>
      </section>

      {/* PHONE */}
      <div className="da-phone-section">
        <div className="da-phone-wrap">
          <div className="da-float-chip">
            <div className="da-float-chip-label">Pinned note</div>
            <div className="da-float-chip-title">Morning Reflection</div>
            <span className="da-float-chip-tag">Thoughtful</span>
          </div>
          <PhoneMockup />
        </div>
      </div>

      {/* FEATURES */}
      <section className="da-features">
        <div className="da-features-inner">
          <div ref={r1} className="da-reveal">
            <p className="da-section-label">Why Digital Atelier</p>
            <h2 className="da-section-title">Precision-Crafted Notes.</h2>
            <p className="da-section-sub">Every element is placed with the precision of a gallery curator. Organise your mind visually.</p>
          </div>

          <div className="da-bento">
            <div ref={r2} className="da-card da-c1 da-reveal da-reveal-d1">
              <span className="da-card-chip da-chip-green">● Live</span>
              <h3>The Philosophy of Architecture<br />in Digital Spaces</h3>
              <p>The way we organise our digital tools directly impacts the clarity of our mental monologues. We need more "atelier" spaces — studios for focused creation rather than noisy hubs for consumption.</p>
              <div className="da-card-preview">
                <div className="da-preview-top">
                  <span className="da-preview-label">Reading progress</span>
                  <span className="da-preview-badge">1 min read</span>
                </div>
                <div className="da-bar"><div className="da-bar-fill" style={{ width: "42%" }} /></div>
                <div className="da-bar" style={{ width: "80%" }} />
                <div className="da-bar" style={{ width: "60%" }} />
              </div>
            </div>

            <div ref={r3} className="da-card da-c2 da-reveal da-reveal-d2">
              <span className="da-card-chip da-chip-amber">Adaptive Topics</span>
              <h3>Smart Pinning &amp; Context</h3>
              <p>The system understands what you're working on and surfaces relevant notes from your archives automatically.</p>
              <div className="da-smart-icon">◈</div>
            </div>

            <div ref={r4} className="da-card da-c3 da-reveal da-reveal-d1">
              <span className="da-card-chip da-chip-purple">Visual</span>
              <h3>Visual Organisation</h3>
              <p>Move notes in the space. Arrange and sort them to canvases that match your mental model.</p>
            </div>

            <div ref={r4} className="da-card da-c4 da-reveal da-reveal-d2">
              <span className="da-card-chip da-chip-green">AI</span>
              <h3>Morning Reflection</h3>
              <p>Atelier automatically categorises based on the themes of your writing, using neural semantic mapping.</p>
            </div>

            <div ref={r4} className="da-card da-c5 da-reveal da-reveal-d3">
              <span className="da-card-chip da-chip-amber">Smart</span>
              <h3>Context Layers</h3>
              <p>Notes surface in the right moment, connected to the work that is happening right now.</p>
            </div>
          </div>
        </div>
      </section>

      {/* BOTTOM FEATURES ROW */}
      <div className="da-features-row">
        <div ref={r5} className="da-features-row-inner da-reveal">
          {[
            { icon: "↻", title: "Instant Sync", desc: "Your notes follow you. From desktop to mobile, your insights are always current and available to where you create." },
            { icon: "✦", title: "Advanced Markdown", desc: "Powerful editing tools that disappear when you don't need them. Focus on the prose, not the toolbar." },
            { icon: "⊹", title: "Shared Spaces", desc: "Real-time collaboration designed for teams who value privacy and structured feedback loops." },
            { icon: "◉", title: "Privacy First", desc: "End-to-end encryption by default. We believe your thoughts should belong to no one but yourself." },
          ].map((f, i) => (
            <div key={i} className="da-feat">
              <div className="da-feat-icon">{f.icon}</div>
              <h4>{f.title}</h4>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="da-cta">
        <div ref={r6} className="da-cta-box da-reveal">
          <div className="da-cta-glow" />
          <h2>Elevate Your Thinking.</h2>
          <p>Join 50,000+ creators who trust Digital Atelier to hold their most important ideas.</p>
          <button className="da-btn-ghost" style={{ color: "var(--text)", borderColor: "var(--border2)", padding: "13px 32px", fontSize: "15px" }}>
            Get Started Free
          </button>
          <p className="da-cta-note">No credit card required · Always free</p>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="da-footer">
        <span className="da-footer-logo">Digital Atelier</span>
        <div className="da-footer-links">
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
          <a href="#">Twitter</a>
          <a href="#">Support</a>
        </div>
        <span className="da-footer-copy">© 2024 Digital Atelier</span>
      </footer>
    </div>
  );
}