
'use client';

import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface CourseCategoryToggleProps {
  value: 'Professional' | 'Kids';
  onChange: (value: 'Professional' | 'Kids') => void;
  className?: string;
}

export function CourseCategoryToggle({ value, onChange, className }: CourseCategoryToggleProps) {
  const options = ['Professional', 'Kids'];
  
  return (
    <div
      className={cn(
        'relative flex w-[280px] cursor-pointer items-center rounded-lg p-1 neumorphic-inner',
        className
      )}
    >
      <motion.div
        className="absolute h-[calc(100%-0.5rem)] w-[130px] rounded-md bg-primary"
        animate={{ x: value === 'Professional' ? '2px' : '142px' }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      />
      {options.map((option) => (
        <div
          key={option}
          onClick={() => onChange(option as 'Professional' | 'Kids')}
          className={cn(
            'relative z-10 flex-1 py-2 text-center font-semibold transition-colors duration-300',
            value === option
              ? 'text-primary-foreground'
              : 'text-muted-foreground'
          )}
        >
          {option}
        </div>
      ))}
    </div>
  );
}
