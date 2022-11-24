import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { RecoilRoot } from 'recoil';
import { QueryClient, QueryClientProvider } from 'react-query';
// page
import LoginPage from './pages/LoginPage/LoginPage';
import HomePage from './pages/HomePage/HomePage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import LoadingPage from './pages/LoadingPage/LoadingPage';
import CommentPage from './pages/CommentPage/CommentPage';
import NewPostPage from './pages/NewPostPage/NewPostPage';

const queryClient = new QueryClient();

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
        <QueryClientProvider client={queryClient}>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/oauth/naverCallback" element={<LoadingPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/comment/:boardId" element={<CommentPage />} />
            <Route path="/new-post" element={<NewPostPage />} />
          </Routes>
        </QueryClientProvider>
      </RecoilRoot>
    </ThemeProvider>
  );
};

export default App;
