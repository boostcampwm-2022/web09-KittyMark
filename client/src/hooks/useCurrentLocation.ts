import { useEffect, useState } from 'react';
import { LOCATION_1784 } from '../constants/map';
import { Coordinate } from '../utils/map/map';

const useCurrentLocation = () => {
  const [currentLocation, setCurrentLocation] =
    useState<Coordinate>(LOCATION_1784);

  useEffect(() => {
    if (window.navigator.geolocation) {
      window.navigator.geolocation.getCurrentPosition((position) => {
        setCurrentLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      });
    }
  }, []);

  return currentLocation;
};

export default useCurrentLocation;
