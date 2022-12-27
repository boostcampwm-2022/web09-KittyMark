import styled from 'styled-components';

const Body = styled.div`
  width: 100vw;
  height: calc(100vh - 10rem);

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  padding: 1rem 0rem;

  * {
    font-family: 'SF-Pro';
    font-style: normal;
    font-weight: 400;
  }
`;

const UnitContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;

  width: 100%;
  max-width: 35rem;

  div:not(:last-of-type) {
    padding-bottom: 0.5rem;
    border-bottom: 1px solid ${(props) => props.theme.palette.border};
  }
`;

export default { Body, UnitContainer };
