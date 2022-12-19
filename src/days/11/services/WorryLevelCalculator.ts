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
  operation: string
): number => {
  const ops = operation.split(" ");
  const a = getOperand(oldWorryLevel, ops[0]);
  const b = getOperand(oldWorryLevel, ops[2]);
  const operator: Operator = ops[1] as Operator;

  const raisedWorryLevel = operators[operator](a, b);

  return reduceWorryLevel(raisedWorryLevel);
};

const getOperand = (oldWorryLevel: number, operand: string): number =>
  operand === "old" ? oldWorryLevel : parseInt(operand);

const reduceWorryLevel = (worryLevel: number): number =>
  Math.floor(worryLevel / 3);
