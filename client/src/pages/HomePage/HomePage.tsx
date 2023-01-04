/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
import { Board } from '../../types/responseData';
// hook
import useBoardQuery from '../../hooks/useBoardQuery';

const makeBoarList = (boards: Board[]) => {
  const boardList = boards.map((board) => {
    return BoardItem(board);
  });
  return boardList;
};

const HomePage = () => {
  const [ref, isView] = useInView();
  const navigate = useNavigate();
  const addPostButton = {
    buttonImg: addPostButtonImg,
    eventHandler: () => {
      navigate('/new-post');
    },
    description: '게시물을 추가할래요.',
  };

  const query = useBoardQuery();

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
