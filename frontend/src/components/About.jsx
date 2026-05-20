import React from 'react';

export default function About({ t }) {
  return (
    <section className="section" id="about" data-screen-label="02 About">
      <div className="section-label reveal">{t.about.label}</div>
      <h2 className="section-heading reveal">
        {t.about.heading_1}<span className="accent">{t.about.heading_accent}</span>{t.about.heading_2}<span className="accent">{t.about.heading_accent_2}</span>{t.about.heading_3}
      </h2>
      <div className="about-grid">
        <div className="about-portrait reveal">
          <div className="portrait-name">LoponteDev</div>
          <div className="portrait-frame">
            <img src="assets/about.png?v=2" alt="Lucas Loponte" />
          </div>
          <div className="portrait-tag">
            <span>{t.about.tag_left}</span>
            <span>{t.about.tag_right}</span>
          </div>
        </div>
        <div className="about-body reveal">
          <p>{t.about.lead}</p>
          <p>{t.about.p1}</p>
          <p>{t.about.p2}</p>
          <div className="about-stats">
            {t.about.stats.map((s, i) => (
              <div key={i} className="about-stat">
                <div className="num">
                  {s.num.includes('+') || s.num.includes('/') ? (
                    <>{s.num.replace(/(\+|\/.+)/, '')}<span className="accent">{s.num.match(/(\+|\/.+)/)?.[0]}</span></>
                  ) : s.num}
                </div>
                <div className="lbl">{s.lbl}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
