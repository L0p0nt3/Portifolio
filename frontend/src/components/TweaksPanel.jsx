import React from 'react';

export default function TweaksPanel({ theme, setTheme, lang, setLang, onClose }) {
  return (
    <div style={{
      position: 'fixed',
      bottom: 24, right: 24,
      background: 'var(--bg-elev)',
      border: '1px solid var(--border-strong)',
      borderRadius: 16,
      padding: 18,
      width: 260,
      zIndex: 200,
      boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
      color: 'var(--fg)',
      fontFamily: 'Geist, sans-serif',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <div style={{ fontSize: 13, fontWeight: 600, letterSpacing: '-0.01em' }}>Tweaks</div>
        <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: 'var(--fg-dim)', cursor: 'pointer', fontSize: 16, lineHeight: 1 }}>✕</button>
      </div>
      <div style={{ marginBottom: 16 }}>
        <div style={{ fontFamily: 'Geist Mono, monospace', fontSize: 10, color: 'var(--fg-mute)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 8 }}>Theme</div>
        <div style={{ display: 'flex', gap: 6 }}>
          {['dark','light'].map(opt => (
            <button key={opt} onClick={() => setTheme(opt)} style={{
              flex: 1,
              padding: '8px 12px',
              background: theme === opt ? 'var(--fg)' : 'transparent',
              color: theme === opt ? 'var(--bg)' : 'var(--fg-dim)',
              border: '1px solid ' + (theme === opt ? 'var(--fg)' : 'var(--border)'),
              borderRadius: 8,
              fontSize: 12,
              fontWeight: 500,
              cursor: 'pointer',
              textTransform: 'capitalize',
              fontFamily: 'inherit',
            }}>{opt}</button>
          ))}
        </div>
      </div>
      <div>
        <div style={{ fontFamily: 'Geist Mono, monospace', fontSize: 10, color: 'var(--fg-mute)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 8 }}>Language</div>
        <div style={{ display: 'flex', gap: 6 }}>
          {['pt','en'].map(opt => (
            <button key={opt} onClick={() => setLang(opt)} style={{
              flex: 1,
              padding: '8px 12px',
              background: lang === opt ? 'var(--fg)' : 'transparent',
              color: lang === opt ? 'var(--bg)' : 'var(--fg-dim)',
              border: '1px solid ' + (lang === opt ? 'var(--fg)' : 'var(--border)'),
              borderRadius: 8,
              fontSize: 12,
              fontWeight: 500,
              cursor: 'pointer',
              textTransform: 'uppercase',
              fontFamily: 'inherit',
            }}>{opt}</button>
          ))}
        </div>
      </div>
    </div>
  );
}
