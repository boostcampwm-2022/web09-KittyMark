import React, { MouseEventHandler } from 'react';
// style
import S from './MessageFormStyles';
// component
import ProfileIcon from '../ProfileIcon/ProfileIcon';
// img
import sendBtn from '../../static/sendBtn.svg';

interface MessageFormProps {
  targetId: number;
  userProfile: string;
  data: string;
  onClickSendBtn: MouseEventHandler<HTMLElement>;
  setFunc: React.Dispatch<React.SetStateAction<string>>;
}

// 공통으로 DM 과 댓글에서 사용 가능하게 생성했다.
const MessageForm = ({
  targetId,
  userProfile,
  data,
  onClickSendBtn,
  setFunc,
}: MessageFormProps) => {
  return (
    <S.Container>
      <ProfileIcon
        targetId={targetId}
        userName="hello"
        userProfile={userProfile || '../../defaultProfile.svg'}
      />
      <S.Wrap>
        <input
          type="text"
          value={data}
          placeholder="집사의 말을 입력하라 냥!"
          onChange={(event) => setFunc(event.target.value)}
        />
        <S.SendBtn type="button" onClick={onClickSendBtn}>
          <img src={sendBtn} alt="Send Button" />
        </S.SendBtn>
      </S.Wrap>
    </S.Container>
  );
};

export default MessageForm;
