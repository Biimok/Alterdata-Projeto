import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import GlobalStyles from './styles/global';


import './services/firebase';

import Routes from './routes';
import AppProvider from './hooks';

function App() {
  return (
    <>
    <BrowserRouter>
      <AppProvider>
        <Routes />
      </AppProvider>
    </BrowserRouter>
    <GlobalStyles />
    </>
    
  );
}

export default App;
