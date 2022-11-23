import React from 'react';
// img
import testImage from '../../static/testImage.png';
import catFootprint from '../../static/catFootprint.svg';
// component
import NavBar from '../../components/NavBar/NavBar';
import NormalTopBar from '../../components/NormalTopBar/NormalTopBar';
// style
import { BoardContainer, BoardEnd } from './HomePageStyles';
import BoardItem from '../../components/BoardItem/BoardItem';
import { Board } from '../../types/responseData';

/* Test Data */
const today = new Date(Date.now());
const timeStamp = `${today.getFullYear()}.${
  today.getMonth() + 1
}.${today.getDate()}`;
const boards: Board[] = [
  {
    userId: 1,
    userName: 'Test User1',
    userProfile: '../../defaultProfile.svg',
    boardId: '1',
    content: '게시글 테스트1',
    url: [testImage],
    like: 2,
    comment: 2,
    createAt: timeStamp,
    location: '서울특별시 역삼동',
  },
  {
    userId: 2,
    userName: 'Test User2',
    userProfile: '../../defaultProfile.svg',
    boardId: '2',
    content: '게시글 테스트2',
    url: [testImage],
    like: 0,
    comment: 0,
    createAt: timeStamp,
    location: null,
  },
  {
    userId: 3,
    userName: 'Test User3',
    userProfile: '../../defaultProfile.svg',
    boardId: '3',
    content: 'sdasdasdasdsadasdsadadsadasdsadasdadsdadadadsdasdadaddssadsd',
    url: [testImage],
    like: 123,
    comment: 0,
    createAt: timeStamp,
    location: '동탄 어딘가',
  },
];

const HomePage = () => {
  return (
    <>
      <NormalTopBar />
      <BoardContainer>
        {boards.map((board) => {
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
      {/* <TempBody src={tempHomeBody} alt="Temp" /> */}
      <NavBar />
    </>
  );
};

export default HomePage;
