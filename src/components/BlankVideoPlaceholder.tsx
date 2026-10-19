import React from 'react';

interface BlankVideoPlaceholderProps {
  className?: string;
  label?: string;
}

/**
 * Compliance with requirement:
 * "If there is an area for a YouTube video link or thumbnail that takes you to YouTube,
 * just put a blank square space there."
 */
export const BlankVideoPlaceholder: React.FC<BlankVideoPlaceholderProps> = ({ 
  className = '',
  label 
}) => {
  return (
    <div 
      className={`aspect-square w-full max-w-sm mx-auto bg-slate-100 border border-slate-200/80 rounded-xl overflow-hidden flex items-center justify-center ${className}`}
      data-testid="blank-square-space"
      aria-label="Blank square space reserved for video placeholder"
    >
      {/* Intentionally completely blank square space as instructed */}
      {label && <span className="sr-only">{label}</span>}
    </div>
  );
};
