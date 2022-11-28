import React, { useState, useCallback } from 'react';
// type
import { Images } from '../types/imageData';

const useImages = (
  init: Images,
): {
  images: Images;
  onChangeImage: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onDeleteImage: (index: number) => void;
} => {
  const [images, setImages] = useState<Images>(init);

  const onChangeImage = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.currentTarget.files) {
        Array.from(event.currentTarget.files).forEach((file) => {
          if (images.images.length < 10)
            setImages((prev) => {
              const newImages = prev.images.concat(file);
              return { ...prev, images: newImages };
            });

          const reader = new FileReader();
          reader.onloadend = () => {
            const base64 = reader.result;
            if (base64)
              setImages((prev) => {
                const newImages64 = prev.image64.concat(base64.toString());
                return { ...prev, image64: newImages64 };
              });
          };
          reader.readAsDataURL(file);
        });
      }
    },
    [],
  );

  const onDeleteImage = useCallback((index: number) => {
    setImages((prev) => {
      const newImages = prev.images.filter((_, idx) => idx !== index);
      const newImages64 = prev.image64.filter((_, idx) => idx !== index);
      return { images: newImages, image64: newImages64 };
    });
  }, []);

  return { images, onChangeImage, onDeleteImage };
};

export default useImages;
