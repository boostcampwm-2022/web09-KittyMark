/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { Ref, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { InfiniteData, useInfiniteQuery, useQuery } from 'react-query';
import { AxiosError } from 'axios';
import { useInView } from 'react-intersection-observer';
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
  const [ref, isView] = useInView();
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

  // const { data: boards } = useQuery<Board[], AxiosError<Api>>(
  //   'boards',
  //   () =>
  //     getBoardData(requestCount, '-1').then((response) => response.data.boards),
  //   {
  //     onError: (error) => {
  //       if (
  //         error.response &&
  //         error.response.data.statusCode === 401 &&
  //         error.response.data.error === 'Unauthorized'
  //       ) {
  //         setUserData({ userId: -1, userName: '', userProfileUrl: '' });
  //         navigate('/');
  //       }
  //     },
  //   },
  // );

  // 테스트 중입니다.
  const fetchBoardList = async ({ pageParam = -1 }) => {
    const response = await getBoardData(4, String(pageParam));
    const result = response.data;
    const nextPage = result.next_max_id;
    return {
      result: result.boards,
      nextPage,
      isLast: nextPage < 1,
    };
  };

  const query = useInfiniteQuery<
    { result: [Board]; nextPage: number; isLast: boolean },
    AxiosError<Api>
  >('[boardlist]', fetchBoardList, {
    getNextPageParam: (lastPage, pages) => {
      if (!lastPage.isLast) return lastPage.nextPage;
      return undefined;
    },
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    refetchOnReconnect: true,
    retry: 1,
    onError: (error) => {
      if (
        error.response &&
        error.response.data.statusCode === 401 &&
        error.response.data.error === 'Unauthorized'
      ) {
        setUserData({ userId: -1, userName: '', userProfileUrl: '' });
        navigate('/');
      }
    },
  });

  useEffect(() => {
    if (isView && query.hasNextPage) {
      query.fetchNextPage();
    }
  }, [isView, query.data]);

  //

  return (
    <>
      <NormalTopBar buttonData={addPostButton} />
      <S.BoardContainer>
        {query.data &&
          query.data.pages.map((pageData, pageNum) => {
            const boardPage = pageData.result;
            if (boardPage)
              return boardPage.map((item, idx) => {
                if (
                  query.data.pages.length - 1 === pageNum &&
                  boardPage.length - 1 === idx
                )
                  return BoardItem(item, ref);
                return BoardItem(item);
              });
            return null;
          })}
        <S.BoardEnd>
          <img
            src={catFootprint}
            alt="Board End Mark"
            width="40rem"
            height="40rem"
          />
          <p>
            {query.isLoading ? '로딩중입니다.' : '모든 게시물을 확인했습니다'}
          </p>
        </S.BoardEnd>
      </S.BoardContainer>
      <NavBar />
    </>
  );
};

export default HomePage;
