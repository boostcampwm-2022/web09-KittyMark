/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import DmListUnit from '../DmListUnit/DmListUnit';
// import { useQuery } from 'react-query';
// import axios, { AxiosError } from 'axios';
// import { useRecoilValue } from 'recoil';
// recoil
// style
import S from './DmListContainerStyles';
// api
// component
// import FollowUnit from '../FollowUnit/FollowUnit';
// type

interface FollowerContainerProps {
  userId: number;
  userName: string;
}

// TODO 리엑트 쿼리 관련 코드를 분할하는 것이 좋을 수 있다.
const DmListContainer = ({ userId, userName }: FollowerContainerProps) => {
  // const followList = useQuery<FollowListData, AxiosError>('followList', () =>
  //   getFollow(Number(userId), viewerId).then((res) => res.data),
  // );

  // if (followList.isLoading || followList.isIdle) {
  //   return (
  //     <S.Body>
  //       <p>Loading...</p>
  //     </S.Body>
  //   );
  // }

  // if (followList.isError) {
  //   return (
  //     <S.Body>
  //       <p>
  //         {axios.isAxiosError(followList.error)
  //           ? followList.error.message
  //           : 'error'}
  //       </p>
  //     </S.Body>
  //   );
  // }

  return (
    <S.Body>
      <S.UnitContainer>
        <DmListUnit
          targetId={22}
          userName="test1"
          userProfile=""
          messageTime="2022-12-22T14:49:48.061Z"
          messageCnt={11}
          lastMessage="테스트입니다. 장문을 적으면 이렇게 줄이 가려집니다. 안녕하세요."
        />
        <DmListUnit
          targetId={21}
          userName="test2"
          userProfile=""
          messageTime="2022-12-15T17:01:00.830Z"
          messageCnt={11}
          lastMessage="테스트입니다."
        />
        <DmListUnit
          targetId={20}
          userName="test3"
          userProfile=""
          messageTime="2022-12-20T11:11:51.463Z"
          messageCnt={11}
          lastMessage="테스트입니다."
        />
      </S.UnitContainer>
    </S.Body>
  );
};

export default DmListContainer;
