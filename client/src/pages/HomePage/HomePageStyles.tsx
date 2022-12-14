import styled from 'styled-components';

const TempBody = styled.img`
  width: 100%;
  height: calc(100% - 8rem);
  background-color: ${(props) => props.theme.palette.back};
  object-fit: cover;
`;

const BoardContainer = styled.div`
  font-family: 'SF-Pro';
  font-style: normal;
  min-height: 100vh;
  overflow: hidden;
  width: 100%;
  height: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 0.5rem;
  gap: 1rem;
`;

const BoardEnd = styled.div`
  padding-top: 1rem;
  height: 10rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
export default { TempBody, BoardContainer, BoardEnd };
