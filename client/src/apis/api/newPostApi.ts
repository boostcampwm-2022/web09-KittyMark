import { AxiosResponse } from 'axios';
import { defaultFormInstance } from '../utils';
// type
import { NewPostApi } from '../../types/responseData';

const postNewPostInfo = async (
  userId: number,
  images: File[],
  content: string,
  isStreet: boolean,
  location?: string,
  latitude?: number,
  longitude?: number,
): Promise<NewPostApi> => {
  const formData = new FormData();
  formData.append('userId', String(userId));
  images.forEach((image) => formData.append('images', image));
  formData.append('content', content);
  formData.append('isStreet', String(isStreet));
  formData.append('location', location || '');
  formData.append('latitude', latitude ? String(latitude) : '-1');
  formData.append('longitude', longitude ? String(longitude) : '-1');

  const { data }: AxiosResponse<NewPostApi> = await defaultFormInstance.post(
    `/api/board`,
    formData,
  );
  return data;
};

export default postNewPostInfo;
