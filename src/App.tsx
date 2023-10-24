import React from 'react';
import './App.css';
import AppRoutes from './components/Routes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <AppRoutes />
      <ToastContainer />
    </>

  );
}

export default App;
