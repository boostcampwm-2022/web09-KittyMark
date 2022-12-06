import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';
// utill
import { Coordinate, extractCoord, getQueryMapRange } from '../../utils/map';
// img
import addPostButtonImg from '../../static/addPost.svg';
// style
import NaverMap from './MapPageStyles';
// component
import NormalTopBar from '../../components/NormalTopBar/NormalTopBar';
import NavBar from '../../components/NavBar/NavBar';
import getBoardDataInRange from '../../apis/api/mapApi';
import { Board } from '../../types/responseData';
import BoardModal from '../../components/BoardModal/BoardModal';

declare global {
  interface Window {
    naver: typeof naver;
  }
}

interface QueryRange {
  leftDown: {
    latitude: number;
    longitude: number;
  };
  rightTop: {
    latitude: number;
    longitude: number;
  };
}

const createMap = ({ latitude, longitude }: Coordinate) => {
  return new naver.maps.Map('map', {
    center: new naver.maps.LatLng(latitude, longitude),
    zoomControl: true,
    zoomControlOptions: {
      style: naver.maps.ZoomControlStyle.SMALL,
      position: naver.maps.Position.TOP_RIGHT,
    },
  });
};

const createMarker = (
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

const MapPage = () => {
  const navigation = useNavigate();
  const { naver } = window;
  const [currentLocation, setCurrentLocation] = useState<
    { latitude: number; longitude: number } | string
  >('');
  const [map, setMap] = useState<naver.maps.Map | null>(null);
  const [boards, setBoards] = useState<Board[]>([]);
  const [clickedBoard, setClickedBoard] = useState<Board | null>(null);
  const [markers, setMarkers] = useState<naver.maps.Marker[]>([]);

  const getBoardsMutation = useMutation((range: QueryRange) =>
    getBoardDataInRange(range).then((response) => response.data),
  );

  const addPostButton = {
    buttonImg: addPostButtonImg,
    eventHandler: () => {
      navigation('/new-post');
    },
    description: '게시물을 추가할래요.',
  };

  const requestData = async () => {
    if (!map) return;
    const range = getQueryMapRange(map);
    const testBoards = await getBoardsMutation.mutateAsync(range);

    if (!testBoards) return;
    if (testBoards.length <= 0) return;
    setBoards(testBoards);
  };

  /* 사용자 현재 위치 가져오기 */
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setCurrentLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      });
    } else {
      // eslint-disable-next-line
      window.alert('현재 위치를 알 수 없습니다.');
    }
  }, []);

  /* 사용자 위치 기반 지도 만들기 */
  useEffect(() => {
    if (typeof currentLocation !== 'string') {
      const naverMap = createMap(currentLocation);
      setMap(naverMap);
    }
  }, [currentLocation]);

  /* 지도에 이벤트 추가 */
  useEffect(() => {
    if (map === null) return;

    naver.maps.Event.addListener(map, 'dragend', () => {
      requestData();
    });
  }, [map]);

  /* 서버로부터 게시글 정보를 받아옴 */
  useEffect(() => {
    if (map === null) return;
    requestData();
  }, [map]);

  /* 서버에서 받아온 게시글 정보를 기반으로 마킹 */
  useEffect(() => {
    if (map === null) return;
    /* 게시글 데이터에서 index + 위/경도 추출 */
    const coords = extractCoord(boards);
    /* 추출한 위/경도를 지도에 Marker로 추가 */
    const newMarkers = coords.map((coord) => {
      return createMarker(map, coord);
    });
    setMarkers(newMarkers);
  }, [boards]);

  useEffect(() => {
    const clickMarker = (board: Board) => {
      return () => {
        setClickedBoard(board);
      };
    };
    for (let i = 0; i < markers.length; i += 1) {
      naver.maps.Event.addListener(markers[i], 'click', clickMarker(boards[i]));
    }
  }, [markers]);

  return (
    <>
      {clickedBoard !== null ? (
        <BoardModal board={clickedBoard} setClickedBoard={setClickedBoard} />
      ) : null}
      <NormalTopBar buttonData={addPostButton} />
      <NaverMap>
        <div id="map" style={{ width: '100%', height: '100%' }} />
      </NaverMap>
      <NavBar />
    </>
  );
};

export default MapPage;
