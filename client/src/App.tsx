import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
// page
import LoginPage from './pages/LoginPage/LoginPage';
import HomePage from './pages/HomePage/HomePage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import LoadingPage from './pages/LoadingPage/LoadingPage';

const App = () => {
  return (
    <ThemeProvider
      theme={{
        palette: {
          main: '#ffe99c',
          back: `#ffffff`,
          border: '#ffc700',
          inner: `#fffbed`,
        },
      }}
    >
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/oauth/naverCallback" element={<LoadingPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </ThemeProvider>
  );
};

export default App;
