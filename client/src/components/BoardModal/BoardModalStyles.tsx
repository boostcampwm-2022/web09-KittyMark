import styled from 'styled-components';

const Container = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 1000;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(1px);
`;

const Background = styled.div`
  padding: auto;
  position: fixed;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  animation: modal-show 1s;
  @keyframes modal-show {
    from {
      opacity: 0;
      margin-top: -50px;
    }
    to {
      opacity: 1;
      margin-top: 0;
    }
  }

  .button-wrapper {
    padding-left: 3%;
    button {
      border: 0px;
      background-color: transparent;
    }
  }
`;

const InnerContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

export default { Container, Background, InnerContainer };
