import { RouteMap } from "../HeightMap";
import { NodeKeys, NodeWeight, Route } from "../types";

export const astar = (map: RouteMap): Route => {
  return {
    distance: 0,
    path: [],
  };
};
