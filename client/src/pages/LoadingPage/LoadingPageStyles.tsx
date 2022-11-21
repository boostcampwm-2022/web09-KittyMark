import styled from 'styled-components';

const Background = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  background: ${(props) => props.theme.palette.back};
  z-index: 999;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const LoadingText = styled.div`
  padding-top: 5%;
  font-weight: 700;
  font-size: 18px;
`;

export { Background, LoadingText };
