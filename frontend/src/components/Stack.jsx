import React from 'react';

export default function Stack({ t }) {
  const icons = [
    // full-stack — layers
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 17 22 12"></polyline></svg>,
    // java — coffee
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8h1a4 4 0 0 1 0 8h-1"></path><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path><line x1="6" y1="1" x2="6" y2="4"></line><line x1="10" y1="1" x2="10" y2="4"></line><line x1="14" y1="1" x2="14" y2="4"></line></svg>,
    // python — terminal
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="4 17 10 11 4 5"></polyline><line x1="12" y1="19" x2="20" y2="19"></line></svg>,
    // automation — zap
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>,
  ];
  return (
    <section className="section" id="stack" data-screen-label="03 Stack">
      <div className="section-label reveal">{t.stack.label}</div>
      <h2 className="section-heading reveal">
        {t.stack.heading_1}<span className="accent">{t.stack.heading_accent}</span>{t.stack.heading_2}
      </h2>
      <div className="stack reveal">
        {t.stack.items.map((it, i) => (
          <div key={i} className="stack-item">
            <div className="icon">{icons[i]}</div>
            <h4>{it.title}</h4>
            <p>{it.desc}</p>
            <div className="tags">
              {it.tags.map((tag, j) => <span key={j} className="tag">{tag}</span>)}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
