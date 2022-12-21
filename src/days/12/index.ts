export type HeightMap = string[][];

export class RouteFinder {
  readonly destinationRow: number;
  readonly destinationCol: number;
  shortestRoute: number | undefined;

  constructor(public readonly map: HeightMap) {
    const { row, col } = findElementInArray(map, "E");
    this.destinationRow = row;
    this.destinationCol = col;
  }

  plotShortestRoute = (): number => {
    this.shortestRoute = Number.MAX_SAFE_INTEGER;
    let { row, col } = findElementInArray(this.map, "S");

    return 0;
  };
}

const findElementInArray = (
  arr: string[][],
  element: string
): { row: number; col: number } => {
  for (let row = 0; row < arr.length; row++) {
    for (let col = 0; col < arr[row].length; col++) {
      if (arr[row][col] === element) {
        return { row, col };
      }
    }
  }

  throw Error("couldnt find element");
};

export const parseInput = (input: string): HeightMap => {
  return input
    .trim()
    .split("\n")
    .map((x) => x.split(""));
};
export const getPart1Answer = (input: string): void => {
  return;
};

export const getPart2Answer = (input: string): void => {
  return;
};
