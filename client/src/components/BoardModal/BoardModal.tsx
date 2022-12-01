import React from 'react';
import { Board } from '../../types/responseData';
import BoardItem from '../BoardItem/BoardItem';
import closeButton from '../../static/closeButton.svg';
import { Container, Background, InnerContainer } from './BoardModalStyles';

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
    <Container>
      <Background>
        <div className="button-wrapper">
          <button type="button" onClick={closeModal}>
            <img src={closeButton} alt="close board modal" />
          </button>
        </div>
        <InnerContainer>{BoardItem(board)}</InnerContainer>
      </Background>
    </Container>
  );
};

export default BoardModal;
