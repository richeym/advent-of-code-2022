var util = require("util");
import { Node } from "./Node";

export class HeightGrid {
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
  }
}
