/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import axios, { AxiosError } from 'axios';

import DmListUnit from '../DmListUnit/DmListUnit';
// import { useRecoilValue } from 'recoil';
// recoil
// style
import S from './DmListContainerStyles';
// api
import { getDirectMessageList } from '../../apis/api/dmApi';
// component
// import FollowUnit from '../FollowUnit/FollowUnit';
// type
import { DmRoom } from '../../types/responseData';

interface FollowerContainerProps {
  userId: number;
  userName: string;
}

// TODO 리엑트 쿼리 관련 코드를 분할하는 것이 좋을 수 있다.
const DmListContainer = ({ userId, userName }: FollowerContainerProps) => {
  const navigate = useNavigate();
  const DmList = useQuery<DmRoom[], AxiosError>('DmList', () =>
    getDirectMessageList(userId).then((res) => res.data.dmRooms),
  );

  if (DmList.isLoading || DmList.isIdle) {
    return (
      <S.Body>
        <p>Loading...</p>
      </S.Body>
    );
  }

  if (DmList.isError) {
    return (
      <S.Body>
        <p>
          {axios.isAxiosError(DmList.error) ? DmList.error.message : 'error'}
        </p>
      </S.Body>
    );
  }

  return (
    <S.Body>
      <S.UnitContainer>
        {DmList.data &&
          DmList.data.map((dm) => {
            const chatUser =
              userId === dm.participant1.id ? dm.participant2 : dm.participant1;

            return (
              <DmListUnit
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
