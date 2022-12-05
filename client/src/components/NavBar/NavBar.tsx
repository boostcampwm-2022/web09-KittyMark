import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
// recoil
import user from '../../store/userAtom';
// img
import homeIcon from '../../static/homeIcon.svg';
import mapIcon from '../../static/mapIcon.svg';
import messageIcon from '../../static/messageIcon.svg';
import userIcon from '../../static/userIcon.svg';
// style
import S from './NavBarStyles';

const NavBar = () => {
  const navigation = useNavigate();
  const userData = useRecoilValue(user);

  return (
    <S.Container>
      <S.Icon type="button" onClick={() => navigation('/home')}>
        <img src={homeIcon} alt="Home" />
      </S.Icon>
      <S.Icon type="button" onClick={() => navigation('/map')}>
        <img src={mapIcon} alt="Map" />
      </S.Icon>
      <S.Icon type="button">
        <img src={messageIcon} alt="Message" />
      </S.Icon>
      <S.Icon
        type="button"
        onClick={() =>
          navigation(`/user/${userData.userName}/${userData.userId}`)
        }
      >
        <img src={userIcon} alt="User" />
      </S.Icon>
    </S.Container>
  );
};

export default NavBar;
