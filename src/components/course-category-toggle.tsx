'use client';

import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface CourseCategoryToggleProps {
  value: 'Professional' | 'Kids';
  onChange: (value: 'Professional' | 'Kids') => void;
  className?: string;
}

export function CourseCategoryToggle({ value, onChange, className }: CourseCategoryToggleProps) {
  const isKidsSelected = value === 'Kids';

  return (
    <div className={cn('course-toggle', className)}>
      <div className="course-toggle-bg" style={{ transform: isKidsSelected ? 'translateX(100%)' : 'translateX(0)' }} />
      <button
        onClick={() => onChange('Professional')}
        className={cn('course-toggle-button', { 'active': value === 'Professional' })}
      >
        Professional
      </button>
      <button
        onClick={() => onChange('Kids')}
        className={cn('course-toggle-button', { 'active': value === 'Kids' })}
      >
        Kids
      </button>
    </div>
  );
}
