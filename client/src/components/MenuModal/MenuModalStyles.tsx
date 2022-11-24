import styled from 'styled-components';

const MenuModalContainer = styled.div<{ top: number; left: number }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;

  top: ${(props) => `${props.top}%`};
  left: ${(props) => `${props.left}%`};
  transform: translate(-10%, -50%);

  background-color: white;
  border-radius: 15px;
  padding: 0.5rem 1rem;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));

  button {
    cursor: pointer;
    font-family: 'Jua';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;

    height: 2rem;
    background-color: transparent;
    border: 0px;
    border-bottom: 1px lightgray solid;
    padding: 0px;
  }

  button:last-child {
    border-bottom: 0px;
  }
`;

export default MenuModalContainer;
