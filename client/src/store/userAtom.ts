import { atom } from 'recoil';

const user = atom({
  key: 'user',
  default: {
    userId: 0,
  },
});

export default user;
