import styled from 'styled-components';

const Body = styled.div`
  width: 100vw;
  height: calc(100vh - 10rem);
  padding: 1rem 0rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  gap: 2rem;

  overflow-y: auto;

  font-family: 'Jua';
  font-style: normal;
  font-weight: 400;
`;

const OuterContainer = styled.div`
  width: calc(85% - 3rem);
  height: calc(7.5rem - 2rem);
  padding: 1rem 1.5rem;

  background-color: ${(props) => props.theme.palette.inner};
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 2rem;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const InnerContainerWrap = styled.div`
  width: 70%;
  height: 100%;
`;

const Name = styled.p`
  font-size: 20px;
  line-height: 30px;

  margin-top: 0px;
  margin-bottom: 1rem;
`;

const InnerContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const CountSlot = styled.div`
  p:first-child {
    margin-bottom: 0.5rem;
  }
  p {
    text-align: center;
    margin: 0px;
  }
`;

const Grid = styled.div`
  width: 85%;
  display: grid;
  grid-template-columns: repeat(3, 6.25rem);
  gap: 0.75rem;
`;

const GridSlot = styled.button`
  cursor: pointer;
  width: 6.25rem;
  height: 6.25rem;
  border: 1px solid ${(props) => props.theme.palette.border};
  border-radius: 1.25rem;
  background-color: #ffffff;
`;

export default {
  Body,
  OuterContainer,
  InnerContainerWrap,
  Name,
  InnerContainer,
  CountSlot,
  Grid,
  GridSlot,
};
