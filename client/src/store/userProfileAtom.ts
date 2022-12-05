import { atom } from 'recoil';

const userProfile = atom({
  key: 'userProfile',
  default: '',
});

export default userProfile;
