import React from 'react';

export default function Footer({ t }) {
  return (
    <footer>
      <div>{t.footer.left}</div>
      <div><span className="live-dot" />{t.footer.right}</div>
    </footer>
  );
}
