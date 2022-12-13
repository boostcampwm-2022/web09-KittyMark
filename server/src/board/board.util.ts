import * as wkx from 'wkx';
import { Geometry } from 'geojson';
import { ValueTransformer } from 'typeorm';

export class GeometryTransformer implements ValueTransformer {
  to(geojson: Geometry): string {
    if (!geojson) return null;

    return wkx.Geometry.parseGeoJSON(geojson).toWkt();
  }

  from(wkb: string): Record<string, number[]> | undefined[] {
    if (!wkb) return [];
    const geo = wkx.Geometry.parse(wkb).toGeoJSON();
    console.log(geo);
    return geo;
  }
}

export function toPoint(latitude: number, longitude: number): Geometry {
  if (!latitude && !longitude) return null;
  return {
    type: 'Point',
    coordinates: [latitude, longitude],
  };
}
