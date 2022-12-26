import React from 'react';
import Loadable from 'react-loadable';
import LoadingContainer from '../components/LoadingContainer/LoadingContainer';

const Loading = () => {
  return <LoadingContainer />;
};

export const LoadingPage = Loadable({
  loader: () => import('./LoadingPage/LoadingPage'),
  loading: Loading,
});

export const MapPage = Loadable({
  loader: () => import('./MapPage/MapPage'),
  loading: Loading,
});

export const HomePage = Loadable({
  loader: () => import('./HomePage/HomePage'),
  loading: Loading,
});

export const RegisterPage = Loadable({
  loader: () => import('./RegisterPage/RegisterPage'),
  loading: Loading,
});

export const CommentPage = Loadable({
  loader: () => import('./CommentPage/CommentPage'),
  loading: Loading,
});

export const NewPostPage = Loadable({
  loader: () => import('./NewPostPage/NewPostPage'),
  loading: Loading,
});

export const ModifyPage = Loadable({
  loader: () => import('./ModifyPage/ModifyPage'),
  loading: Loading,
});

export const UserPage = Loadable({
  loader: () => import('./UserPage/UserPage'),
  loading: Loading,
});

export const FollowPage = Loadable({
  loader: () => import('./FollowPage/FollowPage'),
  loading: Loading,
});

export const ModifyUserPage = Loadable({
  loader: () => import('./ModifyUserPage/ModifyUserPage'),
  loading: Loading,
});

export const BoardDetailPage = Loadable({
  loader: () => import('./BoardDetailPage/BoardDetailPage'),
  loading: Loading,
});

export const DmListPage = Loadable({
  loader: () => import('./DmListPage/DmListPage'),
  loading: Loading,
});
