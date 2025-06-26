import "@fontsource/poppins"; // peso padrão 400
import "@fontsource/poppins/100.css"; // peso 600
import "@fontsource/poppins/200.css"; // peso 600
import "@fontsource/poppins/300.css"; // peso 600
import "@fontsource/poppins/400.css"; // peso 600
import "@fontsource/poppins/500.css"; // peso 600
import "@fontsource/poppins/600.css"; // peso 600
import "@fontsource/poppins/700.css"; // peso 700
import "@fontsource/poppins/800.css"; // peso 700
import "@fontsource/poppins/900.css"; // peso 700

import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { AuthProvider } from './contexts/AuthContext.tsx';
import './index.css';

const root = document.getElementById("root");
if (!root) throw new Error("Root element not found");

createRoot(root).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);
