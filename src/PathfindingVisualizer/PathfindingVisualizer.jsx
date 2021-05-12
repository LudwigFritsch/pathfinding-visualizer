import React, { Component } from "react";
import { dijkstra } from "../algorithms/dijkstra";
import { aStarSearch } from "../algorithms/aStarSearch.js";
import { greedyBestFirstSearch } from "../algorithms/greedyBestFirstSearch.js";
import { getNodesInShortestPathOrder } from "../algorithms/getNodesInShortestPathOrder.js";
import { depthFirstSearch } from "../algorithms/depthFirstSearch.js";
import Node from "./Node/Node.jsx";
import "./PathfindingVisualizer.css";
import "./Node/Node.css";

export default class PathfindingVisualizer extends Component {
  constructor() {
    super();
    this.state = {
      grid: [],
      mouseIsPressed: false,
      mouseOnStart: false,
      mouseOnFinish: false,
      startNodeRow: 15,
      startNodeCol: 15,
      finishNodeRow: 10,
      finishNodeCol: 50,
    };

    this.makeAlgorithm = this.makeAlgorithm.bind(this);
  }

  componentDidMount() {
    const startNodeRow = this.state.startNodeRow;
    const startNodeCol = this.state.startNodeCol;
    const finishNodeRow = this.state.finishNodeRow;
    const finishNodeCol = this.state.finishNodeCol;
    this.setState({
      grid: getInitialGrid(
        startNodeRow,
        startNodeCol,
        finishNodeRow,
        finishNodeCol
      ),
    });
  }

  makeAlgorithm(algorithm) {
    const grid = this.state.grid;
    const startNode = grid[this.state.startNodeRow][this.state.startNodeCol];
    const finishNode = grid[this.state.finishNodeRow][this.state.finishNodeCol];
    let visitedNodesInOrder;
    if (algorithm === "dijkstra") {
      visitedNodesInOrder = visitedNodesInOrder = dijkstra(
        grid,
        startNode,
        finishNode
      );
    } else if (algorithm === "aStar") {
      visitedNodesInOrder = visitedNodesInOrder = aStarSearch(
        grid,
        startNode,
        finishNode
      );
    } else if (algorithm === "greedy") {
      visitedNodesInOrder = visitedNodesInOrder = greedyBestFirstSearch(
        grid,
        startNode,
        finishNode
      );
    } else if (algorithm === "depth") {
      visitedNodesInOrder = visitedNodesInOrder = depthFirstSearch(
        grid,
        startNode,
        finishNode
      );
    }
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    this.animate(visitedNodesInOrder, nodesInShortestPathOrder);
  }

