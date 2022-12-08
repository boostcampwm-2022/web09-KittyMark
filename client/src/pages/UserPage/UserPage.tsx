import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
// recoil
import user from '../../store/userAtom';
// style
import S from './UserPageStyles';
// component
import TopBar from '../../components/TopBar/TopBar';
import NavBar from '../../components/NavBar/NavBar';
import UserInfoContainer from '../../components/UserInfoContainer/UserInfoContainer';
import UserPostContainer from '../../components/UserPostContainer/UserPostContainer';

const UserPage = () => {
  const navigation = useNavigate();
  const { userName, targetId } = useParams<{
    userName: string;
    targetId: string;
  }>();
  const { userId } = useRecoilValue(user);

  return (
    <>
      <TopBar
        isBack={userId !== Number(targetId)}
        title={userName || 'error'}
        isCheck={false}
        backFunc={() => navigation(-1)}
      />
      <S.Body>
        <UserInfoContainer targetId={Number(targetId)} />
        <UserPostContainer targetId={Number(targetId)} />
      </S.Body>
      <NavBar />
    </>
  );
};

export default UserPage;
