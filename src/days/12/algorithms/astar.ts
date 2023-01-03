import { RouteMap } from "../HeightMap";
import { NodeKeys, NodeWeight, Route } from "../types";
import util from "util";

class Cost {
  f: number;

  constructor(
    readonly key: string,
    public parent: Cost | null,
    readonly g: number, // cost to move from the starting point A to this square, following the path generated to get there.
    readonly h: number // estimated movement cost to move from that given square on the grid to the final destination, point B
  ) {
    this.f = g + h;
  }
}

export const astar = (map: RouteMap, endX: number, endY: number): Route => {
  const startingNodeCost = new Cost("start", null, 0, 0);

  const openList: Cost[] = [startingNodeCost]; // list of nodes to evaluate next
  const closedList: Cost[] = []; // list of nodes already evaluated and to be ignored

  let currentNode: Cost | null = null;

  while (openList.length > 0 && !closedList.find((x) => x.key === "end")) {
    currentNode = findLowestCostFNodeIn(openList);
    moveNodeFromOpenToClosedList(currentNode, openList, closedList);

    for (let adjacentNodeKey in map.nodes[currentNode.key]) {
      if (nodeIsInClosedList(adjacentNodeKey, closedList)) {
        continue;
      }

      // calculate F, G, and H cost of the node using Manhattan heuristic
      let costForPathToCurrentNode = new Cost(
        adjacentNodeKey,
        currentNode,
        map.nodes[currentNode.key][adjacentNodeKey],
        getManhattanHeuristic(adjacentNodeKey, endX, endY)
      );

      // if on the open list, check to see if the path to this square is better
      const bestCostForCurrentNode = openList.find(
        (x: Cost) => x.key === adjacentNodeKey
      )!;
      if (bestCostForCurrentNode) {
        // if the path to this square is better, record the cost and update the parent
        if (costForPathToCurrentNode.g < bestCostForCurrentNode.g) {
          openList[openList.indexOf(bestCostForCurrentNode)] =
            costForPathToCurrentNode;
        }
      }
      // if not on the open list, add it
      else {
        openList.push(costForPathToCurrentNode);
      }
    }
  }

  let path: Cost[] = [];
  let currentPathNode: Cost | null = closedList.find((x) => x.key === "end")!;
  while (currentPathNode !== null) {
    path.push(currentPathNode);
    currentPathNode = currentPathNode.parent;
  }

  // remove start node and flip route
  path = path.reverse().splice(1);

  const results = {
    distance: path.length,
    path: path.map((x) => x.key),
  };

  return results;
};

const findLowestCostFNodeIn = (costs: Cost[]): Cost => {
  const lowestCodeNode = costs.reduce((lowest: Cost | null, node: Cost) => {
    if (lowest === null || node.f < lowest.f) {
      lowest = node;
    }
    return lowest;
  }, null);

  if (lowestCodeNode === null) throw Error("Error finding lowest cost node");
  return lowestCodeNode;
};

const getManhattanHeuristic = (
  coordinate: string,
  endX: number,
  endY: number
): number => {
  if (coordinate === "start" || coordinate === "end") return 0;

  const [x, y] = coordinate.split(",").map(Number);

  const h = Math.abs(x - endX) + Math.abs(y - endY);

  return h;
};

const moveNodeFromOpenToClosedList = (
  currentNode: Cost,
  openList: Cost[],
  closedList: Cost[]
): void => {
  closedList.push(currentNode);
  openList.splice(openList.indexOf(currentNode), 1);
};

const nodeIsInClosedList = (adjacentNodeKey: string, closedList: Cost[]) =>
  closedList.find((node) => node.key === adjacentNodeKey) !== undefined;
