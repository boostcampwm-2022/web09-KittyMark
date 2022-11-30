import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

// TODO userName 대신에 userId 를 사용해야 할 것으로 보인다.
interface ProfileIconProps {
  userName: string;
  userProfile: string;
}

const ProfileIconContainer = styled.button`
  width: 2.5rem;
  height: 2.5rem;
  border: 1px solid ${(props) => props.theme.palette.border};
  background-color: #ffffff;
  border-radius: 1.25rem;
  padding: 0px;
  cursor: pointer;

  img {
    width: 100%;
    height: 100%;
    border-radius: 1.25rem;
  }
`;

const ProfileIcon = ({ userName, userProfile }: ProfileIconProps) => {
  const navigation = useNavigate();
  return (
    <ProfileIconContainer type="button" onClick={() => navigation(userName)}>
      <img src={userProfile} alt="Profile" />
    </ProfileIconContainer>
  );
};

export default ProfileIcon;
