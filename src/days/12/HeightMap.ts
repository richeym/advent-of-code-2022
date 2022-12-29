import { NodeWeight } from "./types";
import { HeightGrid } from "./HeightGrid";

export class RouteMap {
  nodes: Record<string, NodeWeight> = {};

  constructor(grid: HeightGrid) {
    for (let x = 0; x < grid.width; x++) {
      for (let y = 0; y < grid.height; y++) {
        const rawNode = grid.grid[y][x];
        const nodeKey = rawNode.isStart
          ? "start"
          : rawNode.isEnd
          ? "end"
          : `${x},${y}`;

        this.nodes[nodeKey] = {};

        if (nodeKey === "end") continue;

        const rightX = x + 1;
        if (
          rightX < grid.width &&
          grid.grid[y][rightX].elevation <= rawNode.elevation + 1
        ) {
          const neighbourKey = grid.grid[y][rightX].isStart
            ? "start"
            : grid.grid[y][rightX].isEnd
            ? "end"
            : `${rightX},${y}`;
          this.nodes[nodeKey][neighbourKey] = 1;
        }
        const leftX = x - 1;
        if (
          leftX >= 0 &&
          grid.grid[y][leftX].elevation <= rawNode.elevation + 1
        ) {
          const neighbourKey = grid.grid[y][leftX].isStart
            ? "start"
            : grid.grid[y][leftX].isEnd
            ? "end"
            : `${leftX},${y}`;
          this.nodes[nodeKey][neighbourKey] = 1;
        }
        const upY = y - 1;
        if (upY >= 0 && grid.grid[upY][x].elevation <= rawNode.elevation + 1) {
          const neighbourKey = grid.grid[upY][x].isStart
            ? "start"
            : grid.grid[upY][x].isEnd
            ? "end"
            : `${x},${upY}`;
          this.nodes[nodeKey][neighbourKey] = 1;
        }
        const downY = y + 1;
        if (
          downY < grid.height &&
          grid.grid[downY][x].elevation <= rawNode.elevation + 1
        ) {
          const neighbourKey = grid.grid[downY][x].isStart
            ? "start"
            : grid.grid[downY][x].isEnd
            ? "end"
            : `${x},${downY}`;
          this.nodes[nodeKey][neighbourKey] = 1;
        }
      }
    }
  }
}
