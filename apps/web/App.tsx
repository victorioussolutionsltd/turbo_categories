import { useEffect } from 'react';
import { fetchData, patchData } from './api/index';
import { CATEGORIES } from './api/urls';
import CustomNodeFlow from './components/CustomNodeFlow';
import { useCategories } from './context/CategoriesContext';
import { difference } from './utils/collections';
import { dataToConnectionsMap, edgesToConnectionMap } from './utils/mapping';

const App = () => {
  const { categories, setCategories } = useCategories();

  useEffect(() => {
    fetchData(CATEGORIES).then(setCategories).catch(console.error);
  }, []);

  const save = (edges) => {
    const dbConnections = dataToConnectionsMap(categories);
    const connections = edgesToConnectionMap(edges);

    const newConnections = difference(dbConnections, connections);

    if (!Object.keys(newConnections).length) {
      return;
    }

    patchData(CATEGORIES, newConnections);
  };

  if (!categories.length) {
    return <div>Loading...</div>;
  }

  return <CustomNodeFlow data={categories} onSave={save} />;
};

export default App;
