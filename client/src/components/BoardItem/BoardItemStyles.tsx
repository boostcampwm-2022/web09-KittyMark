import styled from 'styled-components';

const BoardBackground = styled.div`
  margin-top: 5%;
  padding-bottom: 3%;
  max-width: 800px;
  width: 93%;
  border-radius: 15px;
  background-color: ${(props) => props.theme.palette.main};
  display: flex;
  flex-direction: column;
  align-items: center;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
`;

export default BoardBackground;