  animate(visitedNodesInOrder, nodesInShortestPathOrder) {
    for (let i = 0; i < visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length - 1) {
        setTimeout(() => {
          this.animateShortestPath(nodesInShortestPathOrder);
        }, i * 15);
      }

      if (i < visitedNodesInOrder.length - 1) {
        setTimeout(() => {
          const node = visitedNodesInOrder[i + 1];
          document.getElementById(`node-${node.row}-${node.col}`).className =
            "node-pre";
        }, 15 * i);
      }

      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "node-visited";
      }, 15 * i);
    }
  }

  animateShortestPath(nodesInShortestPathOrder) {
    nodesInShortestPathOrder.shift();
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "node-shortest-path";
      }, 15 * i);
    }
  }

  handleMouseDown(row, col, isStart, isFinish) {
    if (isStart) {
      const newGrid = deleteStart(this.state.grid, row, col);
      this.setState({ grid: newGrid, mouseOnStart: true });
    } else if (isFinish) {
      const newGrid = deleteFinish(this.state.grid, row, col);
      this.setState({ grid: newGrid, mouseOnFinish: true });
    } else {
      const newGrid = getGridWithWallToggled(this.state.grid, row, col);
      this.setState({ grid: newGrid, mouseIsPressed: true });
    }
  }

  handleMouseEnter(row, col) {
    if (this.state.mouseOnStart) {
      const newGrid = makeStart(this.state.grid, row, col);
      this.setState({
        grid: newGrid,
        mouseOnStart: true,
        startNodeRow: row,
        startNodeCol: col,
      });
    } else if (this.state.mouseOnFinish) {
      const newGrid = makeFinish(this.state.grid, row, col);
      this.setState({
        grid: newGrid,
        mouseOnFinish: true,
        finishNodeRow: row,
        finishNodeCol: col,
      });
    } else if (this.state.mouseIsPressed) {
      const newGrid = getGridWithWallToggled(this.state.grid, row, col);
      this.setState({ grid: newGrid });
    }
  }

  handleMouseUp(row, col) {
    if (this.state.mouseOnStart) {
      const newGrid = makeStart(this.state.grid, row, col);
      this.setState({
        grid: newGrid,
        mouseOnStart: false,
        startNodeRow: row,
        startNodeCol: col,
      });
    } else if (this.state.mouseOnFinish) {
      const newGrid = makeFinish(this.state.grid, row, col);
      this.setState({
        grid: newGrid,
        mouseOnFinish: false,
        finishNodeRow: row,
        finishNodeCol: col,
      });
    } else {
      this.setState({ mouseIsPressed: false });
    }
  }

  handleMouseLeave(row, col) {
    if (this.state.mouseOnStart) {
      const newGrid = deleteStart(this.state.grid, row, col);
      this.setState({ grid: newGrid });
    } else if (this.state.mouseOnFinish) {
      const newGrid = deleteFinish(this.state.grid, row, col);
      this.setState({ grid: newGrid });
    }
  }

  render() {
    console.log("times");
    const grid = this.state.grid;
    return (
      <div>
        <button onClick={() => this.makeAlgorithm("dijkstra")}>Dijkstra</button>
        <button onClick={() => this.makeAlgorithm("aStar")}>A*</button>
        <button onClick={() => this.makeAlgorithm("greedy")}>Greedy</button>
        <button onClick={() => this.makeAlgorithm("depth")}>Depth</button>
        <div className="grid">
          {grid.map((row, rowIdx) => {
            return row.map((node, colIdx) => {
              const { row, col, isFinish, isStart, isWall } = node;
              return (
                <Node
                  row={row}
                  col={col}
                  isFinish={isFinish}
                  isStart={isStart}
                  isWall={isWall}
                  key={`node-${row}-${col}`}
                  onMouseDown={(row, col, isStart, isFinish) => {
                    this.handleMouseDown(row, col, isStart, isFinish);
                  }}
                  onMouseEnter={(row, col, isStart, isFinish) => {
                    this.handleMouseEnter(row, col, isStart, isFinish);
                  }}
                  onMouseUp={(row, col) => this.handleMouseUp(row, col)}
                  onMouseLeave={(row, col) => {
                    this.handleMouseLeave(row, col);
                  }}
                />
              );
            });
          })}
        </div>
      </div>
    );
  }
}

export function createNode(
  row,
  col,
  startNodeRow,
  startNodeCol,
  finishNodeRow,
  finishNodeCol
) {
  return {
    row: row,
    col: col,
    isStart: row === startNodeRow && col === startNodeCol,
    isFinish: row === finishNodeRow && col === finishNodeCol,
    isWall: false,
    distance: "Infinity",
    prevNode: "none",
    gCost: 9000000,
    hCost: 9000000,
    fCost: 9000000,
    status: 1,
  };
}

export function getInitialGrid(
  startNodeRow,
  startNodeCol,
  finishNodeRow,
  finishNodeCol
) {
  const grid = [];
  for (let i = 0; i < 31; i++) {
    let row = [];
    for (let j = 0; j < 75; j++) {
      row.push(
        createNode(
          i,
          j,
          startNodeRow,
          startNodeCol,
          finishNodeRow,
          finishNodeCol
        )
      );
    }
    grid.push(row);
  }
  return grid;
}

export function getGridWithWallToggled(grid, row, col) {
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  const newNode = {
    ...node,
    isWall: !node.isWall,
  };
  newGrid[row][col] = newNode;
  return newGrid;
}

export function makeStart(grid, row, col) {
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  const newNode = {
    ...node,
    isStart: true,
  };
  newGrid[row][col] = newNode;
  return newGrid;
}

export function makeFinish(grid, row, col) {
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  const newNode = {
    ...node,
    isFinish: true,
  };
  newGrid[row][col] = newNode;
  return newGrid;
}

export function deleteStart(grid, row, col) {
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  const newNode = {
    ...node,
    isStart: false,
  };
  newGrid[row][col] = newNode;
  return newGrid;
}

export function deleteFinish(grid, row, col) {
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  const newNode = {
    ...node,
    isFinish: false,
  };
  newGrid[row][col] = newNode;
  return newGrid;
}
