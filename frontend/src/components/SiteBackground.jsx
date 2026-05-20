import React, { useEffect, useRef } from 'react';

export default function SiteBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let w, h, dpr;
    let particles = [];
    const mouse = { x: -9999, y: -9999, active: false };
    let raf;

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      init();
    };

    const rand = (a, b) => a + Math.random() * (b - a);

    const init = () => {
      particles = [];
      const count = Math.min(160, Math.floor((w * h) / 11000));
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: rand(-0.3, 0.3),
          vy: rand(-0.3, 0.3),
          r: rand(0.6, 1.8),
          base: rand(0.3, 0.85),
          hue: Math.random() < 0.15 ? 'white' : 'green',
        });
      }
    };

    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
    };
    const onLeave = () => { mouse.active = false; mouse.x = -9999; mouse.y = -9999; };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        p.x += p.vx;
        p.y += p.vy;
        p.vx += (Math.random() - 0.5) * 0.02;
        p.vy += (Math.random() - 0.5) * 0.02;

        const sp = Math.hypot(p.vx, p.vy);
        if (sp > 0.5) { p.vx = (p.vx / sp) * 0.5; p.vy = (p.vy / sp) * 0.5; }

        if (p.x < -20) p.x = w + 20;
        if (p.x > w + 20) p.x = -20;
        if (p.y < -20) p.y = h + 20;
        if (p.y > h + 20) p.y = -20;

        let factor = 0;
        if (mouse.active) {
          const dx = mouse.x - p.x, dy = mouse.y - p.y;
          const d = Math.hypot(dx, dy);
          if (d < 200) factor = 1 - d / 200;
        }

        const r = p.r * (1 + factor * 2.2);
        const alpha = Math.min(1, p.base + factor * 0.6);
        const color = p.hue === 'white'
          ? `rgba(255,255,255,${alpha})`
          : `rgba(16,185,129,${alpha})`;

        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j];
          const dx = p.x - q.x, dy = p.y - q.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < 11000) {
            let lineFactor = 0;
            if (mouse.active) {
              const mx = (p.x + q.x) / 2 - mouse.x;
              const my = (p.y + q.y) / 2 - mouse.y;
              const md = Math.hypot(mx, my);
              if (md < 200) lineFactor = 1 - md / 200;
            }
            const a = (1 - d2 / 11000) * (0.12 + lineFactor * 0.55);
            ctx.strokeStyle = `rgba(16,185,129,${a})`;
            ctx.lineWidth = 0.5 + lineFactor * 1.2;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.stroke();
          }
        }

        if (mouse.active) {
          const dx = mouse.x - p.x, dy = mouse.y - p.y;
          const d = Math.hypot(dx, dy);
          if (d < 180) {
            const a = (1 - d / 180) * 0.7;
            ctx.strokeStyle = `rgba(16,185,129,${a})`;
            ctx.lineWidth = 0.8 + (1 - d / 180) * 1.2;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
          }
        }
      }

      if (mouse.active) {
        ctx.fillStyle = 'rgba(16,185,129,0.95)';
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = 'rgba(16,185,129,0.5)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 8, 0, Math.PI * 2);
        ctx.stroke();

        const g = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 220);
        g.addColorStop(0, 'rgba(16,185,129,0.16)');
        g.addColorStop(1, 'rgba(16,185,129,0)');
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, w, h);
      }

      raf = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener('resize', resize);
    canvas.addEventListener('mousemove', onMove);
    canvas.addEventListener('mouseleave', onLeave);
    window.addEventListener('mousemove', onMove);
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('mousemove', onMove);
      canvas.removeEventListener('mouseleave', onLeave);
      window.removeEventListener('mousemove', onMove);
    };
  }, []);

  return (
    <div className="site-bg" aria-hidden="true">
      <canvas ref={canvasRef} className="site-bg-canvas" />
      <div className="site-bg-grid" />
      <div className="site-bg-overlay" />
    </div>
  );
}
