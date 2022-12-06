import React from 'react';
// style
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import styled from 'styled-components';
import CarouselItem from './CarouselItem/CarouselItem';

const CarouselWrapper = styled.div`
  margin-bottom: 6%;
  width: 85vw;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const StyledSlider = styled(Slider)`
  .slick-prev {
    left: 5px;
    z-index: 1;
  }
  .slick-next {
    right: 5px;
    z-index: 1;
  }
  .slick-track {
    display: flex;
    align-items: center;
  }
`;

interface ImageCarouselProps {
  imageUrls: string[];
}

const ImageCarousel = (props: ImageCarouselProps) => {
  const { imageUrls } = props;

  const makeImageItems = (urls: string[]) => {
    let count = 0;
    const imageItems = urls.map((url) => {
      count += 1;
      return <CarouselItem key={count} src={url} />;
    });
    return imageItems;
  };
  return (
    <CarouselWrapper>
      <StyledSlider
        dots
        infinite
        draggable
        speed={500}
        slidesToShow={1}
        slidesToScroll={1}
      >
        {makeImageItems(imageUrls)}
      </StyledSlider>
    </CarouselWrapper>
  );
};

export default ImageCarousel;
