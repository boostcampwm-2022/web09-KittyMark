import styled from 'styled-components';

const Wrapper = styled.div`
  padding-bottom: 2%;
  width: 95%;
  border-radius: 15px;
  background-color: ${(props) => props.theme.palette.inner};
  display: flex;
  align-items: center;
`;

const Container = styled.div`
  padding-left: 3%;
  width: 95%;
  height: 9%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 2%;

  button {
    margin: 0;
    background-color: transparent;
    display: flex;
    align-items: center;
    border: 0px;
    padding: 0px;
  }
`;

const LikeCountContainer = styled.div`
  font-weight: 500;
  font-size: 0.9rem;
`;

const ContentContainer = styled.div`
  font-size: 0.9rem;
  font-weight: 400;
  width: 100%;
  height: 100%;

  .user-name {
    font-weight: bold;
  }

  span {
    word-wrap: break-word;
  }
`;

const InfoContainer = styled.div`
  font-size: 0.8rem;
  font-weight: 500;
  display: flex;
  justify-content: space-between;
  color: #9b9b9b;

  div {
    display: flex;
    gap: 0.5rem;
    white-space: nowrap;
    align-items: flex-end;

    .create-time-info {
      font-size: 0.7rem;
    }
  }
`;

export default {
  Wrapper,
  Container,
  ButtonContainer,
  LikeCountContainer,
  ContentContainer,
  InfoContainer,
};
