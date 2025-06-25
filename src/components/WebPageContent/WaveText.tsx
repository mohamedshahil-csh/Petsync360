import React from 'react';

type Props = { text: string };

const WaveText: React.FC<Props> = ({ text }) => (
  <>
    {text.split('').map((ch, i) => (
      <span
        key={i}
        className="inline-block animate-wave"
        style={{ animationDelay: `${i * 0.55}s` }} // 50 ms stagger
      >
        {ch === ' ' ? '\u00A0' : ch}
      </span>
    ))}
  </>
);

export default WaveText;
