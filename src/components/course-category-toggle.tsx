
'use client';

import * as React from 'react';

interface CourseCategoryToggleProps {
  value: 'Professional' | 'Kids';
  onChange: (value: 'Professional' | 'Kids') => void;
}

export function CourseCategoryToggle({ value, onChange }: CourseCategoryToggleProps) {
  const isProfessional = value === 'Professional';

  const handleChange = () => {
    onChange(isProfessional ? 'Kids' : 'Professional');
  };

  return (
    <label className="course-toggle-label">
      <input
        type="checkbox"
        className="course-toggle-state"
        checked={!isProfessional}
        onChange={handleChange}
      />
      <div className="course-toggle">
        <div className="course-toggle-indicator" />
        <div className="course-toggle-text">
          {value}
        </div>
      </div>
    </label>
  );
}
