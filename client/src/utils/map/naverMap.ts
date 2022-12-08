import { Coordinate, getQueryMapRange } from './map';

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

const showMarker = (map: naver.maps.Map, marker: naver.maps.Marker) => {
  if (marker.getMap()) return;
  marker.setMap(map);
};

const hideMarker = (map: naver.maps.Map, marker: naver.maps.Marker) => {
  if (!marker.getMap()) return;
  marker.setMap(null);
};

const hideAllMarker = (map: naver.maps.Map, markers: naver.maps.Marker[]) => {
  markers.forEach((marker) => {
    hideMarker(map, marker);
  });
};

const updateMarkers = (map: naver.maps.Map, markers: naver.maps.Marker[]) => {
  const bounds = getQueryMapRange(map);
  const sw = new naver.maps.LatLng(
    bounds.leftDown.latitude,
    bounds.leftDown.longitude,
  );
  const ne = new naver.maps.LatLng(
    bounds.rightTop.latitude,
    bounds.rightTop.longitude,
  );
  const mapBounds = new naver.maps.LatLngBounds(sw, ne);
  let marker;
  let position;

  for (let i = 0; i < markers.length; i += 1) {
    marker = markers[i];
    position = marker.getPosition();

    if (mapBounds.hasLatLng(position)) {
      showMarker(map, marker);
    } else {
      hideMarker(map, marker);
    }
  }
};

export default {
  createMap,
  createMarker,
  updateMarkers,
  hideMarker,
  hideAllMarker,
  showMarker,
};
