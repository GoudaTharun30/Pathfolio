import React from 'react';

export const PaperButton = ({
  children,
  variant = 'secondary', // 'primary' | 'secondary' | 'marker-blue' | 'hatched'
  size = 'md', // 'sm' | 'md' | 'lg'
  className = '',
  style = {},
  ...props
}) => {
  const variantClass = variant === 'marker-blue' ? 'btn-marker-blue' : (variant === 'hatched' ? 'btn-hatched' : `btn-${variant}`);
  const sizeClass = size === 'sm' ? 'btn-sm' : (size === 'lg' ? 'btn-lg' : '');

  return (
    <button
      className={`btn ${variantClass} ${sizeClass} ${className}`}
      style={{
        fontFamily: 'var(--paper-font-sketch, "Patrick Hand", cursive)',
        ...style
      }}
      {...props}
    >
      {children}
    </button>
  );
};

export default PaperButton;

