import React from 'react';

export default function Projects({ t, filter, setFilter, items }) {
  const cats = ['all', 'web', 'auto', 'ai', 'system'];
  return (
    <section className="section" id="projects" data-screen-label="04 Projects">
      <div className="section-label reveal">{t.projects.label}</div>
      <div className="projects-head">
        <h2 className="section-heading reveal" style={{ marginBottom: 0 }}>
          {t.projects.heading_1}<span className="accent">{t.projects.heading_accent}</span>{t.projects.heading_2}
        </h2>
        <div className="projects-filters reveal">
          {cats.map(c => (
            <button key={c} className={'filter ' + (filter === c ? 'active' : '')} onClick={() => setFilter(c)}>
              {t.projects.filters[c]}
            </button>
          ))}
        </div>
      </div>
      <div className="projects-grid">
        {items.map((p, i) => (
          <article key={p.idx + p.title} className="project reveal" style={{ transitionDelay: `${i * 0.05}s` }}>
            <div className="project-thumb">
              <div className="project-thumb-pattern" />
              <div className="project-thumb-glyph">{p.glyph}</div>
              <span className="project-thumb-tag">{p.tag}</span>
              <span className={'project-thumb-status ' + (p.status === 'archived' ? 'archived' : '')}>
                <span className="d" />
                {p.status === 'live' ? t.projects.live : t.projects.archived}
              </span>
            </div>
            <div className="project-body">
              <div className="project-meta">
                <span>{p.idx} / {String(t.projects.items.length).padStart(2,'0')}</span>
                <span>{p.tag.split('·')[1]?.trim()}</span>
              </div>
              <h3 className="project-title">{p.title}</h3>
              <p className="project-desc">{p.desc}</p>
              <div className="project-stack">
                {p.stack.map((s, j) => <span key={j}>{s}</span>)}
              </div>
              <div className="project-cta">
                <span>{t.projects.view}</span>
                <svg className="arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
