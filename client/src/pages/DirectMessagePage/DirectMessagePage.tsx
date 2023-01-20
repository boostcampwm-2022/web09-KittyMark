import React, { useContext, useEffect, useRef, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { AxiosError } from 'axios';
// recoil
import user from '../../store/userAtom';
// style
import S from './DirectMessagePageStyles';
// component
import TopBar from '../../components/TopBar/TopBar';
import NavBar from '../../components/NavBar/NavBar';
import MessageForm from '../../components/MessageBox/MessageForm';
import DirectMessage from '../../components/DirectMessage/DirectMessage';
// socket
import { SocketContext } from '../../store/SocketContext';
// import { isReadable } from 'stream';
// api
import { getDirectMessages, patchLastSeenDm } from '../../apis/api/dmApi';
// type
import {
  DirectMessageData,
  DirectMessageDataApi,
} from '../../types/responseData';

/*
  구현할 내용
  1. DM 상대 userName과 프로필  
    - 프로필 클릭시 해당 유저의 페이지로 이동
  2. 메시지를 보여줄때 내 메시지는 오른쪽, 상대 메시지는 왼쪽에 붙여 표시
  3. Optimistic Update를 이용하여 메시지 전송 업데이트
    - 서버에서 정상적으로 메시지를 수신하기 전까지 회색의 메시지로 보여줌
    - 서버에서 정상적으로 메시지를 수신했다는 응답이 오면 검은색으로 진하게 표시
    - 만약 서버에서 에러가 발생하는 경우, 재전송 버튼을 함께 달아줌
  4. 채팅방에 들어오거나 새로고침시 항상 가장 아래(최신) 메시지를 볼 수 있도록 useRef 이용
*/

interface MessageData {
  isReceived: boolean;
  message: string;
  profileUrl: string;
  messageId: string;
}

interface ChatResponse {
  messageId: string;
  isSaved: boolean;
}

const makeDmComponent = (messages: MessageData[]) => {
  return messages.map((message, index) => {
    return DirectMessage(message, index);
  });
};

const DirectMessagePage = () => {
  // socket test
  const socket = useContext(SocketContext);
  //
  const navigation = useNavigate();
  const { senderName, senderId } = useParams();
  const otherUserId = Number(senderId);
  const { state } = useLocation();
  const messageQue = useRef<number[]>([]);
  const [roomId, setRoomId] = useState(state.roomId ? state.roomId : -1);
  const { userId, userProfileUrl } = useRecoilValue(user);
  const { data: prevData } = useQuery<DirectMessageDataApi, AxiosError>(
    ['prevMessages'],
    () => {
      return getDirectMessages(userId, otherUserId, 1000, '-1', roomId);
    },
  );
  const [message, setMessage] = useState<string>('');
  const [messageList, setMessageList] = useState<MessageData[]>([]);

  const updateMessageList = (
    isReceived: boolean,
    content: string,
    messageId: string,
  ) => {
    setMessageList((prev) => [
      ...prev,
      {
        isReceived,
        message: content,
        profileUrl: '../../../public/defaultProfile.svg',
        messageId,
      },
    ]);
  };

  const onReceivedMessage = (data: { messageId: string; content: string }) => {
    // eslint-disable-next-line no-console
    const { messageId, content } = data;
    // eslint-disable-next-line no-console
    console.log(content);
    updateMessageList(true, content, messageId);
  };

  const onClickSendMessage = () => {
    // TODO: Socket 서버에 메시지 전달
    if (message.length === 0) return;
    const data = {
      sender: userId,
      receiver: otherUserId,
      dmRoomId: roomId,
      content: message,
      requestId: messageList.length,
    };
    socket.emit('chat', data);
    updateMessageList(false, message, '');
    messageQue.current.push(messageList.length);
    setMessage('');
  };

  // TODO: 올바르지 않은 유저 이름일 경우 예외 처리 필요
  if (!senderName) return null;

  const exitPage = async () => {
    if (messageList.length === 0) return;
    try {
      await patchLastSeenDm(
        roomId,
        userId,
        messageList[messageList.length - 1].messageId,
      );
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
    }
  };

  // 테스트
  const onReceiveMessageId = (data: ChatResponse) => {
    const { messageId, isSaved } = data;
    if (!isSaved) return;

    const targetMessageIdx = messageQue.current[0];
    setMessageList((prev) => {
      const newMessageList = [...prev];
      newMessageList[targetMessageIdx].messageId = messageId;
      return newMessageList;
    });
    messageQue.current.shift();
  };
  //

  // 메시지를 받을 때마다

  useEffect(() => {
    if (!prevData) return;
    setRoomId(prevData.data.dmRoomId);
    if (prevData.data.messages.length === 0) return;

    const prevMessageList = prevData.data.messages.map(
      (msg: DirectMessageData) => {
        return {
          isReceived: msg.sender === otherUserId,
          message: msg.content,
          profileUrl: '../../../public/defaultProfile.svg',
          messageId: msg.id,
        };
      },
    );
    setMessageList(prevMessageList);
  }, [prevData]);

  useEffect(() => {
    socket.emit('init', { userId });
    socket.on('MESSAGE', onReceivedMessage);
    socket.on('chatResponse', onReceiveMessageId);

    return () => {
      socket.off('MESSAGE', onReceivedMessage);
      socket.off('chatResponse');
      exitPage();
    };
  }, [socket, userId]);

  return (
    <>
      <TopBar
        isBack
        title={senderName}
        isCheck={false}
        backFunc={() => navigation(-1)}
      />
      <S.Body>
        <S.MessageWrapper>
          <S.Container>{makeDmComponent(messageList)}</S.Container>
          <div className="container-bottom" />
        </S.MessageWrapper>
        <MessageForm
          targetId={userId}
          userProfile={userProfileUrl}
          data={message}
          onClickSendBtn={onClickSendMessage}
          setFunc={setMessage}
        />
      </S.Body>
      <NavBar />
    </>
  );
};

export default DirectMessagePage;
