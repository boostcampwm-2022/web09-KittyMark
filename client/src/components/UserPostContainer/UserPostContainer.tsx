import React from 'react';
import { useSetRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import { AxiosError } from 'axios';
// recoil
import boardDetail from '../../store/boardDetailAtom';
// api
import { getUserPost } from '../../apis/api/userApi';
// style
import S from './UserPostContainerStyles';
// component
import { Board, UserPostApi } from '../../types/responseData';

const UserPostContainer = ({ targetId }: { targetId: number }) => {
  const navigation = useNavigate();
  const setBoardDetail = useSetRecoilState(boardDetail);
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

  const onClickThumbnail = (board: Board) => {
    setBoardDetail(board);
    navigation('/detail');
  };

  return (
    <S.Grid>
      {boards &&
        boards.map((board) => (
          <S.GridSlot
            key={board.id}
            type="button"
            onClick={() => onClickThumbnail(board)}
          >
            <img alt="Thumbnail" src={board.photos[0].url} />
          </S.GridSlot>
        ))}
    </S.Grid>
  );
};

export default UserPostContainer;
