import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { RecoilRoot } from 'recoil';
// page
import LoginPage from './pages/LoginPage/LoginPage';
import HomePage from './pages/HomePage/HomePage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import LoadingPage from './pages/LoadingPage/LoadingPage';
import CommentPage from './pages/CommentPage/CommentPage';

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
      <RecoilRoot>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/oauth/naverCallback" element={<LoadingPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/comment/:boardId" element={<CommentPage />} />
        </Routes>
      </RecoilRoot>
    </ThemeProvider>
  );
};

export default App;
