import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import FollowContainer from '../../components/FollowContainer/FollowContainer';
// component
import NavBar from '../../components/NavBar/NavBar';
import TopBar from '../../components/TopBar/TopBar';

const FollowPage = () => {
  const navigation = useNavigate();

  const { userName, userId } = useParams<{
    userName: string;
    userId: string;
  }>();

  useEffect(() => {
    if (!userName || !userId) navigation('/home');
  }, []);

  return (
    <>
      <TopBar
        isBack
        title={userName || 'error'}
        isCheck={false}
        backFunc={() => navigation(-1)}
      />
      <FollowContainer userId={Number(userId)} />
      <NavBar />
    </>
  );
};

export default FollowPage;
