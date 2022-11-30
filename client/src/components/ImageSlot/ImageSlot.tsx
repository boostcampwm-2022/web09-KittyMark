import React from 'react';
// style
import S from './ImageSlotStyles';
// image
import delBtn from '../../static/delBtn.svg';

interface ImageSlotProps {
  imgSrc: string;
  index: number;
  onClickFun: (index: number) => void;
}

const ImageSlot = ({ imgSrc, index, onClickFun }: ImageSlotProps) => {
  return (
    <S.Container className="preview-image-wrap">
      <S.Image alt="preview" src={imgSrc} />
      <S.DeleteButton type="button" onClick={() => onClickFun(index)}>
        <img alt="delete button" src={delBtn} />
      </S.DeleteButton>
    </S.Container>
  );
};

export default ImageSlot;
