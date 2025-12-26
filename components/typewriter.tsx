'use client';

import { useEffect, useState } from 'react';

export default function Typewriter({
  text,
  typingSpeed = 100,
  deletingSpeed = 50,
  pauseTime = 2000,
}: {
  text: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseTime?: number;
}) {
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [delta, setDelta] = useState(typingSpeed);

  useEffect(() => {
    let ticker = setInterval(() => {
      tick();
    }, delta);

    return () => clearInterval(ticker);
  }, [displayText, isDeleting, loopNum, delta]);

  const tick = () => {
    let i = loopNum % text.length;
    let fullText = text[i];
    let updatedText = isDeleting
      ? fullText.substring(0, displayText.length - 1)
      : fullText.substring(0, displayText.length + 1);

    setDisplayText(updatedText);

    if (isDeleting) {
      setDelta(deletingSpeed);
    }

    if (!isDeleting && updatedText === fullText) {
      setIsDeleting(true);
      setDelta(pauseTime);
    } else if (isDeleting && updatedText === '') {
      setIsDeleting(false);
      setLoopNum(loopNum + 1);
      setDelta(typingSpeed);
    } else if (!isDeleting && updatedText !== fullText) {
      setDelta(typingSpeed);
    }
  };

  return (
    <span>
      {displayText}
      <span className="border-r-2 border-neutral-900 ml-0.5 animate-pulse" aria-hidden="true" />
    </span>
  );
}
