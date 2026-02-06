import { useEffect, useRef } from 'react';

export function SparklingBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const createSparkle = () => {
      const sparkle = document.createElement('div');
      const size = Math.random() * 4 + 2;
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      const duration = Math.random() * 0.5 + 0.6;

      sparkle.style.cssText = `
        position: absolute;
        left: ${x}%;
        top: ${y}%;
        width: ${size}px;
        height: ${size}px;
        background: radial-gradient(circle, rgba(34, 197, 94, 1) 0%, rgba(34, 197, 94, 0.5) 70%, transparent 100%);
        border-radius: 50%;
        box-shadow: 0 0 ${size * 2}px rgba(34, 197, 94, 0.8);
        pointer-events: none;
        --tx: ${(Math.random() - 0.5) * 100}px;
        --ty: ${-Math.random() * 150}px;
        animation: sparkle ${duration}s ease-out forwards;
      `;

      containerRef.current?.appendChild(sparkle);

      setTimeout(() => sparkle.remove(), duration * 1000);
    };

    const interval = setInterval(createSparkle, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none overflow-hidden"
      aria-hidden="true"
    />
  );
}
