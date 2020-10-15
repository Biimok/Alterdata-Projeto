import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import './services/firebase';

import Routes from './routes';
import AppProvider from './hook/index';

function App() {
  return (
    <>
    <BrowserRouter>
      <AppProvider>
        <Routes />
      </AppProvider>
    </BrowserRouter>
    </>
    
  );
}

export default App;
