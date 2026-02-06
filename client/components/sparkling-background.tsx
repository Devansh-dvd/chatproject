import { useEffect, useRef } from 'react';

export function SparklingBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    let gridIndex = 0;
    const gridCols = 10;
    const gridRows = 10;
    const cellWidth = 10;
    const cellHeight = 10;

    const createSparkle = () => {
      const sparkle = document.createElement('div');

      // Distribute uniformly across grid
      const cellX = gridIndex % gridCols;
      const cellY = Math.floor(gridIndex / gridCols) % gridRows;
      gridIndex++;

      // Random position within cell + grid offset
      const x = (cellX * cellWidth) + Math.random() * cellWidth;
      const y = (cellY * cellHeight) + Math.random() * cellHeight;

      const size = 3;
      const duration = 0.7;

      sparkle.style.cssText = `
        position: fixed;
        left: ${x}%;
        top: ${y}%;
        width: ${size}px;
        height: ${size}px;
        background: radial-gradient(circle, rgba(34, 197, 94, 1) 0%, rgba(34, 197, 94, 0.5) 70%, transparent 100%);
        border-radius: 50%;
        box-shadow: 0 0 6px rgba(34, 197, 94, 0.9);
        pointer-events: none;
        --tx: ${(Math.random() - 0.5) * 80}px;
        --ty: ${-Math.random() * 120}px;
        animation: sparkle ${duration}s ease-out forwards;
      `;

      containerRef.current?.appendChild(sparkle);

      setTimeout(() => sparkle.remove(), duration * 1000);
    };

    const interval = setInterval(createSparkle, 40);

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
