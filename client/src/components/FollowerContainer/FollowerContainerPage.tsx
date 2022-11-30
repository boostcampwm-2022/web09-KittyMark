/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
// import { useMutation, useQuery, useQueryClient } from 'react-query';
// style
import S from './FollowerContainerStyles';
// component
import FollowUnit from '../FollowUnit/FollowUnit';

interface FollowerContainerProps {
  userName: string;
  userId: number;
  setOn: React.Dispatch<React.SetStateAction<boolean>>;
}

const FollowerContainer = ({
  userName,
  userId,
  setOn,
}: FollowerContainerProps) => {
  const onClickFollowingBtn = () => setOn((prev) => !prev);

  return (
    <S.Body>
      <S.ButtonContainer>
        <S.Button type="button" isOn>
          팔로워
        </S.Button>
        <S.Button type="button" isOn={false} onClick={onClickFollowingBtn}>
          팔로잉
        </S.Button>
      </S.ButtonContainer>
      <S.UnitContainer>
        <FollowUnit targetId={1} userName="Other User 1" isFollow />
        <FollowUnit targetId={2} userName="Other User 2" isFollow={false} />
      </S.UnitContainer>
    </S.Body>
  );
};

export default FollowerContainer;
