import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { AxiosError } from 'axios';
import { useRecoilValue } from 'recoil';
// recoil
import user from '../../store/userAtom';
// api
import { getCommentInfo, postCommentInfo } from '../../apis/api/commentApi';
// style
import S from './CommentPageStyles';
// component
import TopBar from '../../components/TopBar/TopBar';
import MessageForm from '../../components/MessageBox/MessageForm';
import NavBar from '../../components/NavBar/NavBar';
import CommentUnit from '../../components/CommentUnit/CommentUnit';
// type
import { Comments, NewCommentApi } from '../../types/responseData';
// util
import timeCalc from '../../utils/timeCalc';

// TODO custom hook 으로 빼낸다.
const CommentPage = () => {
  const { boardId } = useParams();
  const navigation = useNavigate();

  const userData = useRecoilValue(user);
  const [comment, setComment] = useState<string>(''); // 사용자 입력 정보 받아오기
  const [modal, setModal] = useState<number>(-1);

  // TODO react-query 에러 처리 방식에 대해서 고민해볼 필요가 있다.
  const queryClient = useQueryClient();
  const { isLoading, isError, data, error } = useQuery<Comments[], AxiosError>(
    'comments',
    () => getCommentInfo(Number(boardId)).then((res) => res.data.comments),
  );

  const { mutate } = useMutation<NewCommentApi, AxiosError>(
    () => postCommentInfo(userData.userId, Number(boardId), comment, null),
    {
      onSuccess: () => queryClient.invalidateQueries('comments'),
      // eslint-disable-next-line no-console
      onError: (e) => console.log(e.message),
    },
  );

  const onClickSendBtn = async () => {
    mutate();
    setComment('');
  };

  return (
    <>
      <TopBar
        isBack
        title="댓글"
        isCheck={false}
        backFunc={() => navigation(-1)}
      />
      <S.Body>
        <MessageForm
          data={comment}
          onClickSendBtn={onClickSendBtn}
          setFunc={setComment}
        />
        <S.Container>
          <div className="inner-container">
            {isLoading && <S.Status>Loading...</S.Status>}
            {isError && <S.Status>{error.message}</S.Status>}
            {!(isError || isLoading) &&
              data &&
              data.map((commentData) => (
                <CommentUnit
                  key={commentData.id}
                  boardId={Number(boardId)}
                  commentId={commentData.id}
                  userName={commentData.user.name}
                  createdAt={timeCalc(commentData.createdAt)}
                  content={commentData.content}
                  userProfile={
                    commentData.user.profileUrl === ''
                      ? '../../defaultProfile.svg'
                      : commentData.user.profileUrl
                  }
                  isModal={modal === commentData.id}
                  setModal={setModal}
                />
              ))}
          </div>
        </S.Container>
      </S.Body>
      <NavBar />
    </>
  );
};

export default CommentPage;
