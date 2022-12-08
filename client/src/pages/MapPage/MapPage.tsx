import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';
// api
import getBoardDataInRange from '../../apis/api/mapApi';
// type
import { Board } from '../../types/responseData';
// util
import { extractCoord, getQueryMapRange } from '../../utils/map/map';
import NaverMapModule from '../../utils/map/naverMap';
// img
import addPostButtonImg from '../../static/addPost.svg';
import blueCatSpinner from '../../static/BlueCatSpinner.gif';
// style
import { NaverMap, SpinnerWrapper, Spinner } from './MapPageStyles';
// component
import NormalTopBar from '../../components/NormalTopBar/NormalTopBar';
import NavBar from '../../components/NavBar/NavBar';
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

const LOCATION1784 = {
  latitude: 37.3595953,
  longitude: 127.1053971,
};

const waitTimeBeforeRequest = 600;

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
  const [loadingMap, setLoadingMap] = useState(true);

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
    const data = await getBoardsMutation.mutateAsync(range);

    if (!data || !data.boards) return;
    const { boards: boardsInRange } = data;
    if (boardsInRange.length <= 0) return;
    setBoards(boardsInRange);
  };

  /* 사용자 현재 위치 가져오기 */
  useEffect(() => {
    const naverMap = NaverMapModule.createMap(LOCATION1784);
    setMap(naverMap);

    if (window.navigator.geolocation) {
      window.navigator.geolocation.getCurrentPosition((position) => {
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

  /* 지도에 이벤트 추가 */
  useEffect(() => {
    if (map === null) return;

    naver.maps.Event.addListener(map, 'dragend', () => {
      const { x: currentX, y: currentY } = map.getCenter();
      setTimeout(() => {
        const { x: newX, y: newY } = map.getCenter();
        if (currentX === newX && currentY === newY) requestData();
      }, waitTimeBeforeRequest);
    });
  }, [map]);

  /* 사용자 위치 기반 지도 만들기 */
  useEffect(() => {
    if (typeof currentLocation === 'string' || !map) return;

    setLoadingMap(false);
    const { latitude, longitude } = currentLocation;
    const newCenter = new naver.maps.LatLng(latitude, longitude);
    map.panTo(newCenter);
    requestData();
  }, [currentLocation]);

  /* 서버에서 받아온 게시글 정보를 기반으로 마킹 */
  useEffect(() => {
    if (map === null) return;
    /* 게시글 데이터에서 index + 위/경도 추출 */
    const coords = extractCoord(boards);
    /* 추출한 위/경도를 지도에 Marker로 추가 */
    const newMarkers = coords.map((coord) => {
      return NaverMapModule.createMarker(map, coord);
    });
    NaverMapModule.hideAllMarker(map, markers);
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
      {loadingMap ? (
        <SpinnerWrapper>
          <Spinner src={blueCatSpinner} alt="wait for map to load" />
        </SpinnerWrapper>
      ) : null}
      <NaverMap>
        <div id="map" style={{ width: '100%', height: '100%' }} />
      </NaverMap>
      <NavBar />
    </>
  );
};

export default MapPage;
