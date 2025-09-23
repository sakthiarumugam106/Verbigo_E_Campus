
'use client';

import * as React from 'react';

interface CourseCategoryToggleProps {
  value: 'Professional' | 'Kids';
  onChange: (value: 'Professional' | 'Kids') => void;
}

export function CourseCategoryToggle({ value, onChange }: CourseCategoryToggleProps) {
  const isKidsSelected = value === 'Kids';

  const handleChange = () => {
    onChange(isKidsSelected ? 'Professional' : 'Kids');
  };

  return (
    <label className="course-toggle-label">
      <input
        type="checkbox"
        className="course-toggle-state"
        checked={isKidsSelected}
        onChange={handleChange}
      />
      <div className="course-toggle">
        <span className="course-toggle-option professional">Professional</span>
        <span className="course-toggle-option kids">Kids</span>
        <div className="course-toggle-indicator" />
      </div>
    </label>
  );
}
