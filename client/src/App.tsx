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
import ModifyPage from './pages/ModifyPage/ModifyPage';

const queryClient = new QueryClient();

const App = () => {
  return (
    <ThemeProvider
      theme={{
        palette: {
          main: '#1F2E66',
          back: `#FFFFFF`,
          border: '#DCDCDC',
          inner: `#FAFAFA`,
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
            <Route path="/modify" element={<ModifyPage />} />
          </Routes>
        </QueryClientProvider>
      </RecoilRoot>
    </ThemeProvider>
  );
};

export default App;
