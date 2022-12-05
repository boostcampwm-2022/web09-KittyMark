import getReverseGeoData from '../api/reverseGeocoding';

const getlocationData = async (latitude: number, longitude: number) => {
  const { data } = await getReverseGeoData(latitude, longitude);

  if (data.status.name !== 'ok')
    throw Error('지도 경로 처리에 실패하였습니다.');

  const { region } = data.results[0];
  const areas = Object.values(region).map((value, idx) => {
    if (idx !== 0 && value.name !== '') return value.name;
    return '';
  });
  return areas.join(' ');
};

export default getlocationData;
