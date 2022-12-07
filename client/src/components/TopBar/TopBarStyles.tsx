import styled from 'styled-components';

const Container = styled.div`
  width: calc(100% - 24px);
  height: calc(4rem - 18px);
  background-color: ${(props) => props.theme.palette.main};
  display: flex;
  flex-direction: row;
  padding: 9px 12px;
  justify-content: space-between;
  align-items: center;

  font-family: 'SF-Pro';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;

  p {
    margin: 0px;
    font-weight: 600;
    font-size: 20px;
    line-height: 24px;
    color: #ffffff;
  }
`;

const BackButton = styled.button`
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

const CheckButton = styled.button`
  width: 1.5rem;
  height: 1.5rem;
  border: none;
  padding: 0px;
  background-color: transparent;
  img {
    width: 100%;
    height: 100%;
  }

  &:enabled {
    img {
      filter: invert(35%) sepia(48%) saturate(3576%) hue-rotate(338deg)
        brightness(107%) contrast(100%);
    }
  }

  &:disabled {
    img {
      filter: invert(100%) sepia(100%) saturate(0%) hue-rotate(288deg)
        brightness(102%) contrast(102%);
    }
  }
`;

export default { Container, BackButton, CheckButton };
