
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

  return (
    <div
      className={cn("course-toggle neumorphic-inner", className)}
      data-selected={isKidsSelected ? 'kids' : 'professional'}
    >
      <div className="course-toggle-indicator" />
      <div
        className={cn(
          'course-toggle-option',
          !isKidsSelected ? 'text-primary dark:text-primary-foreground' : 'text-muted-foreground'
        )}
        onClick={() => onChange('Professional')}
      >
        Professional
      </div>
      <div
        className={cn(
          'course-toggle-option',
          isKidsSelected ? 'text-primary dark:text-primary-foreground' : 'text-muted-foreground'
        )}
        onClick={() => onChange('Kids')}
      >
        Kids
      </div>
    </div>
  );
}
