export interface Monkey {
  startingItems: number[];
  operation: string;
  testExpression: MonkeyTestExpression;
}

export interface MonkeyTestExpression {
  expression: string;
  monkeyIfTrue: number;
  monkeyIfFalse: number;
}

export const parseMonkey = (input: string): Monkey => {
  const regex = new RegExp(
    /^.+\d+:\n.+:\s(?<items>[\d+, ]+)\n.*:\s(?<op>.+)\n.+:\s(?<test>.+)\n.+:.+(?<true>\d+)\n.+:.+(?<false>\d+)$/
  );

  const matches = regex.exec(input)!;

  return {
    startingItems: matches.groups!["items"].split(", ").map(Number),
    operation: matches.groups!["op"],
    testExpression: {
      expression: matches.groups!["test"],
      monkeyIfTrue: parseInt(matches.groups!["true"]),
      monkeyIfFalse: parseInt(matches.groups!["false"]),
    },
  };
};

export const getPart1Answer = (input: string): void => {
  return;
};

export const getPart2Answer = (input: string): void => {
  return;
};
