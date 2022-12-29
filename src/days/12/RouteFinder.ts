import { dijkstra } from "./algorithms/dijkstra";
import { HeightGrid } from "./HeightGrid";
import { RouteMap } from "./HeightMap";
import { Route } from "./types";

type PathFindingFn = (map: RouteMap) => Route;

export class RouteFinder {
  private readonly map: RouteMap;
  private readonly pathFindingFn: PathFindingFn;

  constructor(public readonly grid: HeightGrid, pathFindingFn: PathFindingFn) {
    this.map = new RouteMap(grid);
    this.pathFindingFn = pathFindingFn ?? dijkstra;
  }

  findRoute = (): { distance: number; path: string[] } =>
    this.pathFindingFn(this.map);
}
