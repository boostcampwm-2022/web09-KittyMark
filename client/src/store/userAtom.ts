import { atom } from 'recoil';

const user = atom({
  key: 'user',
  default: {
    userId: 1,
  },
});

export default user;
