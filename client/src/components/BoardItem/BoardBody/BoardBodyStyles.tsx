import styled from 'styled-components';

const BoardBodyWrapper = styled.div`
  margin-top: 3%;
  width: 95%;
  border-radius: 15px;
  background-color: ${(props) => props.theme.palette.inner};
  display: flex;
  align-items: center;
`;

const BoardBodyContainer = styled.div`
  width: 95%;
  height: 95%;
  display: flex;
  flex-direction: column;
`;
const BoardBodyButtonContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 2%;
  padding-left: 3%;

  button {
    margin: 0;
    background-color: transparent;
    border: 0px;
  }
`;
const BoardBodyContentContainer = styled.div`
  padding-left: 5%;
  font-size: 0.9rem;
  font-weight: 400;

  p {
    margin-top: 3%;
    margin-bottom: 2%;
    word-wrap: break-word;
  }
`;
const BoardBodyInfoContainer = styled.div`
  padding-left: 3%;
  font-size: 0.7rem;
  font-weight: 600;
  display: flex;
  justify-content: space-between;
  color: #9b9b9b;

  div {
    padding-left: 3%;
    display: flex;
    gap: 0.5rem;
    white-space: nowrap;
  }
`;

export {
  BoardBodyWrapper,
  BoardBodyContainer,
  BoardBodyButtonContainer,
  BoardBodyContentContainer,
  BoardBodyInfoContainer,
};
