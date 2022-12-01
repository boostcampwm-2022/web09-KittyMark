import { AxiosResponse } from 'axios';
import { defaultFormInstance } from '../utils';
// type
import { NewPostApi } from '../../types/responseData';

export interface NewPostBody {
  userId: number;
  images: File[];
  content: string;
  isStreet: boolean;
  location?: string;
  latitude?: number;
  longitude?: number;
}

const postNewPostInfo = async (body: NewPostBody): Promise<NewPostApi> => {
  const formData = new FormData();
  formData.append('userId', String(body.userId));
  body.images.forEach((image) => formData.append('images', image));
  formData.append('content', body.content);
  formData.append('isStreet', String(body.isStreet));
  if (body.location && body.latitude && body.longitude) {
    formData.append('location', body.location);
    formData.append('latitude', String(body.latitude));
    formData.append('longitude', String(body.longitude));
  }

  const { data }: AxiosResponse<NewPostApi> = await defaultFormInstance.post(
    `/api/board`,
    formData,
  );
  return data;
};

export { postNewPostInfo };
