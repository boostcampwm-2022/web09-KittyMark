import { atom } from 'recoil';

const userProfile = atom<string>({
  key: 'userProfile',
  default: '',
});

export default userProfile;
