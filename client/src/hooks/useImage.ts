import React, { useState, useCallback } from 'react';
// type
import Image from '../types/image';

const useImage = (
  init: Image,
): {
  image: Image;
  onChangeImage: (event: React.ChangeEvent<HTMLInputElement>) => void;
} => {
  const [image, setImage] = useState<Image>(init);

  const onChangeImage = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.currentTarget.files) {
        const file = event.currentTarget.files;
        setImage((prev) => ({ ...prev, image: file[0] }));
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64 = reader.result;
          if (base64) setImage((prev) => ({ ...prev, image64: base64 }));
        };
        reader.readAsDataURL(file[0]);
      }
    },
    [],
  );

  return { image, onChangeImage };
};

export default useImage;
