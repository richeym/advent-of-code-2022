export interface Vector {
  direction: string;
  distance: number;
}

export interface Coordinate {
  x: number;
  y: number;
}

export interface MoveResult {
  h: Coordinate;
  t: Coordinate;
  tVisited: Coordinate[];
}

export const runSimulation = (vectors: Vector[]): number => {
  let moveResult: MoveResult = {
    h: { x: 0, y: 0 },
    t: { x: 0, y: 0 },
    tVisited: [],
  };

  const visited: Coordinate[] = [{ x: 0, y: 0 }];

  for (let vector of vectors) {
    moveResult = move(vector, moveResult.h, moveResult.t);

    for (let visitedThisMove of moveResult.tVisited) {
      if (
        !visited.find(
          (coord) =>
            coord.x === visitedThisMove.x && coord.y === visitedThisMove.y
        )
      ) {
        visited.push(visitedThisMove);
      }
    }
  }

  return visited.length;
};

export const move = (
  vector: Vector,
  h: Coordinate,
  t: Coordinate
): MoveResult => {
  let currentHx: number = h.x;
  let currentHy: number = h.y;
  const tVisited: Coordinate[] = [];

  let currentH: Coordinate = h;
  let lastH: Coordinate = h;
  let currentT: Coordinate = t;

  for (let i = 0; i < vector.distance; i++) {
    lastH = currentH;

    if (vector.direction === "R") {
      currentHx++;
    }
    if (vector.direction === "L") {
      currentHx--;
    }
    if (vector.direction === "U") {
      currentHy--;
    }
    if (vector.direction === "D") {
      currentHy++;
    }

    currentH = { x: currentHx, y: currentHy };

    if (
      Math.abs(currentH.x - currentT.x) > 1 ||
      Math.abs(currentH.y - currentT.y) > 1
    ) {
      currentT = lastH;
      tVisited.push(currentT);
    }
  }

  return {
    h: currentH,
    t: currentT,
    tVisited: tVisited,
  };
};

export const parseInput = (input: string): Vector[] => {
  return input
    .trim()
    .split("\n")
    .map((line) => {
      const items = line.split(" ");

      return {
        direction: items[0],
        distance: parseInt(items[1]),
      };
    });
};

export const getPart1Answer = (input: string): number => {
  const instructions = parseInput(input);
  return runSimulation(instructions);
};

export const getPart2Answer = (input: string): void => {
  return;
};
