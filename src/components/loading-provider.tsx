
'use client';

import { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { VerbigoLogo } from './verbigo-logo';

interface LoadingContextType {
  isLoading: boolean;
  showLoader: () => void;
  hideLoader: () => void;
  withLoader: <T>(promise: Promise<T>) => Promise<T>;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export function LoadingProvider({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(false);

  const showLoader = useCallback(() => setIsLoading(true), []);
  const hideLoader = useCallback(() => setIsLoading(false), []);

  const withLoader = useCallback(async <T,>(promise: Promise<T>): Promise<T> => {
    showLoader();
    try {
      return await promise;
    } finally {
      hideLoader();
    }
  }, [showLoader, hideLoader]);

  return (
    <LoadingContext.Provider value={{ isLoading, showLoader, hideLoader, withLoader }}>
      {children}
    </LoadingContext.Provider>
  );
}

export function useLoading() {
  const context = useContext(LoadingContext);
  if (context === undefined) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return context;
}

export function GlobalLoader() {
    const { isLoading } = useLoading();

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="fixed inset-0 z-[200] flex items-center justify-center bg-background/80 backdrop-blur-sm"
                >
                    <motion.div
                         animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.7, 1, 0.7],
                        }}
                        transition={{
                            duration: 1.5,
                            ease: "easeInOut",
                            repeat: Infinity,
                        }}
                    >
                       <VerbigoLogo />
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
