import { createRoot } from 'react-dom/client';
import App from './components/CustomNodeFlow';

import './index.css';

const container = document.querySelector('#app');
const root = createRoot(container);

root.render(<App />);
