import styled from 'styled-components';

const Body = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  background: ${(props) => props.theme.palette.back};
  z-index: 999;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Text = styled.p`
  margin: 0px;
  padding-top: 5%;
  font-family: 'SF-Pro';
  font-weight: 500;
  font-size: 18px;
  line-height: 21px;
`;

export default { Body, Text };
