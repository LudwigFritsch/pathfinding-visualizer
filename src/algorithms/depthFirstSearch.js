export function depthFirstSearch(grid, startNode, endNode) {
  const stack = [];
  const visitedNodesInOrder = [];
  startNode.status = 2;
  stack.push(startNode);
  while (stack.length > 0) {
    const curNode = stack.shift();
    if (curNode === endNode || curNode.status === 1) {
      visitedNodesInOrder.push(endNode);
      return visitedNodesInOrder;
    }
    if (curNode.isWall && curNode !== startNode && curNode !== endNode) {
      continue;
    }
    curNode.status = 3;
    visitedNodesInOrder.push(curNode);
    const neighbors = getUnvisitedNeighbors(curNode, grid);
    for (let i = 0; i < neighbors.length; i++) {
      neighbors[i].status = 2;
      neighbors[i].prevNode = curNode;
      stack.push(neighbors[i]);
    }
  }
}

export function sortNodesByDistance(unvisitedNodes) {
  unvisitedNodes.sort((a, b) => a.distance - b.distance);
}

export function getUnvisitedNeighbors(node, grid) {
  const neighbors = [];
  const { col, row } = node;
  if (row > 0) neighbors.push(grid[row - 1][col]);
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
  if (col > 0) neighbors.push(grid[row][col - 1]);
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
  return neighbors.filter((neighbor) => neighbor.status === 1);
}

export function getGrid(grid) {
  let nodes = [];
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      nodes.push(grid[i][j]);
    }
  }
  return nodes;
}
