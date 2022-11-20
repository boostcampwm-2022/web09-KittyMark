import styled from 'styled-components';

const NavBarContainer = styled.div`
  width: 100%;
  height: 4rem;
  background-color: ${(props) => props.theme.palette.main};
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  gap: 1rem;
`;

const NavBarIcon = styled.button`
  width: 2.25rem;
  height: 2.25rem;
  padding: 0px;
  border: 0px;
  background-color: transparent;
  cursor: pointer;

  img {
    width: 100%;
    height: 100%;
  }
`;

export { NavBarContainer, NavBarIcon };
