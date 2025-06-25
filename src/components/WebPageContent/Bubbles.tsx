const Bubbles: React.FC = () => (
    <>
      {Array.from({ length: 14 }).map((_, i) => {
        // random size & position
        const size = 14 + Math.random() * 22; // 14‑36 px
        return (
          <span
            key={i}
            className="absolute rounded-full pointer-events-none animate-bubble"
            style={{
              width: `${size}px`,
              height: `${size}px`,
              // scatter bubbles around the circle
              top: `${30 + Math.random() * 40}%`,
              left: `${30 + Math.random() * 40}%`,
              background: [
                '#f87171', // rose‑500
                '#facc15', // amber‑400
                '#4ade80', // green‑400
                '#60a5fa', // blue‑400
                '#a78bfa', // violet‑400
              ][i % 5],
              opacity: 0.8,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${4 + Math.random() * 2}s`,
            }}
          />
        );
      })}
    </>
  );