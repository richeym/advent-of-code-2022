import * as path from "path";

import {
  moveCrate,
  getPart1Answer,
  getPart2Answer,
  parseInput,
  getSuppliesForEachStack,
} from ".";
import { readFileToString } from "../../util";

describe("Day 05", () => {
  const sampleInput = readFileToString(
    path.join(__dirname, "input/sample-input.txt")
  );
  const realInput = readFileToString(path.join(__dirname, "input/input.txt"));

  it("parses input into stacks", () => {
    const { stacks } = parseInput(sampleInput);

    expect(stacks).toEqual([["Z", "N"], ["M", "C", "D"], ["P"]]);
  });

  it("parses input into instructions", () => {
    const { instructions } = parseInput(sampleInput);

    expect(instructions).toEqual(["1-2-1", "3-1-3", "2-2-1", "1-1-2"]);
  });

  it("applies a move instruction", () => {
    const stacks = [["Z", "N"], []];
    const instruction = "1-1-2";

    const output = moveCrate(stacks, instruction);
    expect(output).toEqual([["Z"], ["N"]]);
  });

  it("applies a move instruction to a large numbe of crates", () => {
    const stacks = [[], ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"]];
    const instruction = "10-2-1";

    const output = moveCrate(stacks, instruction);
    expect(output).toEqual([
      ["J", "I", "H", "G", "F", "E", "D", "C", "B", "A"],
      [],
    ]);
  });

  it("gets supplies on top of each stack", () => {
    const stacks = [["Z", "N"], ["M", "C", "D"], ["P"]];
    const supplies = getSuppliesForEachStack(stacks);
    expect(supplies).toEqual("NDP");
  });

  it("solves part 1", () => {
    const output = getPart1Answer(realInput);
    expect(output).toEqual("JRVNHHCSJ");
  });

  it("solves part 2", () => {
    getPart2Answer(realInput);
  });
});
