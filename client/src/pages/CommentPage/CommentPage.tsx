import React, { Suspense, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { AxiosError } from 'axios';
import { useRecoilValue } from 'recoil';
// type
import { Comments, NewCommentApi } from '../../types/responseData';
// recoil
import user from '../../store/userAtom';
// util
import timeCalc from '../../utils/timeCalc';
// api
import { getCommentInfo, postCommentInfo } from '../../apis/api/commentApi';
// style
import S from './CommentPageStyles';
// component
import TopBar from '../../components/TopBar/TopBar';
import MessageForm from '../../components/MessageBox/MessageForm';
import NavBar from '../../components/NavBar/NavBar';
import CommentUnit from '../../components/CommentUnit/CommentUnit';
import ErrorBoundary from '../../components/ErrorBoundary/ErrorBoundary';

const CommentPage = () => {
  const { boardId } = useParams();
  const navigation = useNavigate();

  const userData = useRecoilValue(user);
  const [comment, setComment] = useState<string>('');
  const [modal, setModal] = useState<number>(-1);

  const queryClient = useQueryClient();
  const { data, error } = useQuery<Comments[], AxiosError>(
    'comments',
    () => getCommentInfo(Number(boardId)).then((res) => res.data.comments),
    { suspense: true },
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
        <S.Container>
          <div className="inner-container">
            <Suspense fallback={<S.Status>Loading...</S.Status>}>
              <ErrorBoundary
                fallback={<S.Status>{error ? error.message : ''}</S.Status>}
              >
                {data &&
                  data.map((commentData) => (
                    <CommentUnit
                      key={commentData.id}
                      boardId={Number(boardId)}
                      commentId={commentData.id}
                      targetId={commentData.user.id}
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
              </ErrorBoundary>
            </Suspense>
          </div>
        </S.Container>
        <MessageForm
          targetId={userData.userId}
          data={comment}
          onClickSendBtn={onClickSendBtn}
          setFunc={setComment}
        />
      </S.Body>
      <NavBar />
    </>
  );
};

export default CommentPage;
