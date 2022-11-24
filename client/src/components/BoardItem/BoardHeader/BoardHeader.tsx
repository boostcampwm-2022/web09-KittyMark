import React, { useState } from 'react';
import {
  BoardHeaderWrapper,
  BoardHeaderContainer,
  UserProfileImageContainer,
  BoardHeaderInfoContainer,
} from './BoardHeaderStyles';
// img
import pinIcon from '../../../static/pinIcon.svg';
import menuButton from '../../../static/menuBtn.svg';
import BoardMenu from '../BoardMenu/BoardMenu';

interface BoardHeaderProps {
  userId: number;
  boardId: string;
  userProfile: string;
  userName: string;
  isStreet: boolean;
  location: string | null;
}

const BoardHeader = (props: BoardHeaderProps) => {
  const { userId, boardId, userProfile, userName, isStreet, location } = props;
  const [menuHideOption, setMenuHideOption] = useState(true);

  const onClickMenu = () => {
    setMenuHideOption(!menuHideOption);
  };

  const onClickUserInfo = () => {
    /* TODO: 해당 유저 페이지로 이동 */
  };

  return (
    <>
      <BoardHeaderWrapper>
        <BoardHeaderContainer onClick={onClickUserInfo}>
          <UserProfileImageContainer>
            <img src={userProfile} alt="user profile" />
          </UserProfileImageContainer>
          <BoardHeaderInfoContainer>
            <div className="user-name">{userName}</div>
            {isStreet === true ? (
              <div>
                <img src={pinIcon} alt="pin icon" />
                <div className="location">{location}</div>
              </div>
            ) : (
              ''
            )}
          </BoardHeaderInfoContainer>
        </BoardHeaderContainer>
        <button type="button" onClick={onClickMenu}>
          <img src={menuButton} alt="Create/Delete DropDown" />
        </button>
      </BoardHeaderWrapper>
      {menuHideOption ? null : (
        <BoardMenu
          userId={userId}
          boardId={boardId}
          changeHideOption={onClickMenu}
        />
      )}
    </>
  );
};
export default BoardHeader;
