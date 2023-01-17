import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
// recoil
import user from '../../store/userAtom';
// style
import S from './NavBarStyles';
// img
import homeIcon from '../../static/homeIcon.svg';
import mapIcon from '../../static/mapIcon.svg';
import messageIcon from '../../static/messageIcon.svg';
import userIcon from '../../static/userIcon.svg';
// preload
import { UserPage, MapPage, DmListPage } from '../../pages';

const NavBar = () => {
  const navigate = useNavigate();
  const userData = useRecoilValue(user);

  return (
    <S.Container>
      <S.Icon type="button" onClick={() => navigate('/home')}>
        <img src={homeIcon} alt="Home" />
      </S.Icon>
      <S.Icon
        type="button"
        onClick={() => navigate('/map')}
        onMouseOver={() => MapPage.preload()}
      >
        <img src={mapIcon} alt="Map" />
      </S.Icon>
      <S.Icon
        type="button"
        onClick={() => navigate('/dm')}
        onMouseOver={() => DmListPage.preload()}
      >
        <img src={messageIcon} alt="Message" />
      </S.Icon>
      <S.Icon
        type="button"
        onClick={() =>
          navigate(`/user/${userData.userName}/${userData.userId}`)
        }
        onMouseOver={() => UserPage.preload()}
      >
        <img src={userIcon} alt="User" />
      </S.Icon>
    </S.Container>
  );
};

export default NavBar;
