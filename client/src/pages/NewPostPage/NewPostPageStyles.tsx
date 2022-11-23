import styled from 'styled-components';

const NewPostFrom = styled.form`
  width: calc(100% - 2rem);
  height: calc(100vh - 10rem);
  display: flex;
  flex-direction: column;
  padding: 1rem;
  gap: 1rem;
  justify-content: flex-start;
  align-items: flex-start;

  font-family: 'Jua';
  font-style: normal;
  font-weight: 400;
`;

const NewPostImageContainer = styled.div`
  display: flex;
  flex-direction: row;
  height: 5.5rem;
  width: 100%;
  gap: 1rem;
  overflow-x: auto;
  overflow-y: hidden;
  white-space: nowrap;
  align-items: flex-end;

  .add-btn {
    min-width: 4.75rem;
    min-height: 4.75rem;
    border: 1px solid ${(props) => props.theme.palette.border};
    border-radius: 0.5rem;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;

    p {
      margin: 0px;
    }
  }
`;

const NewPostCategoryButton = styled.button<{ checked: boolean }>`
  width: 8rem;
  height: 2rem;
  border-radius: 0.5rem;
  border: 1px solid #7e7656;
  margin-right: 1rem;

  font-family: 'Jua';
  font-style: normal;
  font-weight: 400;

  color: ${(props) => (props.checked ? '#ffffff' : '#000000')};
  background-color: ${(props) =>
    props.checked ? props.theme.palette.main : '#d8d8d8'};
`;

const NewPostTextarea = styled.textarea`
  width: calc(100% - 2rem);
  height: 10rem;
  background-color: ${(props) => props.theme.palette.inner};
  border: 1px solid #7e7656;
  border-radius: 2rem;
  padding: 1rem;

  resize: none;

  font-family: 'Jua';
  font-style: normal;
  font-weight: 400;
`;

export {
  NewPostFrom,
  NewPostImageContainer,
  NewPostCategoryButton,
  NewPostTextarea,
};
