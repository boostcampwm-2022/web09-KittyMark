import React, { useEffect, useState } from 'react';
// util
import NaverMapModule, { createMarker } from '../../utils/map/naverMap';
// style
import S from './SetLocationModalStyles';
// img
import footprint from '../../static/footprint.svg';

declare global {
  interface Window {
    naver: typeof naver;
  }
}

interface SetLocationModalProps {
  setModal: (modal: boolean) => void;
  location: {
    isChecked: boolean;
    latitude?: number;
    longitude?: number;
    location?: string;
  };
  setLocation: (location: {
    isChecked: boolean;
    latitude?: number;
    longitude?: number;
    location?: string;
  }) => void;
}

const SetLocationModal = (props: SetLocationModalProps) => {
  const { naver } = window;
  const { setModal, location, setLocation } = props;
  const [currentLocation, setCurrentLocation] = useState<
    { latitude: number; longitude: number } | string
  >('');
  const [map, setMap] = useState<naver.maps.Map | null>(null);
  const [locationName, setLocationName] = useState<string>('');
  let marker: naver.maps.Marker;

  const saveLocationInfo = async (latitude: number, longitude: number) => {
    naver.maps.Service.reverseGeocode(
      {
        coords: new naver.maps.LatLng(latitude, longitude),
      },
      (status, response) => {
        if (status !== naver.maps.Service.Status.OK) {
          throw Error('주소를 찾을 수 없습니다.');
        }

        const { region } = response.v2.results[0];
        const areas = Object.values(region).map((area, index) => {
          if (index === 0 || area.name === '') return '';
          return area.name;
        });
        const name = areas.join(' ').trim();
        setCurrentLocation({ latitude, longitude });
        setLocationName(name);
      },
    );
  };

  const submitLocation = () => {
    if (typeof currentLocation === 'string') return;

    const newLocation = {
      isChecked: location.isChecked,
      latitude: currentLocation.latitude,
      longitude: currentLocation.longitude,
      location: locationName,
    };
    setLocation(newLocation);
    setModal(false);
  };

  useEffect(() => {
    const { latitude, longitude } = location;
    if (latitude === undefined || longitude === undefined) return;
    saveLocationInfo(latitude, longitude);
  }, []);

  useEffect(() => {
    if (typeof currentLocation === 'string') return;
    const naverMap = NaverMapModule.createMap(currentLocation);
    setMap(naverMap);
  }, [currentLocation]);

  useEffect(() => {
    if (map === null || typeof currentLocation === 'string') return;

    marker = createMarker(map, currentLocation);
    naver.maps.Event.addListener(map, 'dragend', () => {
      const centerLocation = map.getCenter();
      saveLocationInfo(centerLocation.y, centerLocation.x);
      marker?.setPosition(centerLocation);
    });
  }, [map]);

  return (
    <S.Background>
      <S.Container>
        <S.MapWrapper>
          <S.NaverMap>
            <div id="map" style={{ width: '100%', height: '100%' }} />
          </S.NaverMap>
          <S.Wrapper>
            <S.WindowContainer>
              <S.InfoWindowWrapper>
                <S.InfoWindow>{locationName}</S.InfoWindow>
              </S.InfoWindowWrapper>
              <S.ButtonWrapper>
                <S.SubmitButton type="button" onClick={submitLocation}>
                  <img src={footprint} alt="위치 선택 완료" />
                </S.SubmitButton>
              </S.ButtonWrapper>
            </S.WindowContainer>
          </S.Wrapper>
        </S.MapWrapper>
      </S.Container>
    </S.Background>
  );
};

export default SetLocationModal;
