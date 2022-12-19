import * as path from "path";

import { getPart1Answer, getPart2Answer, Monkey, parseMonkey } from ".";
import { readFileToString } from "../../util";

describe("Day 11", () => {
  const sampleInput = readFileToString(
    path.join(__dirname, "input/sample-input.txt")
  );
  const realInput = readFileToString(path.join(__dirname, "input/input.txt"));

  it("parses input line into a monkey status", () => {
    const input = `Monkey 0:
  Starting items: 79, 98
  Operation: new = old * 19
  Test: divisible by 23
    If true: throw to monkey 2
    If false: throw to monkey 3`;

    const expectedMonkey: Monkey = {
      startingItems: [79, 98],
      operation: "new = old * 19",
      testExpression: {
        expression: "divisible by 23",
        monkeyIfTrue: 2,
        monkeyIfFalse: 3,
      },
    };

    const monkey = parseMonkey(input);

    expect(monkey).toEqual(expectedMonkey);
  });

  it("solves part 1", () => {
    getPart1Answer(realInput);
  });

  it("solves part 2", () => {
    getPart2Answer(realInput);
  });
});
