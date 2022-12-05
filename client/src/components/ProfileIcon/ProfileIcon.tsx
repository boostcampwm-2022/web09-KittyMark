/* eslint-disable react/require-default-props */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

// TODO userName 대신에 userId 를 사용해야 할 것으로 보인다.
interface ProfileIconProps {
  targetId: number;
  userName: string;
  userProfile: string;
  customLength?: number;
}

const ProfileIconContainer = styled.button<{ customLength: number }>`
  width: ${(props) => `${props.customLength}rem`};
  height: ${(props) => `${props.customLength}rem`};
  border: 1px solid ${(props) => props.theme.palette.border};
  background-color: #ffffff;
  border-radius: ${(props) => `${props.customLength / 2}rem`};
  padding: 0px;
  cursor: pointer;

  img {
    width: 100%;
    height: 100%;
    border-radius: ${(props) => `${props.customLength / 2}rem`};
  }
`;

const ProfileIcon = ({
  targetId,
  userName,
  userProfile,
  customLength,
}: ProfileIconProps) => {
  const navigation = useNavigate();
  return (
    <ProfileIconContainer
      type="button"
      onClick={() => navigation(`/user/${userName}/${targetId}`)}
      customLength={customLength || 2.5}
    >
      <img src={userProfile} alt="Profile" />
    </ProfileIconContainer>
  );
};

export default ProfileIcon;
