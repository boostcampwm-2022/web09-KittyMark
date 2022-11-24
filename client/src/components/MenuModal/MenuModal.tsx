import React, { useRef, useEffect } from 'react';
// style
import MenuModalContainer from './MenuModalStyles';

interface MenuModalProps {
  top: number;
  left: number;
  onClickCancel: () => void;
}

const MenuModal = ({ top, left, onClickCancel }: MenuModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const clickOutOfModal = (event: MouseEvent) => {
      // eslint-disable-next-line no-console
      console.log('outter modal');
      event.stopPropagation();
      if (
        event.currentTarget &&
        modalRef.current &&
        !modalRef.current?.contains(event.target as Node)
      )
        onClickCancel();
    };
    document.addEventListener('mousedown', clickOutOfModal);
    return () => {
      document.removeEventListener('mousedown', clickOutOfModal);
    };
  });

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
