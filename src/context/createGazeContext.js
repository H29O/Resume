import { createContext } from 'react';

export const GazeContext = createContext({
  gazeTarget: null,
  setGazeTarget: () => {},
  clearGazeTarget: () => {},
  characterMood: 'neutral',
  setCharacterMood: () => {},
  triggerGrin: () => {},
  triggerCelebration: () => {},
  isCharacterHovered: false,
  setIsCharacterHovered: () => {}
});
