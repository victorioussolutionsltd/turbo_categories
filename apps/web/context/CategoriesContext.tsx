import React, { createContext, ReactNode, useContext, useState } from 'react';

// Define the shape of your context data
interface CategoriesContextType {
  categories: any[];
  setCategories: React.Dispatch<React.SetStateAction<any[]>>;
}

const CategoriesContext = createContext<CategoriesContextType | undefined>(
  undefined,
);

export const CategoriesProvider = ({ children }: { children: ReactNode }) => {
  const [categories, setCategories] = useState<any[]>([]);
  const value = React.useMemo(
    () => ({ categories, setCategories }),
    [categories],
  );
  return (
    <CategoriesContext.Provider value={value}>
      {children}
    </CategoriesContext.Provider>
  );
};

export const useCategories = () => {
  const context = useContext(CategoriesContext);
  if (!context) {
    throw new Error('useCategories must be used within a CategoriesProvider');
  }
  return context;
};
