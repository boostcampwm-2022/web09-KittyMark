import { AxiosResponse } from 'axios';
import { defaultFormInstance } from '../utils';
// type
import { NewPostApi } from '../../types/responseData';

const postNewPostInfo = async (
  userId: number,
  images: File[],
  content: string,
  isStreet: boolean,
  location: string | null,
  latitude: number | null,
  longitude: number | null,
) => {
  const formData = new FormData();
  formData.append('userId', String(userId));
  images.forEach((image) => formData.append('images', image));
  formData.append('content', content);
  formData.append('isStreet', String(isStreet));
  formData.append('location', location || '');
  formData.append('latitude', latitude ? String(latitude) : '');
  formData.append('longitude', longitude ? String(longitude) : '');
  const { data }: AxiosResponse<NewPostApi> = await defaultFormInstance.post(
    `/api/board`,
    { userId, images, content, isStreet, location, latitude, longitude },
  );
  return data;
};

export default postNewPostInfo;
