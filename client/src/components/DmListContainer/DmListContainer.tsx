/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import axios, { AxiosError } from 'axios';

import DmListUnit from '../DmListUnit/DmListUnit';
// style
import S from './DmListContainerStyles';
// api
import { getDirectMessageList } from '../../apis/api/dmApi';
// hook
import useDmListQuery from '../../hooks/useDmListQuery';
// component
// import FollowUnit from '../FollowUnit/FollowUnit';
// type

interface FollowerContainerProps {
  userId: number;
  userName: string;
}

// TODO 리엑트 쿼리 관련 코드를 분할하는 것이 좋을 수 있다.
const DmListContainer = ({ userId, userName }: FollowerContainerProps) => {
  const navigate = useNavigate();
  const dmList = useDmListQuery(userId);

  if (dmList.isLoading || dmList.isIdle) {
    return (
      <S.Body>
        <p>Loading...</p>
      </S.Body>
    );
  }

  if (dmList.isError) {
    return (
      <S.Body>
        <p>
          {axios.isAxiosError(dmList.error) ? dmList.error.message : 'error'}
        </p>
      </S.Body>
    );
  }

  return (
    <S.Body>
      <S.UnitContainer>
        {dmList.data &&
          dmList.data.map((dm) => {
            const chatUser =
              userId === dm.participant1.id ? dm.participant2 : dm.participant1;

            return (
              <DmListUnit
                key={dm.id}
                targetId={chatUser.id}
                userName={chatUser.name}
                userProfile={chatUser.profileUrl}
                messageTime={dm.recentMessage.createdAt}
                messageCnt={dm.unSeenMsgCnt || 0}
                lastMessage={dm.recentMessage.content}
                onClick={() => {
                  navigate(`/dm/${chatUser.name}/${chatUser.id}`, {
                    state: { roomId: dm.id },
                  });
                }}
              />
            );
          })}
      </S.UnitContainer>
    </S.Body>
  );
};

export default DmListContainer;
