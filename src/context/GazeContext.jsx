import React, { useState, useCallback, useRef } from 'react';
import confetti from 'canvas-confetti';
import { GazeContext } from './createGazeContext';

export const GazeProvider = ({ children }) => {
  const [gazeTarget, setGazeTargetState] = useState(null);
  const [characterMood, setCharacterMood] = useState('neutral');
  const [isCharacterHovered, setIsCharacterHovered] = useState(false);
  const resetMoodTimerRef = useRef(null);

  const setGazeTarget = useCallback((target) => {
    setGazeTargetState(target);
  }, []);

  const clearGazeTarget = useCallback(() => {
    setGazeTargetState(null);
  }, []);

  const triggerGrin = useCallback((mood = 'grin', duration = 1600) => {
    setCharacterMood(mood);
    if (resetMoodTimerRef.current) clearTimeout(resetMoodTimerRef.current);
    resetMoodTimerRef.current = setTimeout(() => {
      setCharacterMood('neutral');
    }, duration);
  }, []);

  const triggerCelebration = useCallback((originX = 0.5, originY = 0.4) => {
    triggerGrin('grin', 1800);
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { x: originX, y: originY },
        colors: ['#FEE580', '#1842B8', '#171615', '#FFF4BE', '#3B6BF2'],
        disableForReducedMotion: true
      });
    } catch {
      // Confetti fallback
    }
  }, [triggerGrin]);

  return (
    <GazeContext.Provider
      value={{
        gazeTarget,
        setGazeTarget,
        clearGazeTarget,
        characterMood,
        setCharacterMood,
        triggerGrin,
        triggerCelebration,
        isCharacterHovered,
        setIsCharacterHovered
      }}
    >
      {children}
    </GazeContext.Provider>
  );
};
