import React from 'react';
import CustomNodeFlow from './components/CustomNodeFlow';

import { fetchData } from './api';

const App = () => {
  const [data, setData] = React.useState(null);
  React.useEffect(() => {
    fetchData('https://jsonplaceholder.typicode.com/todos/1')
      .then(setData)
      .catch(console.error);
  }, []);

  return (
    <div>
      <CustomNodeFlow />
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default App;
