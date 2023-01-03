import { astar } from "./algorithms/astar";
import { dijkstra } from "./algorithms/dijkstra";
import { HeightGrid } from "./HeightGrid";
import { RouteMap } from "./HeightMap";
import { Node } from "./Node";
import { RouteFinder } from "./RouteFinder";
import { Route } from "./types";

export const parseInput = (input: string): HeightGrid => {
  const data = input
    .trim()
    .split("\n")
    .map((x) => x.split("").map((raw) => new Node(raw)));

  return new HeightGrid(data);
};

export const getPart1AnswerUsingDijkstra = (input: string): Route => {
  const heightMap = parseInput(input);
  const routeFinder = new RouteFinder(heightMap, dijkstra);

  return routeFinder.findRoute();
};

export const getPart1AnswerUsingAStar = (input: string): Route => {
  const heightMap = parseInput(input);
  const routeFinder = new RouteFinder(heightMap, astar);

  return routeFinder.findRoute();
};

export const getPart2Answer = (input: string): void => {
  return;
};
