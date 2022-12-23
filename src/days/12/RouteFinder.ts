import { HeightMap } from "./HeightMap";
import { NodeWeight as NodeCosts } from "./types";

type NodeKeys = { [key: string]: string | null };

export class RouteFinder {
  constructor(public readonly map: HeightMap) {}

  findShortest = (): number => {
    return this.dijkstra();
  };

  private dijkstra = (): number => {
    const costs = Object.assign({ end: Infinity }, this.map.nodes.start);
    const parents: NodeKeys = { end: null };
    const processed: string[] = [];

    for (let child in this.map.nodes.start) {
      parents[child] = "start";
    }

    let node = this.getLowestCostNode(costs, processed);

    while (node) {
      let cost = costs[node];
      let children = this.map.nodes[node];

      for (let n in children) {
        let newCost = cost + children[n];
        if (!costs[n] || costs[n] > newCost) {
          costs[n] = newCost;
          parents[n] = node;
        }
      }

      processed.push(node);

      node = this.getLowestCostNode(costs, processed);
    }

    const optimalPath = ["end"];
    let parent = parents["end"];

    // while (parent) {
    //   optimalPath.push(parent);
    //   parent = parents[parent];
    // }

    // optimalPath.reverse();

    // const results = {
    //   distance: costs.end,
    //   path: optimalPath,
    // };

    return costs["end"];
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
}
