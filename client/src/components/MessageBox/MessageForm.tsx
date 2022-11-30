import React, { MouseEventHandler } from 'react';
// component
import ProfileIcon from '../ProfileIcon/ProfileIcon';
// style
import {
  SendMessageContainer,
  MessageFormWrap,
  SendBtn,
} from './MessageFormStyles';
// img
import sendBtn from '../../static/sendBtn.svg';

interface MessageFormProps {
  targetId: number;
  data: string;
  onClickSendBtn: MouseEventHandler<HTMLElement>;
  setFunc: React.Dispatch<React.SetStateAction<string>>;
}

// 공통으로 DM 과 댓글에서 사용 가능하게 생성했다.
const MessageForm = ({
  targetId,
  data,
  onClickSendBtn,
  setFunc,
}: MessageFormProps) => {
  return (
    <SendMessageContainer>
      <ProfileIcon
        targetId={targetId}
        userName="hello"
        userProfile="../../defaultProfile.svg"
      />
      <MessageFormWrap>
        <input
          type="text"
          value={data}
          placeholder="집사의 말을 입력하라 냥!"
          onChange={(event) => setFunc(event.target.value)}
        />
        <SendBtn type="button" onClick={onClickSendBtn}>
          <img src={sendBtn} alt="Send Button" />
        </SendBtn>
      </MessageFormWrap>
    </SendMessageContainer>
  );
};

export default MessageForm;
