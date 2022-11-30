import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
// style
import S from './FollowPageStyles';
// component
import NavBar from '../../components/NavBar/NavBar';
import TopBar from '../../components/TopBar/TopBar';
import FollowUnit from '../../components/FollowUnit/FollowUnit';

interface FollowPageState {
  userName: string;
  userId: number;
}

const FollowPage = () => {
  const navigation = useNavigate();
  const location = useLocation();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { userName, userId }: FollowPageState = location.state
    ? (location.state as FollowPageState)
    : { userId: -1, userName: 'error' };

  return (
    <>
      <TopBar
        isBack
        title={userName}
        isCheck={false}
        backFunc={() => navigation(-1)}
      />
      <S.Body>
        <S.ButtonContainer>
          <S.Button type="button" isOn>
            팔로워
          </S.Button>
          <S.Button type="button" isOn={false}>
            팔로잉
          </S.Button>
        </S.ButtonContainer>
        <S.UnitContainer>
          <FollowUnit targetId={1} userName="Other User 1" isFollow />
          <FollowUnit targetId={2} userName="Other User 2" isFollow={false} />
        </S.UnitContainer>
      </S.Body>
      <NavBar />
    </>
  );
};

export default FollowPage;
