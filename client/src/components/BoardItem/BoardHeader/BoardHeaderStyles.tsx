import styled from 'styled-components';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;

  button {
    background-color: transparent;
    border: 0px;
  }
`;
const Container = styled.div`
  margin: 3%;
  width: auto;
  display: flex;
  align-content: left;
`;
const UserProfileImageContainer = styled.div`
  width: 2.25rem;
  height: 2.25rem;
  border: 2px #ffc700 solid;
  border-radius: 20px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 20px;
  }
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
  UserProfileImageContainer,
  InfoContainer,
};
