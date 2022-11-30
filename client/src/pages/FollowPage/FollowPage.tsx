import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
// component
import NavBar from '../../components/NavBar/NavBar';
import TopBar from '../../components/TopBar/TopBar';
import FollowerContainer from '../../components/FollowerContainer/FollowerContainerPage';
import FollowingContainer from '../../components/FollowingContainer/FollowingContainer';

const FollowPage = () => {
  const navigation = useNavigate();
  // const queryClient = useQueryClient();
  const { userName, userId } = useParams<{
    userName: string;
    userId: string;
  }>();

  const [onStatus, setOnStatus] = useState<boolean>(true);

  return (
    <>
      <TopBar
        isBack
        title={userName || 'error'}
        isCheck={false}
        backFunc={() => navigation(-1)}
      />
      {onStatus ? (
        <FollowerContainer
          userId={Number(userId)}
          userName={userName || 'error'}
          setOn={setOnStatus}
        />
      ) : (
        <FollowingContainer
          userId={Number(userId)}
          userName={userName || 'error'}
          setOn={setOnStatus}
        />
      )}
      <NavBar />
    </>
  );
};

export default FollowPage;
