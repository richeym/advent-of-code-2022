import { HeightGrid } from "./HeightGrid";
import { HeightMap } from "./HeightMap";
import { Node } from "./Node";
import { RouteFinder } from "./RouteFinder";

export const parseInput = (input: string): HeightMap => {
  const data = input
    .trim()
    .split("\n")
    .map((x) => x.split("").map((raw) => new Node(raw)));

  const grid = new HeightGrid(data);
  return new HeightMap(grid);
};

export const getPart1Answer = (input: string): number => {
  const heightMap = parseInput(input);
  const routeFinder = new RouteFinder(heightMap);
  return routeFinder.findShortest();
};

export const getPart2Answer = (input: string): void => {
  return;
};
