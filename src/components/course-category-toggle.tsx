'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

interface CourseCategoryToggleProps {
  value: 'Professional' | 'Kids';
  onChange: (value: 'Professional' | 'Kids') => void;
  className?: string;
}

export function CourseCategoryToggle({ value, onChange, className }: CourseCategoryToggleProps) {
  const isKidsSelected = value === 'Kids';

  const handleToggle = () => {
    onChange(isKidsSelected ? 'Professional' : 'Kids');
  };

  return (
    <label htmlFor="course-filter" className={cn('switch', className)} aria-label="Toggle course category">
      <input 
        type="checkbox" 
        id="course-filter" 
        checked={isKidsSelected} 
        onChange={handleToggle}
      />
      <span className={cn({ 'active': !isKidsSelected })}>Professional</span>
      <span className={cn({ 'active': isKidsSelected })}>Kids</span>
    </label>
  );
}
