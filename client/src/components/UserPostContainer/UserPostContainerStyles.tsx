import styled from 'styled-components';

const StatusWrap = styled.div`
  width: 85%;
  height: 50%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  font-size: 20px;
`;

const Grid = styled.div`
  width: 85%;
  display: grid;
  justify-content: center;
  grid-template-columns: repeat(3, 6.25rem);
  gap: 0.75rem;
`;

const GridSlot = styled.button`
  cursor: pointer;
  width: 6.25rem;
  height: 6.25rem;
  padding: 0px;
  border: none;
  border-radius: 1.25rem;
  background-color: #ffffff;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border: 1px solid ${(props) => props.theme.palette.border};
    border-radius: 1.25rem;
  }
`;

export default {
  StatusWrap,
  Grid,
  GridSlot,
};
