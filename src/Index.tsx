import React from 'react';
import { createRoot } from 'react-dom/client';
import { Options } from './FullOptions';

const container = document.getElementById('root')
const root = createRoot(container!)

root.render(
  <React.StrictMode>
    <Options />
  </React.StrictMode>,
);
