export interface MonkeyTestExpression {
  divisor: number;
  monkeyIfTrue: number;
  monkeyIfFalse: number;
}

export interface Monkey {
  items: number[];
  operation: string;
  testExpression: MonkeyTestExpression;
}
