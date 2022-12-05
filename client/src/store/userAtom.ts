import { atom, AtomEffect } from 'recoil';

const localStorageEffect: <T>(key: string) => AtomEffect<T> =
  (key: string) =>
  ({ setSelf, onSet }) => {
    const savedValue = localStorage.getItem(key);
    if (savedValue != null) {
      setSelf(JSON.parse(savedValue));
    }
    onSet((newValue, _, isReset) =>
      isReset
        ? localStorage.removeItem(key)
        : localStorage.setItem(key, JSON.stringify(newValue)),
    );
  };

const user = atom({
  key: 'user',
  default: {
    userId: -1,
    userName: '',
  },
  effects: [localStorageEffect('user')],
});

export default user;
