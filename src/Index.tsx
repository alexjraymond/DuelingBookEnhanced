import React from 'react';
import { createRoot } from 'react-dom/client';
import { Options } from './FullOptions';
import { NewFeatures } from './newFeatures';

const container = document.getElementById('root')
const root = createRoot(container!)

root.render(
  <React.StrictMode>
    <Options />
    <NewFeatures />
  </React.StrictMode>,
);
