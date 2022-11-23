import styled from 'styled-components';

const ImageSlotContainer = styled.div`
  width: 4.75rem;
  height: 4.75rem;
  border-radius: 0.5rem;
  position: relative;
  flex: 0 0 auto;
`;

const ImageSlotImage = styled.img`
  width: 4.75rem;
  height: 4.75rem;
  border: 1px solid ${(props) => props.theme.palette.border};
  border-radius: 0.5rem;
`;

const ImageSlotDelBtn = styled.button`
  position: absolute;
  width: 1.625rem;
  height: 1.625rem;
  left: 3.75rem;
  bottom: 3.75rem;
  border: none;
  background-color: #000000;
  border-radius: 2rem;
  padding: 0.25rem;

  img {
    width: 100%;
    height: 100%;
  }
`;

export { ImageSlotContainer, ImageSlotImage, ImageSlotDelBtn };
