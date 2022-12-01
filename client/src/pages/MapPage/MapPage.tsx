import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// utill
import { Coordinate, extractCoord, getQueryMapRange } from '../../utils/map';
// img
import addPostButtonImg from '../../static/addPost.svg';
// style
import NaverMap from './MapPageStyles';
// component
import NormalTopBar from '../../components/NormalTopBar/NormalTopBar';
import NavBar from '../../components/NavBar/NavBar';
import getMapData from '../../apis/api/mapApi';
import { Board } from '../../types/responseData';

declare global {
  interface Window {
    naver: typeof naver;
  }
}

const MapPage = () => {
  const navigation = useNavigate();
  const { naver } = window;
  const [currentLocation, setCurrentLocation] = useState<
    { latitude: number; longitude: number } | string
  >('');
  const [map, setMap] = useState<naver.maps.Map | null>(null);
  const [boards, setBoards] = useState<Board[]>([]);

  const addPostButton = {
    buttonImg: addPostButtonImg,
    eventHandler: () => {
      navigation('/new-post');
    },
    description: '게시물을 추가할래요.',
  };

  const getData = async () => {
    if (map === null) return;
    const range = getQueryMapRange(map);
    const { statusCode, message, data } = await getMapData(range);

    if (statusCode !== 201) throw new Error(message);
    if (data === undefined) return;

    if (data.boards !== undefined) setBoards(data.boards);
  };

  const requestData = () => {
    try {
      getData();
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };

  const currentMarker = ({ latitude, longitude }: Coordinate) => {
    if (map === null) return null;
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
      window.alert('현재위치를 알수 없습니다.');
    }
  }, []);

  /* 사용자 위치 기반 지도 만들기 */
  useEffect(() => {
    if (typeof currentLocation !== 'string') {
      const { latitude: currentLatitude, longitude: currentLongitude } =
        currentLocation;

      const naverMap = new naver.maps.Map('map', {
        center: new naver.maps.LatLng(currentLatitude, currentLongitude),
        zoomControl: true,
        zoomControlOptions: {
          style: naver.maps.ZoomControlStyle.SMALL,
          position: naver.maps.Position.TOP_RIGHT,
        },
      });
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
    /* 게시글 데이터에서 index + 위/경도 추출 */
    const coords = extractCoord(boards);
    /* 추출한 위/경도를 지도에 Marker로 추가 */
    coords.map((coord) => {
      return currentMarker(coord);
    });
  }, [boards]);

  return (
    <>
      <NormalTopBar buttonData={addPostButton} />
      <NaverMap>
        <div id="map" style={{ width: '100%', height: '100%' }} />
      </NaverMap>
      <NavBar />
    </>
  );
};

export default MapPage;
