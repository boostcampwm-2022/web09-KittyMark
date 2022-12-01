/* eslint-disable no-console */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { AxiosError } from 'axios';
import { useRecoilValue } from 'recoil';
// recoil
import user from '../../store/userAtom';
// api
import { getUserInfo, postFollow, deleteFollow } from '../../apis/api/userApi';
// style
import S from './UserInfoContainerStyles';
// component
import ProfileIcon from '../ProfileIcon/ProfileIcon';
import { Api, UserInfo } from '../../types/responseData';

const UserInfoContainer = ({ targetId }: { targetId: number }) => {
  const navigation = useNavigate();
  const queryClient = useQueryClient();

  const { userId } = useRecoilValue(user);

  const userInfo = useQuery<UserInfo, AxiosError>('userInfo', () =>
    getUserInfo(targetId).then((res) => res.data),
  );

  const { mutate: delFol } = useMutation<Api, AxiosError>(
    () => deleteFollow(userId, targetId),
    {
      onSuccess: () => queryClient.invalidateQueries('userInfo'),
      // eslint-disable-next-line no-console
      onError: (e) => console.log(e.message),
    },
  );

  const { mutate: postFol } = useMutation<Api, AxiosError>(
    () => postFollow(userId, targetId),
    {
      onSuccess: () => queryClient.invalidateQueries('userInfo'),
      // eslint-disable-next-line no-console
      onError: (e) => console.log(e.message),
    },
  );

  if (userInfo.isLoading || userInfo.isIdle) {
    return (
      <S.StatusWrap>
        <p>Loading...</p>
      </S.StatusWrap>
    );
  }

  if (userInfo.isError) {
    return (
      <S.StatusWrap>
        <p>{userInfo.error.message}</p>
      </S.StatusWrap>
    );
  }

  const onClickFollowCnt = () => {
    navigation(`/follow/${userInfo.data.userName}/${userInfo.data.userId}`);
  };

  const onClickFollowBtn = () => {
    if (userInfo.data.followed_by_viewer) delFol();
    else postFol();
  };

  return (
    <>
      <S.OuterContainer>
        <ProfileIcon
          targetId={userInfo.data.userId}
          userName={userInfo.data.userName}
          userProfile={
            userInfo.data.userProfileUrl || '../../defaultProfile.svg'
          }
          customLength={4}
        />
        <S.InnerContainerWrap>
          <S.Name>{userInfo.data.userName}</S.Name>
          <S.InnerContainer>
            <S.CountSlot>
              <button type="button">{userInfo.data.boards.count}</button>
              <p>게시물</p>
            </S.CountSlot>
            <S.CountSlot>
              <button type="button" onClick={onClickFollowCnt}>
                {userInfo.data.follow.count}
              </button>
              <p>팔로워</p>
            </S.CountSlot>
            <S.CountSlot>
              <button type="button" onClick={onClickFollowCnt}>
                {userInfo.data.followed_by.count}
              </button>
              <p>팔로잉</p>
            </S.CountSlot>
          </S.InnerContainer>
        </S.InnerContainerWrap>
      </S.OuterContainer>
      {targetId !== userId && (
        <S.ButtonContainer>
          <S.FollowButton
            type="button"
            isFollow={userInfo.data.followed_by_viewer}
            onClick={onClickFollowBtn}
          >
            {userInfo.data.followed_by_viewer ? '팔로잉' : '팔로우'}
          </S.FollowButton>
          <S.DMButton type="button">메시지</S.DMButton>
        </S.ButtonContainer>
      )}
    </>
  );
};

export default UserInfoContainer;
