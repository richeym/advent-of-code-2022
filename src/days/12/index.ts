import { HeightGrid } from "./HeightGrid";
import { HeightMap } from "./HeightMap";
import { Node } from "./Node";
import { RouteFinder } from "./RouteFinder";

export const parseInput = (input: string): HeightGrid => {
  const data = input
    .trim()
    .split("\n")
    .map((x) => x.split("").map((raw) => new Node(raw)));

  return new HeightGrid(data);
};

export const getPart1AnswerUsingDijkstra = (input: string): number => {
  const heightMap = parseInput(input);
  const routeFinder = new RouteFinder(heightMap);

  var startTime = performance.now();
  const { distance } = routeFinder.findShortest();
  var endTime = performance.now();
  console.log(
    `Route found in ${endTime - startTime} milliseconds using Dijkstra`
  );
  return distance;
};

export const getPart1AnswerUsingAStar = (input: string): number => {
  const heightMap = parseInput(input);
  const routeFinder = new RouteFinder(heightMap, true);

  var startTime = performance.now();
  const { distance } = routeFinder.findShortest();
  var endTime = performance.now();
  console.log(`Route found in ${endTime - startTime} milliseconds using A*`);

  return distance;
};

export const getPart2Answer = (input: string): void => {
  return;
};
