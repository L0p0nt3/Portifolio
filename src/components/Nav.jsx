import React from 'react';

export default function Nav({ t, lang, setLang, theme, setTheme, scrolled }) {
  return (
    <nav className={'nav' + (scrolled ? ' scrolled' : '')}>
      <a href="#" className="nav-brand" style={{ textDecoration: 'none', color: 'inherit' }}>
        <span className="nav-dot" />
        <span>Loponte.Dev</span>
        <span className="mono" style={{ color: 'var(--fg-mute)', fontSize: 12, marginLeft: 4 }}>/ Portifólio</span>
      </a>
      <div className="nav-links">
        <a href="#about" className="nav-link hide-mobile">{t.nav.about}</a>
        <a href="#stack" className="nav-link hide-mobile">{t.nav.stack}</a>
        <a href="#projects" className="nav-link hide-mobile">{t.nav.projects}</a>
        <a href="#contact" className="nav-link hide-mobile">{t.nav.contact}</a>
        <div className="lang-toggle">
          <button className={lang === 'pt' ? 'active' : ''} onClick={() => setLang('pt')}>PT</button>
          <button className={lang === 'en' ? 'active' : ''} onClick={() => setLang('en')}>EN</button>
        </div>
        <button
          className="theme-toggle-btn"
          aria-label="Toggle theme"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        >
          {theme === 'dark' ? (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"></path></svg>
          ) : (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
          )}
        </button>
        <a href="#contact" className="nav-cta">{t.nav.cta}</a>
      </div>
    </nav>
  );
}
