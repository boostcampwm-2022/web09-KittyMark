import styled from 'styled-components';

const Container = styled.div`
  position: absolute;
  width: 100%;
  height: calc(var(--vh, 1vh) * 100);
  z-index: 100;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(1px);
`;

const Background = styled.div`
  padding: auto;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const MapWrapper = styled.div`
  width: 95%;
  height: 90%;
  background-color: white;
  display: flex;
  justify-content: center;
  border: 1px lightgray solid;
  border-radius: 10px;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
`;

const NaverMap = styled.div`
  width: 100%;
  height: 100%;

  #map {
    border-radius: 10px;
  }
`;

const Wrapper = styled.div`
  width: 100vw;
  height: 8%;
  position: absolute;
  z-index: 1001;
  bottom: 5%;
  display: flex;
  justify-content: center;
`;

const WindowContainer = styled.div`
  width: 90%;
  height: 95%;
  display: flex;
  justify-content: space-between;
`;

const InfoWindowWrapper = styled.div`
  width: 75%;
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;

  background-color: ${(props) => props.theme.palette.inner};
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  border: 1px solid ${(props) => props.theme.palette.border};
  border-radius: 10px;
`;

const InfoWindow = styled.div`
  margin-top: 1%;
  font-weight: 600;
`;

const ButtonWrapper = styled.div`
  width: 15%;
  max-width: 100%;
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;

  background-color: ${(props) => props.theme.palette.inner};
  border: 1px solid ${(props) => props.theme.palette.border};
  border-radius: 10px;

  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
`;

const SubmitButton = styled.button`
  background-color: transparent;
  border: 0px;

  img {
    width: 80%;
    height: 80%;
  }
`;

export default {
  Container,
  Background,
  MapWrapper,
  NaverMap,
  Wrapper,
  WindowContainer,
  InfoWindowWrapper,
  InfoWindow,
  ButtonWrapper,
  SubmitButton,
};
