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
    const geo: Geometry = wkx.Geometry.parse(wkb).toGeoJSON();
    return geo.coordinates;
  }
}

export function toPoint(latitude: number, longitude: number): Geometry {
  if (!latitude && !longitude) return null;
  return {
    type: 'Point',
    coordinates: [latitude, longitude],
  };
}
