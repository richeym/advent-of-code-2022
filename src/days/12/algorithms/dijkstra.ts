import { RouteMap } from "../HeightMap";
import { NodeKeys, NodeWeight, Route } from "../types";
export const dijkstra = (map: RouteMap): Route => {
  const costs = Object.assign({ start: 0 }, map.nodes.start);
  const parents: NodeKeys = { end: null };
  const processed: string[] = [];

  for (let child in map.nodes.start) {
    parents[child] = "start";
  }

  let node = getLowestCostNode(costs, processed);

  let i = 0;
  while (node) {
    i++;
    let cost = costs[node];
    let children = map.nodes[node];

    for (let child in children) {
      const newCost = cost + children[child];
      if (!costs[child] || costs[child] > newCost) {
        costs[child] = newCost;
        parents[child] = node;
      }
    }

    processed.push(node);

    node = getLowestCostNode(costs, processed);

    if (node === "end") break;
  }

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

const getLowestCostNode = (
  weights: NodeWeight,
  processed: string[]
): string | null => {
  return Object.keys(weights).reduce((lowest: string | null, node: string) => {
    if (lowest === null || weights[node] < weights[lowest]) {
      if (!processed.includes(node)) {
        lowest = node;
      }
    }
    return lowest;
  }, null);
};
