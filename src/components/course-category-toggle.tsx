
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.checked ? 'Kids' : 'Professional');
  };

  return (
    <div className={cn("flex items-center gap-4", className)}>
        <span className={cn("font-medium", isKidsSelected ? 'text-muted-foreground' : 'text-primary dark:text-primary-foreground')}>
            Professional
        </span>
        <label className="course-toggle-label">
            <input
                type="checkbox"
                className="course-toggle-state"
                checked={isKidsSelected}
                onChange={handleChange}
            />
            <div className="course-toggle">
                <div className="indicator"></div>
            </div>
        </label>
        <span className={cn("font-medium", isKidsSelected ? 'text-primary dark:text-primary-foreground' : 'text-muted-foreground')}>
            Kids
        </span>
    </div>
  );
}
