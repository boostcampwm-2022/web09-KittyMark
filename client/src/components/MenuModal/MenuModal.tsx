import React, { MouseEventHandler, useRef } from 'react';
// style
import MenuModalContainer from './MenuModalStyles';

interface MenuModalProps {
  top: number;
  left: number;
  onClickCancel: MouseEventHandler<HTMLButtonElement>;
}

const MenuModal = ({ top, left, onClickCancel }: MenuModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  return (
    <MenuModalContainer top={top} left={left} ref={modalRef}>
      <button type="button">수정하기</button>
      <button type="button">삭제하기</button>
      <button type="button" onClick={onClickCancel}>
        취소
      </button>
    </MenuModalContainer>
  );
};
export default MenuModal;
