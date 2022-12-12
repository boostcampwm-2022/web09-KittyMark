import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { RecoilRoot } from 'recoil';
import { QueryClient, QueryClientProvider } from 'react-query';
// page
import LoginPage from './pages/LoginPage/LoginPage';
import {
  BoardDetailPage,
  CommentPage,
  FollowPage,
  HomePage,
  LoadingPage,
  MapPage,
  ModifyPage,
  ModifyUserPage,
  NewPostPage,
  RegisterPage,
  UserPage,
} from './pages/index';

const queryClient = new QueryClient();

const App = () => {
  const setScreenSize = () => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  };

  useEffect(() => {
    setScreenSize();
  });

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
            <Route path="/user/:userName/:targetId" element={<UserPage />} />
            <Route path="/modify-user" element={<ModifyUserPage />} />
            <Route path="/follow/:userName/:userId" element={<FollowPage />} />
            <Route path="/map" element={<MapPage />} />
            <Route path="/detail" element={<BoardDetailPage />} />
          </Routes>
        </QueryClientProvider>
      </RecoilRoot>
    </ThemeProvider>
  );
};

export default App;
