
'use client';

import { cn } from '@/lib/utils';

interface CourseCategoryToggleProps {
  value: 'Professional' | 'Kids';
  onChange: (value: 'Professional' | 'Kids') => void;
  className?: string;
}

export function CourseCategoryToggle({ value, onChange, className }: CourseCategoryToggleProps) {
  return (
    <div className={cn('flex items-center justify-center gap-4', className)}>
      <button
        onClick={() => onChange('Professional')}
        className={cn(
          'px-6 py-2 rounded-lg transition-all duration-300',
          'font-semibold min-w-[140px]',
          value === 'Professional'
            ? 'neumorphic-pressed text-primary dark:text-primary-foreground'
            : 'neumorphic-outer text-muted-foreground hover:text-primary'
        )}
      >
        Professional
      </button>
      <button
        onClick={() => onChange('Kids')}
        className={cn(
          'px-6 py-2 rounded-lg transition-all duration-300',
          'font-semibold min-w-[140px]',
          value === 'Kids'
            ? 'neumorphic-pressed text-primary dark:text-primary-foreground'
            : 'neumorphic-outer text-muted-foreground hover:text-primary'
        )}
      >
        Kids
      </button>
    </div>
  );
}
