import styled from 'styled-components';

const BoardMenuModal = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 15%;
  left: 70%;
  transform: translate(-10%, -50%);
  background-color: white;
  border-radius: 15px;
  padding: 0.5rem 1rem;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));

  button {
    height: 2rem;
    background-color: transparent;
    border: 0px;
    border-bottom: 1px lightgray solid;

    font-family: 'Jua';
    font-style: normal;
  }
  .last-content {
    border-bottom: 0px;
  }
`;

export default BoardMenuModal;
