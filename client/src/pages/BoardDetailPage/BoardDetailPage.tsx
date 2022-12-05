import React from 'react';
import { useRecoilValue } from 'recoil';
import { useNavigate } from 'react-router-dom';

import S from './BoardDetailPageStyles';
import boardDetail from '../../store/boardDetailAtom';
import NavBar from '../../components/NavBar/NavBar';
import TopBar from '../../components/TopBar/TopBar';
import BoardItem from '../../components/BoardItem/BoardItem';

const BoardDetailPage = () => {
  const navigation = useNavigate();
  const boardData = useRecoilValue(boardDetail);

  return (
    <>
      <TopBar
        isBack
        title="상세페이지"
        isCheck={false}
        backFunc={() => navigation(-1)}
      />
      <S.Wrap>{BoardItem(boardData)}</S.Wrap>
      <NavBar />
    </>
  );
};

export default BoardDetailPage;
