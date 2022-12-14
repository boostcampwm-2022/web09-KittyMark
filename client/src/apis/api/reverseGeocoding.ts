import axios, { AxiosResponse } from 'axios';

interface Area {
  name: string;
  coords: {
    center: {
      crs: string;
      x: number;
      y: number;
    };
  };
  alias?: string;
}

interface ReverseGeoApi {
  data: {
    status: {
      code: number;
      name: string;
      message: string;
    };
    results: [
      {
        name: string;
        code: {
          id: string;
          type: string;
          mappingId: string;
        };
        region: {
          area0: Area;
          area1: Area;
          area2: Area;
          area3: Area;
          area4: Area;
        };
        land: {
          type: string;
          number1: string;
          number2: string;
          addition0: { type: string; value: string };
          addition1: { type: string; value: string };
          addition2: { type: string; value: string };
          addition3: { type: string; value: string };
          addition4: { type: string; value: string };
          coords: {
            center: {
              crs: string;
              x: number;
              y: number;
            };
          };
        };
      },
    ];
  };
}

const getReverseGeoData = async (
  latitude: number,
  longitude: number,
): Promise<ReverseGeoApi> => {
  const { data }: AxiosResponse<ReverseGeoApi> = await axios.get(
    `/api/map/map-reversegeocode/v2/gc?coords=${longitude},${latitude}&orders=addr&output=json`,
  );
  return data;
};

export default getReverseGeoData;
