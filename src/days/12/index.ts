var util = require("util");

export class Vector {
  constructor(public weight: number, public to: Node) {}
}

export class Node {
  readonly vectors: Vector[] = [];
  readonly isStart: boolean;
  readonly isEnd: boolean;
  readonly elevation: number;

  constructor(rawNode: string) {
    this.isStart = rawNode === "S";
    this.isEnd = rawNode === "E";

    this.elevation = this.isStart
      ? "a".charCodeAt(0)
      : this.isEnd
      ? "z".charCodeAt(0)
      : rawNode.charCodeAt(0);
  }
}

export class HeightMap {
  readonly height: number;
  readonly width: number;
  startX: number = 0;
  startY: number = 0;

  constructor(readonly grid: Node[][]) {
    this.height = this.grid.length;
    this.width = this.grid[0].length;

    for (let x = 0; x < this.width; x++) {
      for (let y = 0; y < this.height; y++) {
        if (this.grid[y][x].isStart) {
          this.startX = x;
          this.startY = y;
          break;
        }
      }
    }

    console.log(util.inspect(this, { depth: 2 }));
  }
}

export class RouteFinder {
  shortestRoute: number | undefined;

  constructor(public readonly map: HeightMap) {}
}

export const parseInput = (input: string): HeightMap => {
  const data = input
    .trim()
    .split("\n")
    .map((x) => x.split("").map((raw) => new Node(raw)));

  return new HeightMap(data);
};

export const getPart1Answer = (input: string): void => {
  return;
};

export const getPart2Answer = (input: string): void => {
  return;
};
