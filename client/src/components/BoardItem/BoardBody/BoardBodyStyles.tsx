import styled from 'styled-components';

const Wrapper = styled.div`
  width: 95%;
  border-radius: 15px;
  background-color: ${(props) => props.theme.palette.inner};
  display: flex;
  align-items: center;
`;

const Container = styled.div`
  width: 95%;
  height: 95%;
  display: flex;
  flex-direction: column;
`;
const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 2%;
  padding-left: 3%;

  button {
    margin: 0;
    background-color: transparent;
    display: flex;
    align-items: center;
    border: 0px;
    padding: 0px;
  }
`;
const ContentContainer = styled.div`
  padding-left: 5%;
  font-size: 0.9rem;
  font-weight: 400;

  p {
    margin-top: 3%;
    margin-bottom: 2%;
    word-wrap: break-word;
  }
`;
const InfoContainer = styled.div`
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

export default {
  Wrapper,
  Container,
  ButtonContainer,
  ContentContainer,
  InfoContainer,
};
