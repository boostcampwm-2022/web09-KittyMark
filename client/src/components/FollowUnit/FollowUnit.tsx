import React from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { AxiosError } from 'axios';
// style
import S from './FollowUnitStyles';
// component
import ProfileIcon from '../ProfileIcon/ProfileIcon';
import { Api } from '../../types/responseData';
import { deleteFollow, postFollow } from '../../apis/api/userApi';

interface FollowUnitProps {
  userId: number;
  targetId: number;
  userName: string;
  isFollow: boolean;
}
// TODO UserInfoContainer 의 이벤트와 유사해서 같이 써도 괜찮을듯 하다.
const FollowUnit = ({
  userId,
  targetId,
  userName,
  isFollow,
}: FollowUnitProps) => {
  const queryClient = useQueryClient();

  const { mutate: postFol } = useMutation<Api, AxiosError>(
    () => postFollow(userId, targetId),
    {
      onSuccess: () => queryClient.invalidateQueries('followList'),
      // eslint-disable-next-line no-console
      onError: (e) => console.log(e.message),
    },
  );

  const { mutate: delFol } = useMutation<Api, AxiosError>(
    () => deleteFollow(userId, targetId),
    {
      onSuccess: () => queryClient.invalidateQueries('followList'),
      // eslint-disable-next-line no-console
      onError: (e) => console.log(e.message),
    },
  );

  const onClickFollowButton = () => {
    if (isFollow) delFol();
    else postFol();
  };

  return (
    <S.OuterContainer>
      <S.InnerContainer>
        <ProfileIcon
          targetId={targetId}
          userName="test"
          userProfile="../../defaultProfile.svg"
        />
        <p>{userName}</p>
      </S.InnerContainer>
      <S.FollowButton
        type="button"
        isFollow={isFollow}
        onClick={onClickFollowButton}
      >
        팔로잉
      </S.FollowButton>
    </S.OuterContainer>
  );
};

export default FollowUnit;
