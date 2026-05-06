import React, { useState, useEffect, useMemo } from 'react';
import { dict, TWEAK_DEFAULTS } from './data/dict';
import SiteBackground from './components/SiteBackground';
import Nav from './components/Nav';
import Hero from './components/Hero';
import About from './components/About';
import Stack from './components/Stack';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import TweaksPanel from './components/TweaksPanel';

export default function App() {
  const [theme, setTheme] = useState(TWEAK_DEFAULTS.theme);
  const [lang, setLang] = useState(TWEAK_DEFAULTS.lang);
  const [scrolled, setScrolled] = useState(false);
  const [filter, setFilter] = useState('all');
  const [tweaksOpen, setTweaksOpen] = useState(false);

  const t = dict[lang];

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en';
  }, [lang]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // reveal observer
  useEffect(() => {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
    const observe = () => {
      document.querySelectorAll('.reveal:not(.in)').forEach(el => io.observe(el));
    };
    observe();
    // re-observe shortly after to catch DOM updates from filter changes
    const t1 = setTimeout(observe, 50);
    return () => { clearTimeout(t1); io.disconnect(); };
  }, [lang, filter]);

  // Tweaks panel protocol
  useEffect(() => {
    const onMsg = (e) => {
      if (!e.data) return;
      if (e.data.type === '__activate_edit_mode') setTweaksOpen(true);
      if (e.data.type === '__deactivate_edit_mode') setTweaksOpen(false);
    };
    window.addEventListener('message', onMsg);
    // Add safe check for window.parent
    if (window.parent !== window) {
      window.parent.postMessage({ type: '__edit_mode_available' }, '*');
    }
    return () => window.removeEventListener('message', onMsg);
  }, []);

  const persist = (key, val) => {
    if (window.parent !== window) {
      window.parent.postMessage({ type: '__edit_mode_set_keys', edits: { [key]: val } }, '*');
    }
  };

  const setThemePersist = (v) => { setTheme(v); persist('theme', v); };
  const setLangPersist = (v) => { setLang(v); persist('lang', v); };

  const filteredProjects = useMemo(() => {
    if (filter === 'all') return t.projects.items;
    return t.projects.items.filter(p => p.cat === filter);
  }, [filter, t]);

  return (
    <>
      <SiteBackground />
      <Nav t={t} lang={lang} setLang={setLangPersist} theme={theme} setTheme={setThemePersist} scrolled={scrolled} />
      <Hero t={t} />
      <About t={t} />
      <Stack t={t} />
      <Projects t={t} filter={filter} setFilter={setFilter} items={filteredProjects} />
      <Contact t={t} />
      <Footer t={t} />
      {tweaksOpen && (
        <TweaksPanel
          theme={theme} setTheme={setThemePersist}
          lang={lang} setLang={setLangPersist}
          onClose={() => {
            setTweaksOpen(false);
            if (window.parent !== window) {
              window.parent.postMessage({ type: '__edit_mode_dismissed' }, '*');
            }
          }}
        />
      )}
    </>
  );
}
