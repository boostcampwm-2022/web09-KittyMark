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

  const { boards } = userPost.data.data;

  return (
    <S.Grid>
      {boards.map((board) => (
        <S.GridSlot key={board.id} type="button">
          <img alt="Thumbnail" src={board.photos[0].url} />
        </S.GridSlot>
      ))}
    </S.Grid>
  );
};

export default UserPostContainer;
