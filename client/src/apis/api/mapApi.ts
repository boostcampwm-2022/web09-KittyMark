import { AxiosResponse } from 'axios';
import { defaultInstance } from '../utils';
import { MapApi } from '../../types/responseData';

interface QueryMapRange {
  leftTop: {
    latitude: number;
    longitude: number;
  };
  rightDown: {
    latitude: number;
    longitude: number;
  };
}

/**
 * @param queryRange 현재 사용자가 보고있는 화면의 왼쪽 위, 오른쪽 아래 가장 끝의 위/경도
 * @returns 서버와의 통신 이후 결과를 보내준다.
 */
const getMapData = async (queryRange: QueryMapRange): Promise<MapApi> => {
  const { data }: AxiosResponse<MapApi> = await defaultInstance.post(
    `/api/map`,
    queryRange,
  );
  return data;
};

export default getMapData;
