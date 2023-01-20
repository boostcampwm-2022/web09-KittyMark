import React from 'react';
import ProfileIcon from '../ProfileIcon/ProfileIcon';
import S from './DirectMessageStyles';

interface DirectMessageProps {
  isReceived: boolean;
  message: string;
}

const DirectMessage = (props: DirectMessageProps, index: number) => {
  const { isReceived, message } = props;

  return (
    <S.Body key={index}>
      {isReceived === true ? (
        <S.ReceivedWrapper>
          <ProfileIcon
            targetId={1}
            userName="test"
            userProfile=""
            customLength={1.5}
          />
          <S.Message>{message}</S.Message>
        </S.ReceivedWrapper>
      ) : (
        <S.Wrapper>
          <S.Message>{message}</S.Message>
        </S.Wrapper>
      )}
    </S.Body>
  );
};

export default DirectMessage;
