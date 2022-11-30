import React from 'react';
import { useParams, useLocation } from 'react-router-dom';
// style
import S from './UserPageStyles';
// component
import TopBar from '../../components/TopBar/TopBar';
import NavBar from '../../components/NavBar/NavBar';
import UserInfoContainer from '../../components/UserInfoContainer/UserInfoContainer';
import UserPostContainer from '../../components/UserPostContainer/UserPostContainer';

// TODO 리엑트 쿼리로 받아온 것에 대해서 계속 undefind 를 고려해야 한다.
const UserPage = () => {
  const location = useLocation();
  const { targetId } = location.state;
  const { userName } = useParams<{ userName: string }>();

  return (
    <>
      <TopBar isBack={false} title={userName || 'error'} isCheck={false} />
      <S.Body>
        <UserInfoContainer targetId={targetId} />
        <S.ButtonContainer>
          <S.FollowButton type="button" isFollow={false}>
            팔로우
          </S.FollowButton>
          <S.DMButton type="button">메시지</S.DMButton>
        </S.ButtonContainer>
        <UserPostContainer targetId={targetId} />
      </S.Body>
      <NavBar />
    </>
  );
};

export default UserPage;
