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
// constant
import { LOCATION_1784, WAIT_TIME_BEFORE_REQUEST } from '../../constants/map';
// hook
import useCurrentLocation from '../../hooks/useCurrentLocation';

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

const MapPage = () => {
  const navigation = useNavigate();
  const { naver } = window;
  const currentLocation = useCurrentLocation();
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
    description: 'create new post',
  };

  const requestBoardsData = async () => {
    if (!map) return;
    const range = getQueryMapRange(map);
    const data = await getBoardsMutation.mutateAsync(range);

    if (!data || !data.boards) return;
    const { boards: boardsInRange } = data;
    if (boardsInRange.length <= 0) return;
    setBoards(boardsInRange);
  };

  const requestAfterTimeout = (currentMap: naver.maps.Map, timeout: number) => {
    const { x: prevX, y: prevY } = currentMap.getCenter();
    setTimeout(() => {
      const { x: currentX, y: currentY } = currentMap.getCenter();
      if (currentX === prevX && currentY === prevY) requestBoardsData();
    }, timeout);
  };

  useEffect(() => {
    const naverMap = NaverMapModule.createMap(LOCATION_1784);
    setMap(naverMap);
  }, []);

  useEffect(() => {
    if (map === null) return;

    naver.maps.Event.addListener(map, 'dragend', () => {
      requestAfterTimeout(map, WAIT_TIME_BEFORE_REQUEST);
    });

    naver.maps.Event.addListener(map, 'zoom_changed', () => {
      requestAfterTimeout(map, WAIT_TIME_BEFORE_REQUEST);
    });
  }, [map]);

  useEffect(() => {
    if (typeof currentLocation === 'string' || !map) return;

    setLoadingMap(false);
    const { latitude, longitude } = currentLocation;
    const newCenter = new naver.maps.LatLng(latitude, longitude);
    map.panTo(newCenter);
    requestBoardsData();
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
