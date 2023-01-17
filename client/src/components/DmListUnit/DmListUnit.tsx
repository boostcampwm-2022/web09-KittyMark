/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { useNavigate } from 'react-router-dom';
// style
import S from './DmListUnitStyles';
// util
import timeCalc from '../../utils/timeCalc';
// component
import ProfileIcon from '../ProfileIcon/ProfileIcon';

interface DmListUnitProps {
  targetId: number;
  userName: string;
  userProfile: string;
  messageTime: string;
  messageCnt: number;
  lastMessage: string;
  onClick: () => void;
}

const DmListUnit = ({
  targetId,
  userName,
  userProfile,
  messageTime,
  messageCnt,
  lastMessage,
  onClick,
}: DmListUnitProps) => {
  const navigate = useNavigate();

  const onClickDmListUnit = () => {
    navigate('/');
  };

  return (
    <S.OuterContainer>
      <ProfileIcon
        targetId={targetId}
        userName={userName}
        userProfile={userProfile || '../../defaultProfile.svg'}
      />
      <S.InnerContainer type="button">
        <S.Name>{userName}</S.Name>
        <S.DmContentContainer>
          <S.Message>{lastMessage}</S.Message>
          <S.Time>{timeCalc(messageTime)}</S.Time>
        </S.DmContentContainer>
      </S.InnerContainer>
    </S.OuterContainer>
  );
};

export default DmListUnit;
