import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
// recoil
import user from '../../store/userAtom';
// component
import NavBar from '../../components/NavBar/NavBar';
import TopBar from '../../components/TopBar/TopBar';
import DmListContainer from '../../components/DmListContainer/DmListContainer';

const DmListPage = () => {
  const navigation = useNavigate();

  const { userId, userName } = useRecoilValue(user);

  useEffect(() => {
    if (!userName || !userId) navigation('/');
  }, []);

  return (
    <>
      <TopBar isBack={false} title="다이렉트 메시지" isCheck={false} />
      <DmListContainer userId={Number(userId)} userName={userName} />
      <NavBar />
    </>
  );
};

export default DmListPage;
