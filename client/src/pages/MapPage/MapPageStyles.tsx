import styled from 'styled-components';

const NaverMap = styled.div`
  width: 100vw;
  height: calc(var(--vh, 1vh) * 100 - 8rem);
  /* height: calc(100vh - 8rem); */
`;

const SpinnerWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Spinner = styled.img`
  width: 11rem;
  position: relative;
  bottom: 10%;

  z-index: 1000;
`;

export { NaverMap, SpinnerWrapper, Spinner };
