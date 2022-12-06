import * as path from "path";

import {
  moveCrate,
  getPart1Answer,
  getPart2Answer,
  parseInput,
  getSuppliesForEachStack,
  moveCrate9001,
  Instruction,
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

    expect(instructions).toEqual([
      {
        amount: 1,
        from: 2,
        to: 1,
      },
      {
        amount: 3,
        from: 1,
        to: 3,
      },
      {
        amount: 2,
        from: 2,
        to: 1,
      },
      {
        amount: 1,
        from: 1,
        to: 2,
      },
    ]);
  });

  it("applies a move instruction", () => {
    const stacks = [["Z", "N"], []];
    const instruction: Instruction = {
      amount: 1,
      from: 1,
      to: 2,
    };

    moveCrate(stacks, instruction);
    expect(stacks).toEqual([["Z"], ["N"]]);
  });

  it("applies a move instruction to a large numbe of crates", () => {
    const stacks = [[], ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"]];
    const instruction: Instruction = {
      amount: 10,
      from: 2,
      to: 1,
    };

    moveCrate(stacks, instruction);
    expect(stacks).toEqual([
      ["J", "I", "H", "G", "F", "E", "D", "C", "B", "A"],
      [],
    ]);
  });

  it("gets supplies on top of each stack", () => {
    const stacks = [["Z", "N"], ["M", "C", "D"], ["P"]];
    const supplies = getSuppliesForEachStack(stacks);
    expect(supplies).toEqual("NDP");
  });

  it("moves multiple crates with the CrateMover 9001", () => {
    const stacks = [[], ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"]];
    const instruction: Instruction = {
      amount: 5,
      from: 2,
      to: 1,
    };

    moveCrate9001(stacks, instruction);

    expect(stacks).toEqual([
      ["F", "G", "H", "I", "J"],
      ["A", "B", "C", "D", "E"],
    ]);
  });

  it("solves part 1", () => {
    const output = getPart1Answer(realInput);
    expect(output).toEqual("JRVNHHCSJ");
  });

  it("solves part 2", () => {
    const output = getPart2Answer(realInput);
    expect(output).toEqual("GNFBSBJLH");
  });
});
