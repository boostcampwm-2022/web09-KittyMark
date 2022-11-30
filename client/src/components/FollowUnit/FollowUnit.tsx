import React from 'react';
import styled from 'styled-components';
// component
import ProfileIcon from '../ProfileIcon/ProfileIcon';

const OuterContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  height: 3rem;
  width: 80%;
  * {
    font-family: 'Jua';
    font-style: normal;
    font-weight: 400;
  }
`;

const InnerContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1rem;
`;

const FollowButton = styled.button<{ isFollow: boolean }>`
  width: 5rem;
  height: 1.5rem;
  border: 1px solid
    ${(props) => (props.isFollow ? props.theme.palette.border : '#ff4646')};
  border-radius: 1rem;
  padding: 0px;

  color: ${(props) => (props.isFollow ? '#000000' : '#ffffff')};
  background: ${(props) => (props.isFollow ? '#ffffff' : '#ff4646')};

  cursor: pointer;

  font-size: 12px;
  line-height: 15px;
`;

interface FollowUnitProps {
  targetId: number;
  userName: string;
  isFollow: boolean;
}

const FollowUnit = ({ targetId, userName, isFollow }: FollowUnitProps) => {
  return (
    <OuterContainer>
      <InnerContainer>
        <ProfileIcon
          targetId={targetId}
          userName="test"
          userProfile="../../defaultProfile.svg"
        />
        <p>{userName}</p>
      </InnerContainer>
      <FollowButton type="button" isFollow={isFollow}>
        팔로잉
      </FollowButton>
    </OuterContainer>
  );
};

export default FollowUnit;
