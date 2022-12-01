import styled from 'styled-components';

const Body = styled.div`
  width: 100vw;
  height: calc(100vh - 12rem);

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  padding: 2rem 0rem;

  * {
    font-family: 'Jua';
    font-style: normal;
    font-weight: 400;
  }
`;

const ButtonContainer = styled.div`
  width: 90%;
  height: 3.25rem;
  border-radius: 2rem;
  border: 1px solid ${(props) => props.theme.palette.border};
  background-color: #ffffff;

  display: flex;
  flex-direction: row;
`;

const Button = styled.button<{ isOn: boolean }>`
  font-size: 16px;
  width: 50%;
  height: 100%;
  padding: 0px;
  border-radius: 2rem;
  border: 1px solid #ffffff;
  color: ${(props) => (props.isOn ? '#ffffff' : '#000000')};
  background: ${(props) => (props.isOn ? '#ff4646' : '#ffffff')};
`;

const UnitContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;

  width: 90%;
`;

export default { Body, ButtonContainer, Button, UnitContainer };
