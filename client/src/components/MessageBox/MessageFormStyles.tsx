import styled from 'styled-components';

const Container = styled.div`
  width: calc(90% - 2rem);
  max-width: 28rem;
  height: 2rem;
  background-color: ${(props) => props.theme.palette.inner};
  border: 1px solid ${(props) => props.theme.palette.border};
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 1rem;
  padding: 1rem;

  display: flex;
  position: relative;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const Wrap = styled.div`
  width: calc(85% - 1.5rem);
  height: 2.5rem;
  background-color: ${(props) => props.theme.palette.back};
  border: 1px solid ${(props) => props.theme.palette.border};
  border-radius: 0.7rem;
  padding: 0px 0.75rem;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  input {
    width: 80%;
    background-color: transparent;
    border: none;

    font-family: 'SF-Pro';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 20px;

    &::placeholder {
      color: #9b9b9b;
    }
  }
`;

const SendBtn = styled.button`
  width: 1.25rem;
  height: 1.25rem;
  background-color: transparent;
  border: none;
  padding: 0px;

  cursor: pointer;

  img {
    width: 100%;
    height: 100%;
  }
`;

export default { Container, Wrap, SendBtn };
