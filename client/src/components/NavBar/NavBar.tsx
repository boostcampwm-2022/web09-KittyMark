import React from 'react';
// img
import homeIcon from '../../static/homeIcon.svg';
import mapIcon from '../../static/mapIcon.svg';
import messageIcon from '../../static/messageIcon.svg';
import userIcon from '../../static/userIcon.svg';
// style
import { NavBarContainer, NavBarIcon } from './NavBarStyles';

const NavBar = () => {
  return (
    <NavBarContainer>
      <NavBarIcon type="button">
        <img src={homeIcon} alt="Home" />
      </NavBarIcon>
      <NavBarIcon type="button">
        <img src={mapIcon} alt="Home" />
      </NavBarIcon>
      <NavBarIcon type="button">
        <img src={messageIcon} alt="Home" />
      </NavBarIcon>
      <NavBarIcon type="button">
        <img src={userIcon} alt="Home" />
      </NavBarIcon>
    </NavBarContainer>
  );
};

export default NavBar;
