import React from 'react';
import { useQuery } from 'react-query';
import { AxiosError } from 'axios';
// api
import { getUserPost } from '../../apis/api/userApi';
// style
import S from './UserPostContainerStyles';
// component
import { UserPostApi } from '../../types/responseData';

const UserPostContainer = ({ targetId }: { targetId: number }) => {
  const userPost = useQuery<UserPostApi, AxiosError>('userPost', () =>
    getUserPost(targetId),
  );

  if (userPost.isLoading || userPost.isIdle) {
    return (
      <S.StatusWrap>
        <p>Loading...</p>
      </S.StatusWrap>
    );
  }

  if (userPost.isError) {
    return (
      <S.StatusWrap>
        <p>{userPost.error.message}</p>
      </S.StatusWrap>
    );
  }

  return (
    <S.Grid>
      {[...new Array(20)].map(() => (
        <S.GridSlot type="button" />
      ))}
    </S.Grid>
  );
};

export default UserPostContainer;
