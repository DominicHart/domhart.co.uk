import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Router from './Router';
import '../css/app.css'; // Ensure this path is correct

const root = createRoot(document.getElementById('app'));

root.render(
    <StrictMode>
        <Router />
    </StrictMode>
);