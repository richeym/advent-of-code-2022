import { Monkey, MonkeyTestExpression } from "../types";

export class MonkeyService {
  constructor(
    public monkeys: Monkey[],
    private reduceWorryLevelFn: (worryLevel: number) => number = (old) => old
  ) {}

  execute = (rounds: number, reduceNumbers: boolean = false): number => {
    const inspections: number[] = new Array<number>(this.monkeys.length).fill(
      0
    );

    let divisor = 0;
    if (reduceNumbers) {
      divisor = this.monkeys.reduce(
        (acc, monkey) => acc * monkey.testExpression.divisor,
        1
      );
    }

    for (let i = 0; i < rounds; i++) {
      for (let m = 0; m < this.monkeys.length; m++) {
        const monkey = this.monkeys[m];

        while (monkey.items.length > 0) {
          const item = monkey.items.shift()!;

          inspections[m]++;

          let newWorryLevel = calculateNewWorryLevel(
            item,
            monkey.operation,
            divisor
          );

          newWorryLevel = this.reduceWorryLevelFn(newWorryLevel);

          const newMonkey = getMonkeyToThrowTo(
            newWorryLevel,
            monkey.testExpression
          );

          this.monkeys[newMonkey].items.push(newWorryLevel);
        }
      }
    }

    inspections.sort((a, b) => b - a);

    return inspections.slice(0, 2).reduce((acc, curr) => acc * curr, 1);
  };
}

export const getMonkeyToThrowTo = (
  itemWorryLevel: number,
  expression: MonkeyTestExpression
): number =>
  itemWorryLevel % expression.divisor
    ? expression.monkeyIfFalse
    : expression.monkeyIfTrue;

type Operator = "+" | "*";

const operators = {
  "+": function (a: number, b: number) {
    return a + b;
  },
  "*": function (a: number, b: number) {
    return a * b;
  },
};

export const calculateNewWorryLevel = (
  oldWorryLevel: number,
  operation: string,
  divisor: number = 0
): number => {
  const ops = operation.split(" ");
  const a = getOperand(oldWorryLevel, ops[0]);
  const b = getOperand(oldWorryLevel, ops[2]);
  const operator: Operator = ops[1] as Operator;

  let newWorryLevel = operators[operator](a, b);

  if (divisor > 0) {
    newWorryLevel = newWorryLevel % divisor;
  }

  return newWorryLevel;
};

const getOperand = (oldWorryLevel: number, operand: string): number =>
  operand === "old" ? oldWorryLevel : parseInt(operand);
