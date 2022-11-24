import React, { useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from 'react-query';
// recoil
import { useRecoilValue } from 'recoil';
import user from '../../store/userAtom';
// api
import { getCommentInfo, postCommentInfo } from '../../apis/api/commentApi';
// style
import {
  CommentPageBody,
  CommentListContainer,
  CommentPageLoading,
} from './CommentPageStyles';
// component
import TopBar from '../../components/TopBar/TopBar';
import MessageForm from '../../components/MessageBox/MessageForm';
import NavBar from '../../components/NavBar/NavBar';
import CommentUnit from '../../components/CommentUnit/CommentUnit';
// type

// TODO custom hook 으로 빼낸다.
const CommentPage = () => {
  const { boardId } = useParams();
  const location = useLocation();
  const navigation = useNavigate();

  const userData = useRecoilValue(user);
  const [comment, setComment] = useState<string>(''); // 사용자 입력 정보 받아오기

  // TODO react-query 에러 처리 방식에 대해서 고민해볼 필요가 있다.
  const queryClient = useQueryClient();
  const { isLoading, data } = useQuery('comments', () =>
    getCommentInfo(Number(boardId)).then((res) => res.data.comments),
  );

  const { mutate } = useMutation(
    () => postCommentInfo(userData.userId, Number(boardId), comment, null),
    {
      onSuccess: () => queryClient.invalidateQueries('comments'),
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
        backFunc={() => navigation(location)}
      />
      <CommentPageBody>
        <MessageForm
          data={comment}
          onClickSendBtn={onClickSendBtn}
          setFunc={setComment}
        />
        <CommentListContainer>
          <div className="inner-container">
            {isLoading && <CommentPageLoading>Loading...</CommentPageLoading>}
            {!isLoading &&
              data &&
              data.map((commentData) => (
                <CommentUnit
                  key={commentData.commentId}
                  userName={commentData.userName}
                  createdAt={commentData.createdAt}
                  content={commentData.content}
                />
              ))}
          </div>
        </CommentListContainer>
      </CommentPageBody>
      <NavBar />
    </>
  );
};

export default CommentPage;
