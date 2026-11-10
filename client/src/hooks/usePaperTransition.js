import { useState, useCallback } from 'react';

export const usePaperTransition = () => {
  const [transitioning, setTransitioning] = useState(false);

  const startTransition = useCallback(async (action, label = 'Turning Page...', options = {}) => {
    if (window.paperTransitions) {
      setTransitioning(true);
      try {
        await window.paperTransitions.transition(action, label, options);
      } finally {
        setTransitioning(false);
      }
    } else {
      if (typeof action === 'function') await action();
    }
  }, []);

  const transformTheme = useCallback(async (action, fromTheme, toTheme) => {
    if (window.paperTransitions && typeof window.paperTransitions.transformTheme === 'function') {
      setTransitioning(true);
      try {
        await window.paperTransitions.transformTheme(action, fromTheme, toTheme);
      } finally {
        setTransitioning(false);
      }
    } else {
      if (typeof action === 'function') await action();
    }
  }, []);

  return { transitioning, startTransition, transformTheme };
};

export default usePaperTransition;
