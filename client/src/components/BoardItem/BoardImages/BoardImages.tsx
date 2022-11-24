import React from 'react';
import BoardImagesContainer from './BoardImagesStyles';

interface BoardImagesProps {
  src: string;
}

/* TODO: 캐러셀 구현 예정 */
const BoardImages = (props: BoardImagesProps) => {
  const { src } = props;
  return <BoardImagesContainer src={src} />;
};

export default BoardImages;
