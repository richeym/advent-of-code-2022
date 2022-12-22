import { HeightMap } from ".";

export class RouteFinder {
  shortestRoute: number | undefined;

  constructor(public readonly map: HeightMap) {}
}
