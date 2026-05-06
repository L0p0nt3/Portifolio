import React from 'react';

export default function Hero({ t }) {
  return (
    <section className="hero" data-screen-label="01 Hero">
      <div className="hero-inner">
        <div className="hero-eyebrow reveal">{t.hero.eyebrow}</div>
        <div className="hero-devname reveal">LoponteDev</div>
        <h1 className="hero-title reveal">
          {t.hero.title_1}{' '}
          <span className="dim">{t.hero.title_2}</span>{' '}
          <br />
          {t.hero.title_3}
          <span className="accent">{t.hero.title_accent}</span>
          {t.hero.title_4}
        </h1>
        <p className="hero-sub reveal">{t.hero.sub}</p>
        <div className="hero-actions reveal">
          <a href="#projects" className="btn btn-primary">
            {t.hero.primary}
            <svg className="arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
          </a>
          <a href="#about" className="btn btn-ghost">{t.hero.secondary}</a>
        </div>
        <div className="hero-meta reveal">
          <div className="hero-meta-item">
            <div className="label">{t.hero.meta.role}</div>
            <div className="value">{t.hero.meta.role_v}</div>
          </div>
          <div className="hero-meta-item">
            <div className="label">{t.hero.meta.location}</div>
            <div className="value">{t.hero.meta.location_v}</div>
          </div>
          <div className="hero-meta-item">
            <div className="label">{t.hero.meta.status}</div>
            <div className="value"><span className="live-dot" />{t.hero.meta.status_v}</div>
          </div>
        </div>
      </div>
      <div className="scroll-hint">{t.hero.scroll}</div>
    </section>
  );
}
