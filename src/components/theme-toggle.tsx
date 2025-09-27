
"use client"

import * as React from "react"
import { useTheme } from "./theme-provider"
import { Button } from "@/components/ui/button"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <Button 
      variant="outline" 
      size="icon" 
      onClick={toggleTheme}
      className="theme-toggle-button relative overflow-hidden"
    >
      <div className="sun-and-cloud absolute transition-transform duration-500 ease-in-out dark:rotate-90 dark:scale-0">
          {/* Sun */}
          <svg viewBox="0 0 24 24" fill="currentColor" className="h-[1.2rem] w-[1.2rem]">
              <circle cx="12" cy="12" r="5"></circle>
              <line x1="12" y1="1" x2="12" y2="3"></line>
              <line x1="12" y1="21" x2="12" y2="23"></line>
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
              <line x1="1" y1="12" x2="3" y2="12"></line>
              <line x1="21" y1="12" x2="23" y2="12"></line>
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
          </svg>
          {/* Cloud */}
          <svg viewBox="0 0 48 28" className="cloud-back absolute -bottom-1 -left-2 w-10 h-8 text-white/70 dark:text-gray-400/50">
            <path d="M41.677,15.643H32.355c-1.129-2.2-2.822-4.041-4.9-5.323c2.9-1.925,4.2-5.323,3.316-8.32C30.089,0.226,28.3,0,26.468,0 c-2.3,0-4.323,0.9-5.742,2.468c-0.371,0.403-0.71,0.839-0.992,1.315C18.4,2.1,16.5,1.2,14.2,1.2c-3.1,0-5.8,1.8-7.1,4.4 c-0.6,1.2-0.6,2.5,0,3.7C3,10,0,13.3,0,17.4c0,4.6,3.6,8.3,8.2,8.3h33.5c3.5,0,6.3-2.8,6.3-6.3S45.177,15.643,41.677,15.643z"></path>
          </svg>
           <svg viewBox="0 0 48 28" className="cloud-front absolute -bottom-2.5 -left-1 w-10 h-8 text-white dark:text-gray-400">
            <path d="M41.677,15.643H32.355c-1.129-2.2-2.822-4.041-4.9-5.323c2.9-1.925,4.2-5.323,3.316-8.32C30.089,0.226,28.3,0,26.468,0 c-2.3,0-4.323,0.9-5.742,2.468c-0.371,0.403-0.71,0.839-0.992,1.315C18.4,2.1,16.5,1.2,14.2,1.2c-3.1,0-5.8,1.8-7.1,4.4 c-0.6,1.2-0.6,2.5,0,3.7C3,10,0,13.3,0,17.4c0,4.6,3.6,8.3,8.2,8.3h33.5c3.5,0,6.3-2.8,6.3-6.3S45.177,15.643,41.677,15.643z"></path>
          </svg>
      </div>

      <div className="moon-and-stars absolute transition-transform duration-500 ease-in-out rotate-90 scale-0 dark:rotate-0 dark:scale-100">
          {/* Stars */}
          <svg viewBox="0 0 24 24" fill="currentColor" className="h-[1.2rem] w-[1.2rem]">
              <path d="M21.64,13.14l-2-3.46a1,1,0,0,0-1.37-.36L15.5,11.46l-2-3.46a1,1,0,0,0-1.37-.36L9.36,9.8,7.36,6.34a1,1,0,0,0-1.37-.36l-2,3.46a1,1,0,0,0,.36,1.37l2,1.15-2,1.15a1,1,0,0,0-.36,1.37l2,3.46a1,1,0,0,0,1.37.36l2.77-2.14,2,3.46a1,1,0,0,0,1.37.36l2.77-2.14,2-3.46a1,1,0,0,0-.36-1.37Z" transform="translate(-1.05 -1.13)"></path>
          </svg>
          <div className="absolute top-0 right-0 w-1 h-1 bg-white rounded-full star" style={{ top: '10%', right: '20%' }}></div>
          <div className="absolute top-0 right-0 w-1.5 h-1.5 bg-white rounded-full star" style={{ top: '40%', right: '10%' }}></div>
          <div className="absolute top-0 right-0 w-1 h-1 bg-white rounded-full star" style={{ top: '70%', right: '30%' }}></div>
      </div>
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
