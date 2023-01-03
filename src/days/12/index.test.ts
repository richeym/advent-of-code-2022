import * as path from "path";

import {
  getPart1AnswerUsingAStar,
  getPart1AnswerUsingDijkstra,
  getPart2Answer,
  parseInput,
} from ".";
import { RouteFinder } from "./RouteFinder";
import { readFileToString } from "../../util";
import { astar } from "./algorithms/astar";
import { dijkstra } from "./algorithms/dijkstra";

describe("Day 12", () => {
  const sampleInput = readFileToString(
    path.join(__dirname, "input/sample-input.txt")
  );

  const realInput = readFileToString(path.join(__dirname, "input/input.txt"));

  it("parses input into grid", () => {
    const parsedInput = parseInput(sampleInput);

    expect(parsedInput.height).toBe(5);
    expect(parsedInput.width).toBe(8);
    expect(parsedInput.startX).toBe(0);
    expect(parsedInput.startY).toBe(0);
    expect(parsedInput.endX).toBe(5);
    expect(parsedInput.endY).toBe(2);
  });

  it("solves sample input using dijkstra", () => {
    const heightMap = parseInput(sampleInput);
    const routeFinder = new RouteFinder(heightMap, dijkstra);
    const output = routeFinder.findRoute();
    expect(output.distance).toBe(31);
  });

  it("solves sample input using A*", () => {
    const heightMap = parseInput(sampleInput);
    const routeFinder = new RouteFinder(heightMap, astar);
    const output = routeFinder.findRoute();
    expect(output.distance).toBe(31);
  });

  it("solves part 1 using Dijkstra", () => {
    const result = getPart1AnswerUsingDijkstra(realInput);
    expect(result.distance).toBe(425);
  });

  it("solves part 1 using A*", () => {
    const result = getPart1AnswerUsingAStar(realInput);
    expect(result.distance).toBe(425);
  });

  it("solves part 2", () => {
    getPart2Answer(realInput);
  });
});
