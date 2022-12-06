import { atom } from 'recoil';
import { Board } from '../types/responseData';

const boardDetail = atom<Board>({
  key: 'boardDetail',
  default: {
    id: '-1',
    content: '',
    isStreet: false,
    like: 0,
    comment: 0,
    createdAt: '',
    location: '',
    coordinate: [0, 0],
    photos: [{ url: '' }],
    user: {
      id: 0,
      name: '',
      profileUrl: '',
    },
  },
});

export default boardDetail;
