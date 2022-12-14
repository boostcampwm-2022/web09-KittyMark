import styled from 'styled-components';

const Body = styled.div`
  width: 100vw;
  height: calc(100vh - 10rem);

  padding: 1rem 0px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

const MessageWrapper = styled.div`
  width: 90vw;
  max-width: 30rem;
  height: calc((100vh - 10rem) / 10 * 8.5);
  background-color: ${(props) => props.theme.palette.inner};
  border-radius: 1rem;
  border: 1px solid ${(props) => props.theme.palette.border};
  display: flex;
  align-items: center;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
`;

const Container = styled.div`
  margin: auto;
  width: calc(92% - 1rem);
  height: calc(95% - 1rem);
  padding: 1rem 1rem;
  background-color: ${(props) => props.theme.palette.back};
  border-radius: 0.7rem;

  display: flex;
  flex-direction: column;
  gap: 1rem;
  justify-content: flex-start;
  overflow-y: auto;
`;

export default { Body, MessageWrapper, Container };
