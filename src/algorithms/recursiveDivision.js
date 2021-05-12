export function recursiveDivision(grid) {
  const openSet = getGrid(grid);
  let nodesToAnimate;

  return nodesToAnimate;
}

export function getGrid(grid) {
  let nodes = [];
  for (let i = 1; i < grid.length - 1; i++) {
    for (let j = 1; j < grid[i].length - 1; j++) {
      nodes.push(grid[i][j]);
    }
  }
  return nodes;
}
