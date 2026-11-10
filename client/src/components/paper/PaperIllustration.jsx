import React, { useEffect, useRef } from 'react';

export const PaperIllustration = ({ type = '3d-hero', fallback = '📓✏️🎓' }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (type === '3d-hero' && window.paper3D && containerRef.current) {
      containerRef.current.id = 'landing-3d-canvas';
      window.paper3D.initHeroCanvas('landing-3d-canvas');
    }
  }, [type]);

  return (
    <div 
      ref={containerRef}
      style={{
        width: '100%',
        height: '340px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <div style={{ fontSize: '4rem' }}>{fallback}</div>
    </div>
  );
};

export default PaperIllustration;

