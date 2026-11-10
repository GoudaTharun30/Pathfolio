import { useState, useEffect } from 'react';

export const usePaperTheme = () => {
  const [isPaper, setIsPaper] = useState(true);

  useEffect(() => {
    const checkTheme = () => {
      const active = document.body.classList.contains('theme-paper') ||
        document.documentElement.getAttribute('data-theme-style') === 'paper';
      setIsPaper(active);
    };

    checkTheme();
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.body, { attributes: true, attributeFilter: ['class', 'data-theme-style'] });

    return () => observer.disconnect();
  }, []);

  const togglePaper = () => {
    if (window.themeManager) {
      window.themeManager.toggleThemeStyle();
    } else {
      document.body.classList.toggle('theme-paper');
      setIsPaper(prev => !prev);
    }
  };

  const setPaperStyle = (style) => {
    if (window.themeManager && typeof window.themeManager.setThemeStyle === 'function') {
      window.themeManager.setThemeStyle(style);
    } else {
      const isP = style === 'paper';
      document.body.classList.toggle('theme-paper', isP);
      setIsPaper(isP);
    }
  };

  return { isPaper, togglePaper, setPaperStyle };
};

export default usePaperTheme;
