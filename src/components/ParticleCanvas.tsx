import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  alpha: number;
  pulse: number;
  speed: number;
  hue: number;
}

const COUNT = 480;

export default function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const targetRef = useRef({ x: 0.5, y: 0.5 });
  const particlesRef = useRef<Particle[]>([]);
  const rafRef = useRef<number>(0);
  const dimsRef = useRef({ w: 0, h: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    function resize() {
      const parent = canvas!.parentElement;
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      dimsRef.current = { w: rect.width, h: rect.height };
      canvas!.width = rect.width * dpr;
      canvas!.height = rect.height * dpr;
      canvas!.style.width = rect.width + 'px';
      canvas!.style.height = rect.height + 'px';
      ctx!.scale(dpr, dpr);
    }

    function makeParticle(): Particle {
      const { w, h } = dimsRef.current;
      return {
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        r: Math.random() * 2.5 + 0.5,
        alpha: Math.random() * 0.35 + 0.05,
        pulse: Math.random() * Math.PI * 2,
        speed: Math.random() * 0.008 + 0.004,
        hue: Math.random(),
      };
    }

    function drawConnections(ps: Particle[]) {
      for (let i = 0; i < ps.length; i++) {
        for (let j = i + 1; j < ps.length; j++) {
          const dx = ps[i].x - ps[j].x;
          const dy = ps[i].y - ps[j].y;
          const d = dx * dx + dy * dy;
          if (d < 7000) {
            const a = (1 - d / 7000) * 0.04;
            ctx!.beginPath();
            ctx!.moveTo(ps[i].x, ps[i].y);
            ctx!.lineTo(ps[j].x, ps[j].y);
            ctx!.strokeStyle = `rgba(192,57,43,${a})`;
            ctx!.lineWidth = 0.5;
            ctx!.stroke();
          }
        }
      }
    }

    function updateParticle(p: Particle) {
      const { w, h } = dimsRef.current;
      const { x: tx, y: ty } = targetRef.current;
      p.pulse += p.speed;
      const dx = tx * w - p.x;
      const dy = ty * h - p.y;
      const dist = Math.sqrt(dx * dx + dy * dy) || 0.001;

      const REPEL_R = 55; // hard repulsion radius
      const ATTRACT_R = 500; // attraction falloff radius

      if (dist < REPEL_R) {
        // Repel: push outward, stronger the closer they are
        const repelForce = (1 - dist / REPEL_R) * 0.32;
        p.vx -= (dx / dist) * repelForce;
        p.vy -= (dy / dist) * repelForce;
      } else {
        // Attract: pull toward cursor, linear falloff
        const attract = Math.max(0, 1 - dist / ATTRACT_R);
        p.vx += (dx / dist) * attract * 0.06;
        p.vy += (dy / dist) * attract * 0.06;
      }

      // Persistent random drift — always keeps particles moving
      p.vx += (Math.random() - 0.5) * 0.18;
      p.vy += (Math.random() - 0.5) * 0.18;

      // Speed cap so drift doesn't snowball
      const spd = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
      if (spd > 3.5) {
        p.vx = (p.vx / spd) * 3.5;
        p.vy = (p.vy / spd) * 3.5;
      }

      p.vx *= 0.94;
      p.vy *= 0.94;
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < -10) p.x = w + 10;
      if (p.x > w + 10) p.x = -10;
      if (p.y < -10) p.y = h + 10;
      if (p.y > h + 10) p.y = -10;
    }

    function drawParticle(p: Particle) {
      const a = p.alpha * (0.5 + 0.5 * Math.sin(p.pulse));
      ctx!.beginPath();
      ctx!.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      if (p.hue < 0.5) ctx!.fillStyle = `rgba(192,57,43,${a})`;
      else if (p.hue < 0.8) ctx!.fillStyle = `rgba(169,50,38,${a * 0.7})`;
      else ctx!.fillStyle = `rgba(220,100,80,${a * 0.5})`;
      ctx!.fill();
    }

    function loop() {
      const { w, h } = dimsRef.current;
      ctx!.clearRect(0, 0, w, h);
      const t = targetRef.current;
      const m = mouseRef.current;
      t.x += (m.x - t.x) * 0.1;
      t.y += (m.y - t.y) * 0.1;
      const ps = particlesRef.current;
      drawConnections(ps);
      ps.forEach((p) => {
        updateParticle(p);
        drawParticle(p);
      });
      rafRef.current = requestAnimationFrame(loop);
    }

    function onMouseMove(e: MouseEvent) {
      const rect = canvas!.getBoundingClientRect();
      mouseRef.current = {
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
      };
    }

    resize();
    particlesRef.current = Array.from({ length: COUNT }, makeParticle);
    loop();

    const parent = canvas.parentElement!;
    window.addEventListener('mousemove', onMouseMove, { passive: true });

    const ro = new ResizeObserver(resize);
    ro.observe(parent);

    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
      }}
    />
  );
}
