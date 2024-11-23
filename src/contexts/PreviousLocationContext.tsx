import React, { createContext, useContext, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

interface PreviousLocationContextType {
  previousLocation: Location | null;
}

const PreviousLocationContext = createContext<PreviousLocationContextType>({
  previousLocation: null,
});

export const PreviousLocationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const previousLocationRef = useRef<Location | null>(null);

  useEffect(() => {
    previousLocationRef.current = location;
  }, [location]);

  return (
    <PreviousLocationContext.Provider value={{ previousLocation: previousLocationRef.current }}>
      {children}
    </PreviousLocationContext.Provider>
  );
};

export const usePreviousLocation = () => {
  const context = useContext(PreviousLocationContext);
  if (!context) {
    throw new Error('usePreviousLocation must be used within a PreviousLocationProvider');
  }
  return context.previousLocation;
};