import React from 'react';

type Props = { text: string };

const LeadingWaveText: React.FC<Props> = ({ text }) => {
  const words = text.split(' ');

  return (
    <>
      {words.map((word, wIdx) => (
        <span key={wIdx} className="inline-block">
          {/* first letter waves */}
          <span
            className="inline-block animate-wave"
            style={{ animationDelay: `${wIdx * 0.25}s` }}   // stagger by word
          >
            {word.charAt(0)}
          </span>
          {/* the rest of the word stays still */}
          {word.slice(1)}
          {/* keep spaces intact */}
          {wIdx < words.length - 1 && '\u00A0'}
        </span>
      ))}
    </>
  );
};

export default LeadingWaveText;
