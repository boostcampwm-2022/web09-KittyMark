import styled from 'styled-components';

const BoardHeaderWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;

  button {
    background-color: transparent;
    border: 0px;
  }
`;
const BoardHeaderContainer = styled.div`
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
const BoardHeaderInfoContainer = styled.div`
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

export {
  BoardHeaderWrapper,
  BoardHeaderContainer,
  UserProfileImageContainer,
  BoardHeaderInfoContainer,
};
