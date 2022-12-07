import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import { AxiosError } from 'axios';
import { useSetRecoilState } from 'recoil';
import user from '../../store/userAtom';
// img
import catFootprint from '../../static/catFootprint.svg';
import addPostButtonImg from '../../static/addPost.svg';
// component
import NavBar from '../../components/NavBar/NavBar';
import NormalTopBar from '../../components/NormalTopBar/NormalTopBar';
import BoardItem from '../../components/BoardItem/BoardItem';
// style
import S from './HomePageStyles';
// type
import { Api, Board } from '../../types/responseData';
// api
import { getBoardData } from '../../apis/api/boardApi';

const makeBoarList = (boards: Board[]) => {
  const boardList = boards.map((board) => {
    return BoardItem(board);
  });
  return boardList;
};

const HomePage = () => {
  const setUserData = useSetRecoilState(user);
  const navigate = useNavigate();
  const requestCount = 10000;
  const addPostButton = {
    buttonImg: addPostButtonImg,
    eventHandler: () => {
      navigate('/new-post');
    },
    description: '게시물을 추가할래요.',
  };

  const { data: boards } = useQuery<Board[], AxiosError<Api>>(
    'boards',
    () =>
      getBoardData(requestCount, '-1').then((response) => response.data.boards),
    {
      onError: (error) => {
        if (
          error.response &&
          error.response.data.statusCode === 401 &&
          error.response.data.error === 'Unauthorized'
        ) {
          setUserData({ userId: -1, userName: '' });
          navigate('/');
        }
      },
    },
  );

  return (
    <>
      <NormalTopBar buttonData={addPostButton} />
      <S.BoardContainer>
        {boards ? makeBoarList(boards) : null}
        <S.BoardEnd>
          <img
            src={catFootprint}
            alt="Board End Mark"
            width="40rem"
            height="40rem"
          />
          <p>모든 게시물을 확인했습니다</p>
        </S.BoardEnd>
      </S.BoardContainer>
      <NavBar />
    </>
  );
};

export default HomePage;
