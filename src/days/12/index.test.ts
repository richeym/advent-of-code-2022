import * as path from "path";

import {
  getPart1AnswerUsingAStar,
  getPart1AnswerUsingDijkstra,
  getPart2Answer,
  parseInput,
} from ".";
import { RouteFinder } from "./RouteFinder";
import { readFileToString } from "../../util";

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

  it.only("solves sample input using dijkstra", () => {
    const heightMap = parseInput(sampleInput);
    const routeFinder = new RouteFinder(heightMap);
    const output = routeFinder.findShortest();
    expect(output.distance).toBe(31);
  });

  it.only("solves sample input using A*", () => {
    const heightMap = parseInput(sampleInput);
    const routeFinder = new RouteFinder(heightMap, true);
    const output = routeFinder.findShortest();
    expect(output.distance).toBe(31);
  });

  it("solves part 1 using Dijkstra", () => {
    const answer = getPart1AnswerUsingDijkstra(realInput);
    expect(answer).toBe(425);
  });

  it.only("solves part 1 using A*", () => {
    const answer = getPart1AnswerUsingAStar(realInput);
    expect(answer).toBe(425);
  });

  it("solves part 2", () => {
    getPart2Answer(realInput);
  });
});
