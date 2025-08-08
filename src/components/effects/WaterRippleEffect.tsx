import React, { useRef, useEffect } from 'react';

const WaterRippleEffect: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ripples: {
    x: number;
    y: number;
    radius: number;
    alpha: number;
    speed: number;
  }[] = [];

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');

    if (!canvas || !ctx) return;

    let animationFrameId: number;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const createRipple = (x: number, y: number) => {
      ripples.push({
        x,
        y,
        radius: 0,
        alpha: 1,
        speed: Math.random() * 1.5 + 0.5,
      });
    };

    // Randomly drop water ripples
    const dropRandomRipple = () => {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      createRipple(x, y);
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = ripples.length - 1; i >= 0; i--) {
        const ripple = ripples[i];

        ripple.radius += ripple.speed;
        ripple.alpha -= 0.01;

        if (ripple.alpha <= 0) {
          ripples.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(ripple.x, ripple.y, ripple.radius, 0, 2 * Math.PI);
        ctx.strokeStyle = `rgba(173, 216, 230, ${ripple.alpha})`; // Light blue
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    // Create ripples every 300ms
    const interval = setInterval(dropRandomRipple, 300);
    draw();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
      clearInterval(interval);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
    />
  );
};

export default WaterRippleEffect;
