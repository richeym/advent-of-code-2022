import { MonkeyService } from "./services/MonkeyService";
import { Monkey } from "./types";

export const parseMonkey = (input: string): Monkey => {
  const regex = new RegExp(
    /^.+\d+:\n.+:\s(?<items>[\d+, ]+)\n.*=\s(?<op>.+)\n.+\s(?<test>\d+)\n.+:.+(?<true>\d+)\n.+:.+(?<false>\d+)$/
  );

  const matches = regex.exec(input)!;

  return {
    items: matches.groups!["items"].split(", ").map(Number),
    operation: matches.groups!["op"],
    testExpression: {
      divisor: parseInt(matches.groups!["test"]),
      monkeyIfTrue: parseInt(matches.groups!["true"]),
      monkeyIfFalse: parseInt(matches.groups!["false"]),
    },
  };
};

export const parseInput = (input: string): Monkey[] => {
  return input.trim().split("\n\n").map(parseMonkey);
};

export const getPart1Answer = (input: string): number => {
  const monkeys = parseInput(input);
  const monkeyService = new MonkeyService(monkeys);

  return monkeyService.execute(20).partOne;
};

export const getPart2Answer = (input: string): void => {
  return;
};
