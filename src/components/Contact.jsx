import React, { useState, useRef } from 'react';

const EMAIL = 'cztechnology.contato@gmail.com';
const WHATSAPP_NUMBER = '5521991119338';

export default function Contact({ t }) {
  const [showToast, setShowToast] = useState(false);
  const timeoutRef = useRef(null);

  const handleEmailClick = () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(EMAIL);
      } else {
        const ta = document.createElement('textarea');
        ta.value = EMAIL;
        ta.setAttribute('readonly', '');
        ta.style.position = 'absolute';
        ta.style.left = '-9999px';
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
      }
    } catch {}

    setShowToast(true);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setShowToast(false), 2500);
  };

  return (
    <section className="section" id="contact" data-screen-label="05 Contact">
      <div className="section-label reveal">{t.contact.label}</div>
      <div className="contact-card reveal">
        <div className="contact-inner">
          <h2>
            {t.contact.heading_1}<span className="accent" style={{ color: 'var(--accent)', fontStyle: 'italic', fontWeight: 400 }}>{t.contact.heading_accent}</span>{t.contact.heading_2}
          </h2>
          <p className="lead">{t.contact.lead}</p>
          <div className="contact-actions">
            <a
              href={`mailto:${EMAIL}?subject=${encodeURIComponent(t.contact.email_subject)}&body=${encodeURIComponent(t.contact.email_body)}`}
              className="btn btn-primary"
              onClick={handleEmailClick}
            >
              {t.contact.primary}
              <svg className="arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
            </a>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(t.contact.whatsapp_text)}`}
              target="_blank"
              rel="noreferrer"
              className="btn btn-ghost"
            >
              {t.contact.secondary}
            </a>
          </div>
        </div>
      </div>
      <div className={`contact-toast${showToast ? ' show' : ''}`} role="status" aria-live="polite">
        {t.contact.toast_copied}
      </div>
    </section>
  );
}
