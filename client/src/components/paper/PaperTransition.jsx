import React from 'react';
import PaperCrunchTransition from './PaperCrunchTransition';

export const PaperTransition = ({ active = false, title = 'Turning Page...' }) => {
  return <PaperCrunchTransition active={active} label={title} />;
};

export default PaperTransition;
