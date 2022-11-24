import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// img
import testImage from '../../static/testImage.png';
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
import { getBoardData } from '../../apis/api/BoardApi';

/* Test Data */
const today = new Date(Date.now());
const timeStamp = `${today.getFullYear()}.${
  today.getMonth() + 1
}.${today.getDate()}`;
const dummyBoards: Board[] = [
  {
    id: '1',
    content: '게시글 테스트1',
    isStreet: true,
    like: 2,
    comment: 2,
    createAt: timeStamp,
    location: '서울특별시 역삼동',
    photos: {
      url: [testImage],
    },
    user: {
      id: 1,
      name: 'Test User1',
      profileUrl: '../../defaultProfile.svg',
    },
  },
  {
    id: '2',
    content: '게시글 테스트2',
    isStreet: false,
    like: 0,
    comment: 0,
    createAt: timeStamp,
    location: null,
    photos: {
      url: [testImage],
    },
    user: {
      id: 2,
      name: 'Test User2',
      profileUrl: '../../defaultProfile.svg',
    },
  },
  {
    id: '3',
    content: 'sdasdasdasdsadasdsadadsadasdsadasdadsdadadadsdasdadaddssadsd',
    isStreet: true,
    like: 123,
    comment: 0,
    createAt: timeStamp,
    location: '동탄 어딘가',
    photos: {
      url: [testImage],
    },
    user: {
      id: 3,
      name: 'Test User3',
      profileUrl: '../../defaultProfile.svg',
    },
  },
];

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
        {boards.map((board) => {
          return BoardItem(board);
        })}
        {dummyBoards.map((board) => {
          return BoardItem(board);
        })}
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
