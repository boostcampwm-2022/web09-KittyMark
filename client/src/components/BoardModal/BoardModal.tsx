import React from 'react';
import { Board } from '../../types/responseData';
import BoardItem from '../BoardItem/BoardItem';
import closeButton from '../../static/closeButton.svg';
import S from './BoardModalStyles';

interface BoardModalProps {
  board: Board;
  setClickedBoard: (board: Board | null) => void;
}

const BoardModal = (props: BoardModalProps) => {
  const { board, setClickedBoard } = props;
  const closeModal = () => {
    setClickedBoard(null);
  };
  return (
    <S.Container>
      <S.Background>
        <div className="button-wrapper">
          <button type="button" onClick={closeModal}>
            <img src={closeButton} alt="close board modal" />
          </button>
        </div>
        <S.InnerContainer>{BoardItem(board)}</S.InnerContainer>
      </S.Background>
    </S.Container>
  );
};

export default BoardModal;
