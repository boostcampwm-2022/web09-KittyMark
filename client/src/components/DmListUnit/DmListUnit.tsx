/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import ProfileIcon from '../ProfileIcon/ProfileIcon';
// style
import S from './DmListUnitStyles';
// util
import timeCalc from '../../utils/timeCalc';

interface DmListUnitProps {
  targetId: number;
  userName: string;
  userProfile: string;
  messageTime: string;
  messageCnt: number;
  lastMessage: string;
}

const DmListUnit = ({
  targetId,
  userName,
  userProfile,
  messageTime,
  messageCnt,
  lastMessage,
}: DmListUnitProps) => {
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
