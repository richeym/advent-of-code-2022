export interface Vector {
  direction: string;
  distance: number;
}

export interface Coordinate {
  x: number;
  y: number;
}

export class Rope {
  readonly knotPositions: Coordinate[] = [];
  readonly head: Coordinate;

  constructor(knots: number = 2) {
    if (knots < 2) {
      throw Error("Must be at least two knots in a rope");
    }

    for (let i = 0; i < knots; i++) {
      this.knotPositions.push({ x: 0, y: 0 });
    }

    this.head = this.knotPositions[0];
  }

  move = (vector: Vector): Coordinate[] => {
    const visited: Coordinate[] = [];

    for (let _ = 0; _ < vector.distance; _++) {
      let lastMovedKnotPriorLocation: Coordinate = Object.assign({}, this.head);

      this.moveHead(vector.direction);

      let knotMoved = true;
      for (let i = 1; i < this.knotPositions.length && knotMoved; i++) {
        const chasingKnot = this.knotPositions[i];
        const movedKnot = this.knotPositions[i - 1];
        if (
          Math.abs(movedKnot.x - chasingKnot.x) > 1 ||
          Math.abs(movedKnot.y - chasingKnot.y) > 1
        ) {
          let chasingKnotLocationBeforeMove = Object.assign({}, chasingKnot);

          chasingKnot.x = lastMovedKnotPriorLocation.x;
          chasingKnot.y = lastMovedKnotPriorLocation.y;

          if (i === this.knotPositions.length - 1) {
            visited.push(Object.assign({}, this.knotPositions[i]));
          }
          lastMovedKnotPriorLocation = Object.assign(
            {},
            chasingKnotLocationBeforeMove
          );

          knotMoved = true;
        } else {
          knotMoved = false;
        }
      }
    }

    return visited;
  };

  moveHead = (direction: string): void => {
    if (direction === "R") {
      this.head.x++;
    }
    if (direction === "L") {
      this.head.x--;
    }
    if (direction === "U") {
      this.head.y--;
    }
    if (direction === "D") {
      this.head.y++;
    }
  };

  simulate = (vectors: Vector[]): number => {
    const visited: Coordinate[] = [{ x: 0, y: 0 }];

    for (let vector of vectors) {
      const visitedCoordinatesThisMove = this.move(vector);

      for (let visitedCoordinateThisMove of visitedCoordinatesThisMove) {
        if (
          !visited.find(
            (coord) =>
              coord.x === visitedCoordinateThisMove.x &&
              coord.y === visitedCoordinateThisMove.y
          )
        ) {
          visited.push(visitedCoordinateThisMove);
        }
      }
    }

    return visited.length;
  };
}

export const visualize = (rope: Rope): void => {
  const knotPositions = rope.knotPositions;
  let minX = Math.min(...rope.knotPositions.map((knot) => knot.x));
  let maxX = Math.max(...rope.knotPositions.map((knot) => knot.x));
  let minY = Math.min(...rope.knotPositions.map((knot) => knot.y));
  let maxY = Math.max(...rope.knotPositions.map((knot) => knot.x));

  console.log(`${minX},${minY},${maxX},${maxY}`);
  let grid: string = "";
  for (let y = minY; y <= maxY; y++) {
    for (let x = minX; x <= maxX; x++) {
      const knot = knotPositions.find((knot) => knot.x === x && knot.y === y);
      if (knot) {
        const index = knotPositions.indexOf(knot);
        const marker =
          index === 0 ? "H" : index === knotPositions.length - 1 ? "T" : index;

        grid += marker.toString();
      } else {
        grid += ".";
      }
    }
    grid += "\n";
  }

  console.log(grid);
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
  const rope = new Rope();
  return rope.simulate(instructions);
};

export const getPart2Answer = (input: string): void => {
  return;
};
