import React from 'react';
import styled from 'styled-components';

const CarouselImageWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;
const CarouselImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

interface CarouselItemProps {
  key: number;
  src: string;
}

const CarouselItem = (props: CarouselItemProps) => {
  const { key, src } = props;
  return (
    <CarouselImageWrapper key={key}>
      <CarouselImage src={src} />
    </CarouselImageWrapper>
  );
};

export default CarouselItem;
