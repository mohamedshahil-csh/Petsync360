import React from 'react';

type Props = { text: string };

const WaveText: React.FC<Props> = ({ text }) => (
  <>
    {text.split('').map((ch, i) => (
      <span
        key={i}
        className="inline-block animate-blurFlow"
        style={{ animationDelay: `${i * 0.1}s` }} // Adjust delay if needed
      >
        {ch === ' ' ? '\u00A0' : ch}
      </span>
    ))}
  </>
);

export default WaveText;
