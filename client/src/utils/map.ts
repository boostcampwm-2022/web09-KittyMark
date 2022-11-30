import { Board } from '../types/responseData';

export interface Coordinate {
  latitude: number;
  longitude: number;
}

const createPointFromSize = (width: number, height: number) => {
  return new naver.maps.Point(width, height);
};

const convertPointToCoord = (map: naver.maps.Map, point: naver.maps.Point) => {
  const mapProjection = map.getProjection();
  const coord = mapProjection.fromOffsetToCoord(point);
  return coord;
};

const getCoord = (map: naver.maps.Map, width: number, height: number) => {
  const point = createPointFromSize(width, height);
  const coord = convertPointToCoord(map, point);
  const { y: latitude, x: longitude } = coord;
  return { latitude, longitude };
};

const getQueryMapRange = (map: naver.maps.Map) => {
  const { width, height } = map.getSize();
  const leftTop = getCoord(map, 0, 0);
  const rightDown = getCoord(map, width, height);
  return { leftTop, rightDown };
};

const extractCoord = (boards: Board[]) => {
  const coordList: Coordinate[] = [];
  boards.forEach((board) => {
    const coord = { latitude: board.latitude, longitude: board.longitude };
    coordList.push(coord);
  });
  return coordList;
};

export { getQueryMapRange, extractCoord };
