import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import { AxiosError } from 'axios';
// api
import { getUserInfo } from '../../apis/api/userApi';
// style
import S from './UserInfoStyles';
// component
import ProfileIcon from '../ProfileIcon/ProfileIcon';
import { UserInfo } from '../../types/responseData';

const UserInfoContainer = ({ targetId }: { targetId: number }) => {
  const navigation = useNavigate();

  const userInfo = useQuery<UserInfo, AxiosError>('userInfo', () =>
    getUserInfo(targetId).then((res) => res.data),
  );

  if (userInfo.isLoading || userInfo.isIdle) {
    return (
      <S.StatusContainer>
        <p>Loading...</p>
      </S.StatusContainer>
    );
  }

  if (userInfo.isError) {
    return (
      <S.StatusContainer>
        <p>{userInfo.error.message}</p>
      </S.StatusContainer>
    );
  }

  const onClickFollow = () => {
    navigation('/followTest', {
      state: { userName: userInfo.data.userName, userId: userInfo.data.userId },
    });
  };

  return (
    <S.OuterContainer>
      <ProfileIcon
        userName={userInfo.data.userName}
        userProfile={userInfo.data.userProfileUrl || '../../defaultProfile.svg'}
        customLength={4}
      />
      <S.InnerContainerWrap>
        <S.Name>{userInfo.data.userName}</S.Name>
        <S.InnerContainer>
          <S.CountSlot>
            <button type="button">11</button>
            <p>게시물</p>
          </S.CountSlot>
          <S.CountSlot>
            <button type="button" onClick={onClickFollow}>
              {userInfo.data.follow.count}
            </button>
            <p>팔로워</p>
          </S.CountSlot>
          <S.CountSlot>
            <button type="button">{userInfo.data.followed_by.count}</button>
            <p>팔로잉</p>
          </S.CountSlot>
        </S.InnerContainer>
      </S.InnerContainerWrap>
    </S.OuterContainer>
  );
};

export default UserInfoContainer;
