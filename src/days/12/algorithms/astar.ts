import { RouteMap } from "../HeightMap";
import { NodeKeys, NodeWeight, Route } from "../types";
import util from "util";
import { writeFileSync } from "fs";
import { join } from "path";
import { findStartOfPacketMarker } from "../../06";

class NodeEvaluation {
  f: number;

  constructor(
    readonly key: string,
    public parent: NodeEvaluation | null,
    readonly g: number, // cost to move from the starting point A to this square, following the path generated to get there.
    readonly h: number // estimated movement cost to move from a given square on the grid to the final destination, point B
  ) {
    this.f = g + h;
  }
}

export const astar = (map: RouteMap, endX: number, endY: number): Route => {
  const startingNodeCost = new NodeEvaluation("start", null, 0, 0);

  const openList: NodeEvaluation[] = [startingNodeCost]; // list of nodes to evaluate next
  const closedList: NodeEvaluation[] = []; // list of nodes already evaluated and to be ignored

  let currentNode: NodeEvaluation | null = null;

  while (openList.length > 0 && !closedList.find((x) => x.key === "end")) {
    currentNode = findLowestCostFNodeIn(openList);
    moveNodeFromOpenToClosedList(currentNode, openList, closedList);

    for (let adjacentNodeKey in map.nodes[currentNode.key]) {
      if (nodeIsInClosedList(adjacentNodeKey, closedList)) {
        continue;
      }

      const g = currentNode.g + map.nodes[currentNode.key][adjacentNodeKey];

      let costForPathToCurrentNode = new NodeEvaluation(
        adjacentNodeKey,
        currentNode,
        g,
        getManhattanHeuristic(adjacentNodeKey, endX, endY)
      );

      // find the node on the open list
      const bestCostForCurrentNode = openList.find(
        (x: NodeEvaluation) => x.key === adjacentNodeKey
      )!;

      // if the node is on the open list but the path to this square is better, record the cost and update the parent
      if (bestCostForCurrentNode) {
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

  const path = getPathToTargetNode(closedList);

  const results = {
    distance: path.length,
    path: path.map((x) => x.key),
  };

  return results;
};

const findLowestCostFNodeIn = (costs: NodeEvaluation[]): NodeEvaluation => {
  const lowestCodeNode = costs.reduce(
    (lowest: NodeEvaluation | null, node: NodeEvaluation) => {
      if (lowest === null || node.f < lowest.f) {
        lowest = node;
      }
      return lowest;
    },
    null
  );

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
  currentNode: NodeEvaluation,
  openList: NodeEvaluation[],
  closedList: NodeEvaluation[]
): void => {
  closedList.push(currentNode);
  openList.splice(openList.indexOf(currentNode), 1);
};

const nodeIsInClosedList = (
  adjacentNodeKey: string,
  closedList: NodeEvaluation[]
) => closedList.find((node) => node.key === adjacentNodeKey) !== undefined;

const getPathToTargetNode = (
  closedList: NodeEvaluation[]
): NodeEvaluation[] => {
  let path: NodeEvaluation[] = [];
  let currentPathNode: NodeEvaluation | null = closedList.find(
    (x) => x.key === "end"
  )!;
  while (currentPathNode !== null) {
    path.push(currentPathNode);
    currentPathNode = currentPathNode.parent;
  }

  // remove start node and flip route
  path = path.reverse().splice(1);
  return path;
};
