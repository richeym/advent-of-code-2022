import { HeightGrid } from "./HeightGrid";
import { HeightMap } from "./HeightMap";
import { NodeWeight as NodeCosts } from "./types";

type NodeKeys = { [key: string]: string | null };
type HeuristicFunction = (
  coordinate: string,
  endX: number,
  endY: number
) => number;

export class RouteFinder {
  private readonly heightMap: HeightMap;

  private heuristicFn: HeuristicFunction = (coordinate, endX, endY): number =>
    0;

  constructor(
    public readonly grid: HeightGrid,
    private readonly useAStar = false
  ) {
    this.heightMap = new HeightMap(grid);
    if (this.useAStar) {
      this.heuristicFn = this.aStarHeuristic;
    }
  }

  findShortest = (): { distance: number; path: string[] } => {
    const map = this.heightMap;
    const costs = Object.assign({ start: 0 }, map.nodes.start);
    const parents: NodeKeys = { end: null };
    const processed: string[] = [];

    for (let child in map.nodes.start) {
      parents[child] = "start";
    }

    let node = this.getLowestCostNode(costs, processed);

    let i = 0;
    while (node) {
      i++;
      let cost = costs[node];
      let children = map.nodes[node];

      for (let child in children) {
        const newCost =
          cost +
          children[child] +
          this.heuristicFn(child, this.grid.endX, this.grid.endY);

        if (!costs[child] || costs[child] > newCost) {
          costs[child] = newCost;
          parents[child] = node;
        }
      }

      processed.push(node);

      node = this.getLowestCostNode(costs, processed);

      if (node === "end") break;
    }

    console.log(i);
    const optimalPath = ["end"];
    let parent = parents["end"];

    while (parent && parent !== "start") {
      optimalPath.push(parent);
      parent = parents[parent];
    }

    optimalPath.reverse();

    return {
      distance: optimalPath.length,
      path: optimalPath,
    };
  };

  private getLowestCostNode = (
    costs: NodeCosts,
    processed: string[]
  ): string | null => {
    return Object.keys(costs).reduce((lowest: string | null, node: string) => {
      if (lowest === null || costs[node] < costs[lowest]) {
        if (!processed.includes(node)) {
          lowest = node;
        }
      }
      return lowest;
    }, null);
  };

  private aStarHeuristic = (
    coordinate: string,
    endX: number,
    endY: number
  ): number => {
    if (coordinate === "start" || coordinate === "end") return 0;

    const [x, y] = coordinate.split(",").map(Number);

    const h = Math.abs(x - endX) + Math.abs(y - endY);

    // console.log(`${coordinate}, ${endX}, ${endY}, ${h}`);
    return h;
  };
}
