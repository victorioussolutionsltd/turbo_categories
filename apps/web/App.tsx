import { useEffect } from 'react';
import { fetchData } from './api/index';
import CustomNodeFlow from './components/CustomNodeFlow';
import { useCategories } from './context/CategoriesContext';

const App = () => {
  const { categories, setCategories } = useCategories();

  useEffect(() => {
    fetchData('categories').then(setCategories).catch(console.error);
  }, []);

  if (!categories.length) {
    return <div>Loading...</div>;
  }

  return <CustomNodeFlow data={categories} />;
};

export default App;
