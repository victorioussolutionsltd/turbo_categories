import { useEffect, useState } from 'react';
import CustomNodeFlow from './components/CustomNodeFlow';

import { fetchData } from './api/index';

const App = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData('categories').then(setData).catch(console.error);
  }, [fetchData]);

  if (!data.length) {
    return <div>Loading...</div>;
  }

  return <CustomNodeFlow data={data} />;
};

export default App;
