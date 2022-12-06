import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// recoil
import { useRecoilValue } from 'recoil';
import user from '../../../store/userAtom';
// style
import {
  BoardHeaderWrapper,
  BoardHeaderContainer,
  BoardHeaderInfoContainer,
} from './BoardHeaderStyles';
// img
import pinIcon from '../../../static/pinIcon.svg';
import menuButton from '../../../static/menuBtn.svg';
// component
import MenuModal from '../../MenuModal/MenuModal';
// API
import { deleteBoardData } from '../../../apis/api/boardApi';
import ProfileIcon from '../../ProfileIcon/ProfileIcon';

interface BoardHeaderProps {
  userId: number;
  boardId: number;
  userProfile: string;
  userName: string;
  isStreet: boolean;
  location: string | '';
  content: string;
}

const BoardHeader = (props: BoardHeaderProps) => {
  const navigation = useNavigate();
  const {
    userId,
    boardId,
    userProfile,
    userName,
    isStreet,
    location,
    content,
  } = props;
  const [menuHideOption, setMenuHideOption] = useState(true);
  const userData = useRecoilValue(user);
  const loginedUserId = userData.userId;

  const onClickMenu = () => {
    setMenuHideOption(!menuHideOption);
  };

  const onClickModify = async () => {
    navigation('/modify', {
      state: {
        title: '게시글 수정',
        before: content,
        apiType: 'board',
        apiData: {
          boardId,
          userId,
        },
      },
    });
  };

  const onClickDelete = async () => {
    try {
      const data = await deleteBoardData(boardId, userId);
      if (data.statusCode === 200) {
        setMenuHideOption(!menuHideOption);
        window.location.replace('/home');
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };

  const onClickUserInfo = () => {
    navigation(`/user/${userName}`, { state: { targetId: userId } });
  };

  return (
    <>
      <BoardHeaderWrapper>
        <BoardHeaderContainer onClick={onClickUserInfo}>
          <ProfileIcon
            targetId={userId}
            userName={userName}
            userProfile={userProfile}
          />
          <BoardHeaderInfoContainer>
            <div className="user-name">{userName}</div>
            {isStreet === true ? (
              <div>
                <img src={pinIcon} alt="pin icon" />
                {location !== null && location.length > 0 ? (
                  <div className="location">{location}</div>
                ) : null}
              </div>
            ) : (
              ''
            )}
          </BoardHeaderInfoContainer>
        </BoardHeaderContainer>
        {loginedUserId === userId ? (
          <button type="button" onClick={onClickMenu}>
            <img src={menuButton} alt="Create/Delete DropDown" />
          </button>
        ) : null}
      </BoardHeaderWrapper>
      {menuHideOption ? null : (
        <MenuModal
          top={15}
          left={75}
          onClickCancel={() => setMenuHideOption(!menuHideOption)}
          onClickModify={onClickModify}
          onClickDelete={onClickDelete}
        />
      )}
    </>
  );
};
export default BoardHeader;
