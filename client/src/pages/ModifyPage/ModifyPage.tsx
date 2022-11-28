/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
// component
import TopBar from '../../components/TopBar/TopBar';
import NavBar from '../../components/NavBar/NavBar';
// api
import { patchCommentInfo } from '../../apis/api/commentApi';
// style
import S from './ModifyPageStyles';

interface PatchCommentData {
  commentId: number;
  userId: number;
}

interface ModfiyPageState {
  title: string;
  before: string;
  apiType: 'comment' | 'board';
  apiData?: PatchCommentData;
}

const ModifyPage = () => {
  const location = useLocation();
  const navigation = useNavigate();
  console.log(location);

  const { title, before, apiData }: ModfiyPageState = location.state
    ? (location.state as ModfiyPageState)
    : {
        title: '',
        before: '',
        apiType: 'comment',
      };

  console.log(title);
  const [content, setContent] = useState<string>(before);

  const disableBtn = () => {
    if (content === before) return true;
    if (content.length === 0) return true;
    return false;
  };

  const checkFuncComment = async () => {
    if (apiData)
      try {
        const data = await patchCommentInfo(
          apiData.commentId,
          apiData.userId,
          content,
        );
        if (data.statusCode === 200) navigation(-1);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
      }
  };

  return (
    <>
      <TopBar
        isBack
        isCheck
        title={title}
        backFunc={() => navigation(-1)}
        checkFunc={checkFuncComment}
        checkDisableFunc={disableBtn}
      />
      <S.Form>
        <label htmlFor="new-post-location">수정할 내용을 적어달라냥</label>
        <S.Textarea
          id="new-post-content"
          name="content"
          placeholder="에옹!"
          value={content}
          onChange={(event) => setContent(event.target.value)}
        />
      </S.Form>
      <NavBar />
    </>
  );
};

export default ModifyPage;
