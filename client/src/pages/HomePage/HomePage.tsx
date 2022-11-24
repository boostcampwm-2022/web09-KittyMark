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
      <NavBar />
    </>
  );
};

export default HomePage;
