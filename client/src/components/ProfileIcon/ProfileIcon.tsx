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

const Button = styled.button<{ customLength: number }>`
  width: ${(props) => `${props.customLength}rem`};
  height: ${(props) => `${props.customLength}rem`};
  background-color: transparent;
  border: 0px;
  padding: 0px;
  cursor: pointer;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border: 1px solid ${(props) => props.theme.palette.border};
    border-radius: ${(props) => `${props.customLength / 2}rem`};
  }
`;

const ProfileIcon = ({
  targetId,
  userName,
  userProfile,
  customLength,
}: ProfileIconProps) => {
  const navigate = useNavigate();
  return (
    <Button
      type="button"
      onClick={() => navigate(`/user/${userName}/${targetId}`)}
      customLength={customLength || 2.5}
    >
      <img
        src={userProfile !== '' ? userProfile : '../../defaultProfile.svg'}
        alt="Profile"
      />
    </Button>
  );
};

export default ProfileIcon;
