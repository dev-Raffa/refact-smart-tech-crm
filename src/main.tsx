import './index.css';
import App from './app/app';

import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import { bootstrapApp } from './app/bootstrap';

bootstrapApp();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
