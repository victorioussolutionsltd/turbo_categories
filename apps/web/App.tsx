import { useEffect, useState } from 'react';
import CustomNodeFlow from './components/CustomNodeFlow';

import { fetchData } from './api/index';
import { dataToNodes } from './utils/dataToNodes';

const App = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData('categories').then(setData).catch(console.error);
  }, []);

  if (!data.length) {
    return <div>Loading...</div>;
  }

  return <CustomNodeFlow nodes={dataToNodes(data)} />;
};

export default App;
