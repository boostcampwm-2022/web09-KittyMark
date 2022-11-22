import React, { useEffect, useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
// recoil
import { useRecoilValue } from 'recoil';
import user from '../../store/userAtom';
// api
import { getCommentInfo, postCommentInfo } from '../../apis/api/commentApi';
// style
import { CommentPageBody, CommentListContainer } from './CommentPageStyles';
// component
import TopBar from '../../components/TopBar/TopBar';
import MessageForm from '../../components/MessageBox/MessageForm';
import NavBar from '../../components/NavBar/NavBar';
import CommentUnit from '../../components/CommentUnit/CommentUnit';
// type
import { Comments } from '../../types/responseData';

// TODO react-query 를 활용해서 해당 부분을 custom hook 으로 빼낸다.
const CommentPage = () => {
  const { boardId } = useParams(); // url 에서 board 정보
  const location = useLocation();
  const navigation = useNavigate();

  // TODO userData 내부의 userId 가 필요한데 이는 로그인 때 받아와야 한다.
  const userData = useRecoilValue(user);
  const [comment, setComment] = useState<string>(''); // 사용자 입력 정보 받아오기
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [commentList, setCommentList] = useState<Comments[]>([]);

  useEffect(() => {
    const getFunc = async () => {
      let data: Comments[] = [];
      if (boardId)
        data = await getCommentInfo(Number(boardId)).then(
          (result) => result.comments,
        );
      setCommentList(data);
    };
    try {
      getFunc();
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  }, []);

  const onClickSendBtn = () => {
    if (boardId)
      try {
        postCommentInfo(userData.userId, Number(boardId), comment, null);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
      }
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
            {commentList &&
              commentList.map((commentData) => (
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
