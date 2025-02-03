import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import App from './App.jsx';
import './index.css';
import './assets/fonts/WorkSans/WorkSans-Regular.ttf';
import './assets/fonts/WorkSans/WorkSans-ExtraBold.ttf';
import './assets/fonts/WorkSans/WorkSans-Light.ttf';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
