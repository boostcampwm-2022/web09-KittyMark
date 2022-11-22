import React from 'react';
import BoardImagesContainer from './BoardImagesStyles';

interface BoardImagesProps {
  src: string;
}

const BoardImages = (props: BoardImagesProps) => {
  const { src } = props;
  return <BoardImagesContainer src={src} />;
};

export default BoardImages;
