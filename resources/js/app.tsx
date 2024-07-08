import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Router from './Router';
import '../css/app.css';
import { Container } from 'react-dom';

const root = createRoot(document.getElementById('app') as Container);

root.render(
    <StrictMode>
        <Router />
    </StrictMode>
);