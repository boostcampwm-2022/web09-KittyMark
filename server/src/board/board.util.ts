import * as wkx from 'wkx';
import { Geometry } from 'geojson';
import { ValueTransformer } from 'typeorm';

export class GeometryTransformer implements ValueTransformer {
  to(geojson: Geometry): string {
    if (!geojson) return null;

    return wkx.Geometry.parseGeoJSON(geojson).toWkt();
  }

  from(wkb: string): Record<string, null> | undefined {
    if (!wkb) return null;
    return wkx.Geometry.parse(wkb).toGeoJSON();
  }
}

export function toPoint(latitude: number, longitude: number): Geometry {
  if (!latitude && !longitude) return null;
  return {
    type: 'Point',
    coordinates: [latitude, longitude],
  };
}
