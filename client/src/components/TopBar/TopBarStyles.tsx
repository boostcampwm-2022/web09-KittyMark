import styled from 'styled-components';

const TopBarContainer = styled.div`
  width: calc(100% - 24px);
  height: calc(4rem - 18px);
  background-color: ${(props) => props.theme.palette.main};
  display: flex;
  flex-direction: row;
  padding: 9px 12px;
  justify-content: space-between;
  align-items: center;

  font-family: 'Jua';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;

  p {
    margin: 0px;
    font-size: 18px;
    line-height: 22px;
    color: #ffffff;
  }
`;

const TopBarButton = styled.button`
  width: 1.5rem;
  height: 1.5rem;
  border: none;
  padding: 0px;
  background-color: transparent;
  img {
    width: 100%;
    height: 100%;
  }
`;

export { TopBarContainer, TopBarButton };
