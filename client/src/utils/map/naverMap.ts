import { Coordinate } from './map';

export const createMap = ({ latitude, longitude }: Coordinate) => {
  return new naver.maps.Map('map', {
    center: new naver.maps.LatLng(latitude, longitude),
    zoomControl: true,
    zoomControlOptions: {
      style: naver.maps.ZoomControlStyle.SMALL,
      position: naver.maps.Position.TOP_RIGHT,
    },
  });
};

export const createMarker = (
  map: naver.maps.Map,
  { latitude, longitude }: Coordinate,
) => {
  return new naver.maps.Marker({
    position: new naver.maps.LatLng(latitude, longitude),
    map,
    // 원하는 이미지로 마커 커스텀
    // icon: {
    //     url: pinImage,
    //     size: new naver.maps.Size(50, 52),
    //     origin: new naver.maps.Point(0, 0),
    //     anchor: new naver.maps.Point(25, 26),
    //   },
  });
};

export default { createMap, createMarker };
