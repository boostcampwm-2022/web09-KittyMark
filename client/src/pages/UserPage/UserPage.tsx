import React from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
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

// TODO 리엑트 쿼리로 받아온 것에 대해서 계속 undefind 를 고려해야 한다.
const UserPage = () => {
  const location = useLocation();
  const navigation = useNavigate();
  const { targetId } = location.state;
  const { userName } = useParams<{ userName: string }>();
  const { userId } = useRecoilValue(user);

  return (
    <>
      <TopBar
        isBack={userId !== targetId}
        title={userName || 'error'}
        isCheck={false}
        backFunc={() => navigation(-1)}
      />
      <S.Body>
        <UserInfoContainer targetId={targetId} />
        <UserPostContainer targetId={targetId} />
      </S.Body>
      <NavBar />
    </>
  );
};

export default UserPage;
