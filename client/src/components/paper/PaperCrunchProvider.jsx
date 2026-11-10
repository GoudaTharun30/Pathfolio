import React, { createContext, useContext, useState, useCallback } from 'react';
import PaperCrunchTransition from './PaperCrunchTransition';

const PaperCrunchContext = createContext({
  isTransitioning: false,
  startTransition: async () => {},
  transformTheme: async () => {}
});

export const PaperCrunchProvider = ({ children }) => {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionLabel, setTransitionLabel] = useState('Turning Page...');

  const startTransition = useCallback(async (action, label = 'Turning Page...', options = {}) => {
    if (window.paperTransitions) {
      setIsTransitioning(true);
      setTransitionLabel(label);
      try {
        await window.paperTransitions.transition(action, label, options);
      } finally {
        setIsTransitioning(false);
      }
    } else {
      if (typeof action === 'function') await action();
    }
  }, []);

  const transformTheme = useCallback(async (action, fromTheme, toTheme) => {
    if (window.paperTransitions && typeof window.paperTransitions.transformTheme === 'function') {
      setIsTransitioning(true);
      try {
        await window.paperTransitions.transformTheme(action, fromTheme, toTheme);
      } finally {
        setIsTransitioning(false);
      }
    } else {
      if (typeof action === 'function') await action();
    }
  }, []);

  return (
    <PaperCrunchContext.Provider value={{ isTransitioning, startTransition, transformTheme }}>
      {children}
      <PaperCrunchTransition active={isTransitioning} label={transitionLabel} />
    </PaperCrunchContext.Provider>
  );
};

export const usePaperCrunch = () => useContext(PaperCrunchContext);
export default PaperCrunchProvider;

