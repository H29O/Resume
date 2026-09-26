import { useContext } from 'react';
import { GazeContext } from '../context/createGazeContext';

export const useGaze = () => useContext(GazeContext);
