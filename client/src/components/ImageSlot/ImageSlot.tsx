import React from 'react';
// style
import {
  ImageSlotContainer,
  ImageSlotDelBtn,
  ImageSlotImage,
} from './ImageSlotStyles';
// image
import delBtn from '../../static/delBtn.svg';

interface ImageSlotProps {
  imgSrc: string;
  index: number;
  onClickFun: (index: number) => void;
}

const ImageSlot = ({ imgSrc, index, onClickFun }: ImageSlotProps) => {
  return (
    <ImageSlotContainer className="preview-image-wrap">
      <ImageSlotImage alt="preview" src={imgSrc} />
      <ImageSlotDelBtn type="button" onClick={() => onClickFun(index)}>
        <img alt="delete button" src={delBtn} />
      </ImageSlotDelBtn>
    </ImageSlotContainer>
  );
};

export default ImageSlot;
