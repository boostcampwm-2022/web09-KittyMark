import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// img
import catFootprint from '../../static/catFootprint.svg';
import addPostButtonImg from '../../static/addPost.svg';
// component
import NavBar from '../../components/NavBar/NavBar';
import NormalTopBar from '../../components/NormalTopBar/NormalTopBar';
import BoardItem from '../../components/BoardItem/BoardItem';
// style
import { BoardContainer, BoardEnd } from './HomePageStyles';
// type
import { Board } from '../../types/responseData';
// api
import { getBoardData } from '../../apis/api/boardApi';

const makeBoarList = (boards: Board[]) => {
  const boardList = boards.map((board) => {
    return BoardItem(board);
  });
  return boardList;
};

const HomePage = () => {
  const navigate = useNavigate();
  const [boards, setBoards] = useState<Board[]>([]);
  const requestCount = 10000;
  const addPostButton = {
    buttonImg: addPostButtonImg,
    eventHandler: () => {
      navigate('/new-post');
    },
    description: '게시물을 추가할래요.',
  };

  const getData = async () => {
    const { statusCode, message, data } = await getBoardData(
      requestCount,
      '-1',
    );
    if (statusCode !== 200) throw new Error(message);
    if (data === undefined) return;

    setBoards(boards.concat(data.boards));
  };

  useEffect(() => {
    try {
      getData();
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  }, []);

  return (
    <>
      <NormalTopBar buttonData={addPostButton} />
      <BoardContainer>
        {boards.length !== 0 ? makeBoarList(boards) : null}
        <BoardEnd>
          <img
            src={catFootprint}
            alt="Board End Mark"
            width="40rem"
            height="40rem"
          />
          <p>모든 게시물을 확인했습니다</p>
        </BoardEnd>
      </BoardContainer>
      <NavBar />
    </>
  );
};

export default HomePage;
