import styled from 'styled-components';

const Wrapper = styled.div`
  width: calc(100% - 2rem);
  height: calc(100% - 2.6rem);
  margin: 1.3rem 1rem;
  display: flex;
  justify-content: space-between;

  button {
    background-color: transparent;
    border: 0px;
    padding: 0px;
  }
`;
const Container = styled.div`
  width: auto;
  display: flex;
  align-content: left;
`;

const InfoContainer = styled.div`
  height: 2.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  left: 10%;

  .user-name {
    font-weight: 800;
    font-size: 1rem;
  }
  div {
    display: flex;
    img {
      height: 90%;
    }
    .location {
      font-size: 0.8rem;
    }
  }
`;

export default {
  Wrapper,
  Container,
  InfoContainer,
};
