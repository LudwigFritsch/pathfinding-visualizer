import React, { useState } from "react";
import { dijkstra } from "../algorithms/dijkstra";
import { aStarSearch } from "../algorithms/aStarSearch.js";
import { greedyBestFirstSearch } from "../algorithms/greedyBestFirstSearch.js";
import { getNodesInShortestPathOrder } from "../algorithms/getNodesInShortestPathOrder.js";
import { depthFirstSearch } from "../algorithms/depthFirstSearch.js";
import { recursiveDivision } from "../algorithms/recursiveDivision.js";
import Node from "./Node/Node.jsx";
import "./PathfindingVisualizer.css";
import "./Node/Node.css";

let algorithmDisplayed = "";
let algorithmDone = false;
let mouseIsPressed = false;
let mouseOnStart = false;
let mouseOnFinish = false;
let mouseOnBomb = false;
export let startNodeRow = 15;
export let startNodeCol = 19;
let finishNodeRow = 15;
let finishNodeCol = 55;
let bombDisplay = "Add a bomb";
export let isBombActive = false;
export let bombNodeRow;
export let bombNodeCol;
let grid = getInitialGrid(
  startNodeRow,
  startNodeCol,
  finishNodeRow,
  finishNodeCol,
  bombNodeRow,
  bombNodeCol
);

const PathfindingVisualizerFunctionalComponent = () => {
  console.log(bombNodeRow, bombNodeCol);
  // try {
  //   document.getElementById(`node-${bombNodeRow}-${bombNodeCol}`).className =
  //     "node-bomb";
  // } catch {}
  const [animationSpeed, setAnmationSpeed] = useState("Fast");
  const [bomb, setBomb] = useState(true);
  const [algorithm, setAlgorithm] = useState("");
  return (
    <div>
      <div className="navBar">
        <a
          href="./PathfindingVisualizerFunctionalComponent.jsx"
          className="homeButton"
        >
          PathfindingVisualizer
        </a>

        <div className="dropdown">
          <button className="dropdown-algorithms" onClick={displayAlgorithms}>
            Algorithms ▼
          </button>
          <div className="algorithms-content" id="algorithms">
            <button
              onClick={() => {
                algorithmDisplayed = "Dijkstra´s";
                setAlgorithm("dijkstra");
              }}
              className="dropdown-btn"
            >
              Dijkstra
            </button>
            <button
              onClick={() => {
                setAlgorithm("aStar");
                algorithmDisplayed = "A*";
              }}
              className="dropdown-btn"
            >
              A*
            </button>
            <button
              onClick={() => {
                setAlgorithm("greedy");
                algorithmDisplayed = "Greedy";
              }}
              className="dropdown-btn"
            >
              Greedy
            </button>
            <button
              onClick={() => {
                setAlgorithm("depth");
                algorithmDisplayed = "DFS";
              }}
              className="dropdown-btn"
            >
              Depth
            </button>
          </div>
        </div>
        {/* <button
          className="dropdown"
          onClick={() => {
            basicRandomMaze();
            algorithmDone = false;
          }}
        >
          Mazes &amp; Patterns
        </button> */}
        <button
          onClick={() => {
            bombNodeRow = 15;
            bombNodeCol = 37;
            setBomb(!bomb);
            const newGrid = changeBomb(grid, bombNodeRow, bombNodeCol, bomb);
            grid = newGrid;
            isBombActive = !isBombActive;
            bombDisplay =
              bombDisplay === "Add a bomb" ? "Remove bomb" : "Add a bomb";
            if (!isBombActive) {
              grid = getGrid(
                startNodeRow,
                startNodeCol,
                finishNodeRow,
                finishNodeCol
              );
              resetGrid();
            }
          }}
        >
          {bombDisplay}
        </button>
        <button
          className="visualize"
          onClick={() => {
            if (algorithm === "") return;
            document.getElementById("grid").className = "grid-not-clickable";
            makeAlgorithm(algorithm, animationSpeed);
          }}
        >
          Visualize {algorithmDisplayed}
        </button>
        <button onClick={clearBord}>Clear Bord</button>
        <button onClick={clearWalls}>Clear walls and weights</button>
        <button onClick={clearPath}>Clear Path</button>

        <div className="dropdown">
          <button
            className="dropdown-animationSpeed"
            onClick={displayAnimationSpeed}
          >
            Speed: {animationSpeed} ▼
          </button>
          <div className="animationSpeed-content" id="animationSpeed">
            <button
              className="dropdown-btn"
              onClick={() => {
                setAnmationSpeed("Fast");
              }}
            >
              Fast
            </button>
            <button
              className="dropdown-btn"
              onClick={() => {
                setAnmationSpeed("Average");
              }}
            >
              Average
            </button>
            <button
              className="dropdown-btn"
              onClick={() => {
                setAnmationSpeed("Slow");
              }}
            >
              Slow
            </button>
          </div>
        </div>
      </div>
      <div className="explanationSection">
        <div className="nodes">
          <div className="nodeExplanation">
            <img
              src="https://svgshare.com/getbyhash/sha1-yAWHMbXmBhkwTLV77DIPjK7SHn4="
              alt="startNode"
            />
            <p className="node-description"> Start Node</p>
          </div>
          <div className="nodeExplanation">
            <img
              src="https://svgshare.com/getbyhash/sha1-c7hqbypOmeOvdRvpH2Af8e2mbnU="
              alt="startNode"
            />
            <p className="node-description"> Target Node</p>
          </div>
          <div className="nodeExplanation">
            <img
              src="https://svgshare.com/getbyhash/sha1-azrTpZ1HoMGS3EXrju+GximBV64="
              alt="startNode"
            />
            <p className="node-description"> Bomb Node</p>
          </div>
          <div className="nodeExplanation">
            <img src="https://svgshare.com/i/Wjd.svg" alt="startNode" />
            <p className="node-description"> Weigth Node</p>
          </div>
          <div className="nodeExplanation">
            <div className="unvisited-node-explanation"></div>
            <p> Unvisited Node</p>
          </div>
          <div className="nodeExplanation">
            <div className="visitedNodes">
              <div className="visited-node-explanation-green"></div>
              <div className="visited-node-explanation-purple"></div>
            </div>

            <p> Visited Node</p>
          </div>
          <div className="nodeExplanation">
            <div className="shortest-node-explanation"></div>
            <p> Shortest Node</p>
          </div>
          <div className="nodeExplanation">
            <div className="wall-node-explanation"></div>
            <p> Wall Node</p>
          </div>
        </div>
        {/* <div className="pickAlgorithm">Pick an algorithm to visualize it!</div> */}
      </div>
      <div className="grid" id="grid">
        {grid.map((row) => {
          return row.map((node) => {
            const { row, col, isFinish, isStart, isWall, isBomb } = node;
            return (
              <Node
                id={`node-${row}-${col}`}
                row={row}
                col={col}
                isFinish={isFinish}
                isStart={isStart}
                isWall={isWall}
                isBomb={isBomb}
                key={`node-${row}-${col}`}
                onMouseDown={(row, col, isStart, isFinish, bomb) => {
                  handleMouseDown(row, col, isStart, isFinish, bomb);
                }}
                onMouseEnter={(row, col) => {
                  handleMouseEnter(row, col);
                }}
                onMouseUp={(row, col) => handleMouseUp(row, col)}
                onMouseLeave={(row, col) => {
                  handleMouseLeave(row, col);
                }}
              />
            );
          });
        })}
      </div>
    </div>
  );
};

export function clearBord() {
  algorithmDone = false;
  startNodeRow = 15;
  startNodeCol = 19;
  finishNodeRow = 15;
  finishNodeCol = 55;
  bombNodeRow = "";
  bombNodeCol = "";

  const newGrid = [];
  for (let i = 0; i < 30; i++) {
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
    newGrid.push(row);
  }
  grid = newGrid;

  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
      const nodeCopy = grid[row][col];
      const node = document.getElementById(`node-${row}-${col}`);

      node.className = "node";

      if (row === startNodeRow && col === startNodeCol)
        node.className = "node-start";
      if (row === finishNodeRow && col === finishNodeCol)
        node.className = "node-finish";
    }
  }
}

export function clearPath() {
  algorithmDone = false;
  grid = getGrid(startNodeRow, startNodeCol, finishNodeRow, finishNodeCol);
  resetGrid();
}

export function clearWalls() {
  algorithmDone = false;
  grid = getGrid(startNodeRow, startNodeCol, finishNodeRow, finishNodeCol);
  makeGridOnFirstRender();
}

export function makeRecursiveDivision(aSpeed) {
  let animationSpeed;
  if (aSpeed === "Fast") {
    animationSpeed = 10;
  } else if (aSpeed === "Average") {
    animationSpeed = 50;
  } else {
    animationSpeed = 80;
  }
  getInitialGrid(startNodeRow, startNodeCol, finishNodeRow, finishNodeCol);
  makeGridOnFirstRender();
  const gridToAnimate = [];
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
      const node = grid[row][col];
      if (!node.isStart && !node.isFinish && row === 0) {
        node.isWall = true;
        gridToAnimate.push(node);
      } else if (!node.isStart && !node.isFinish && col === 0 && row !== 0) {
        node.isWall = true;
        gridToAnimate.push(node);
      } else if (!node.isStart && !node.isFinish && col === 74 && row !== 0) {
        node.isWall = true;
        gridToAnimate.push(node);
      } else if (
        !node.isStart &&
        !node.isFinish &&
        col !== 75 &&
        col !== 0 &&
        row === 30
      ) {
        node.isWall = true;
        gridToAnimate.push(node);
      }
    }
  }
  recursiveDivision(grid);
  for (let i = 0; i < gridToAnimate.length; i++) {
    setTimeout(() => {
      const node = gridToAnimate[i];
      document.getElementById(`node-${node.row}-${node.col}`).className =
        "node-wall";
    }, i * animationSpeed);
  }
}

export function basicRandomMaze() {
  resetGrid();
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (!grid[i][j].isStart && !grid[i][j].isFinish) {
        const wall = Math.random();
        if (wall < 0.3) {
          eventFire(document.getElementById(`node-${i}-${j}`), "mousedown");
          eventFire(document.getElementById(`node-${i}-${j}`), "mouseup");
          grid[i][j].isWall = true;
        } else {
          grid[i][j].isWall = false;
          document.getElementById(`node-${i}-${j}`).className = "node";
        }
      }
    }
  }
}

function eventFire(el, etype) {
  if (el.fireEvent) {
    el.fireEvent("on" + etype);
  } else {
    var evObj = document.createEvent("Events");
    evObj.initEvent(etype, true, false);
    el.dispatchEvent(evObj);
  }
}

export default PathfindingVisualizerFunctionalComponent;

window.onclick = function (event) {
  if (!event.target.matches(".dropdown-algorithms")) {
    let dropdowns = document.getElementsByClassName("algorithms-content");
    for (let i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains("show")) {
        openDropdown.classList.remove("show");
      }
    }
  }
  if (!event.target.matches(".dropdown-animationSpeed")) {
    let dropdowns = document.getElementsByClassName("animationSpeed-content");
    for (let i = 0; i < dropdowns.length; i++) {
      openDropdown = dropdowns[i];
      if (openDropdown.classList.contains("show")) {
        openDropdown.classList.remove("show");
      }
    }
  }
};

export function displayAnimationSpeed() {
  document.getElementById("animationSpeed").classList.toggle("show");
}

export function displayAlgorithms() {
  document.getElementById("algorithms").classList.toggle("show");
}

export function createNode(
  row,
  col,
  startNodeRow,
  startNodeCol,
  finishNodeRow,
  finishNodeCol,
  bombNodeRow,
  bombNodeCol
) {
  return {
    row: row,
    col: col,
    isStart: row === startNodeRow && col === startNodeCol,
    isFinish: row === finishNodeRow && col === finishNodeCol,
    isWall: false,
    isVisited: false,
    distance: "Infinity",
    prevNode: "none",
    gCost: 1000,
    hCost: 1000,
    fCost: 1000,
    status: 1,
    isBomb: row === bombNodeRow && col === bombNodeCol,
  };
}

export function createNewNode(
  row,
  col,
  startNodeRow,
  startNodeCol,
  finishNodeRow,
  finishNodeCol,
  wall,
  bombNodeRow,
  bombNodeCol
) {
  return {
    row: row,
    col: col,
    isStart: row === startNodeRow && col === startNodeCol,
    isFinish: row === finishNodeRow && col === finishNodeCol,
    isWall: wall,
    isVisited: false,
    distance: "Infinity",
    prevNode: "none",
    gCost: 1000,
    hCost: 1000,
    fCost: 1000,
    status: 1,
    isBomb: row === bombNodeRow && col === bombNodeCol,
  };
}

export function getGrid(
  startNodeRow,
  startNodeCol,
  finishNodeRow,
  finishNodeCol,
  bombNodeRow,
  bombNodeCol
) {
  const newGrid = [];
  for (let i = 0; i < grid.length; i++) {
    let row = [];
    for (let j = 0; j < grid[i].length; j++) {
      const node = grid[i][j];

      row.push(
        createNewNode(
          i,
          j,
          startNodeRow,
          startNodeCol,
          finishNodeRow,
          finishNodeCol,
          node.isWall,
          bombNodeRow,
          bombNodeCol
        )
      );
    }
    newGrid.push(row);
  }
  return newGrid;
}

export function getInitialGrid(
  startNodeRow,
  startNodeCol,
  finishNodeRow,
  finishNodeCol,
  bombNodeRow,
  bombNodeCol
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
          finishNodeCol,
          bombNodeRow,
          bombNodeCol
        )
      );
    }
    grid.push(row);
  }
  return grid;
}

export function resetGrid() {
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
      const nodeCopy = grid[row][col];
      const node = document.getElementById(`node-${row}-${col}`);
      if (!nodeCopy.isWall) {
        node.className = "node";
      }
      if (row === startNodeRow && col === startNodeCol)
        node.className = "node-start";
      if (row === finishNodeRow && col === finishNodeCol)
        node.className = "node-finish";
      if (row === bombNodeRow && col === bombNodeCol && isBombActive)
        node.className = "node-bomb";
    }
  }
}

export function makeGridOnFirstRender() {
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
      const node = document.getElementById(`node-${row}-${col}`);

      node.className = "node";

      if (row === startNodeRow && col === startNodeCol)
        node.className = "node-start";
      if (row === finishNodeRow && col === finishNodeCol)
        node.className = "node-finish";
      if (row === bombNodeRow && col === bombNodeCol)
        node.className = "node-bomb";
    }
  }
}

export function makeAlgorithm(algorithm, aSpeed) {
  grid = getGrid(startNodeRow, startNodeCol, finishNodeRow, finishNodeCol);
  resetGrid();
  let animationSpeed;
  let shortestPathSpeed;
  let visitedNodesInOrder;
  let visitedNodesInOrderTwo;

  if (aSpeed === "Fast") {
    animationSpeed = 15;
    shortestPathSpeed = 50;
  } else if (aSpeed === "Average") {
    animationSpeed = 25;
    shortestPathSpeed = 70;
  } else {
    animationSpeed = 70;
    shortestPathSpeed = 100;
  }

  // if (algorithm === "") return;
  const startNode = grid[startNodeRow][startNodeCol];
  const finishNode = grid[finishNodeRow][finishNodeCol];
  let bomb;
  try {
    bomb = grid[bombNodeRow][bombNodeCol];
  } catch {}

  if (!isBombActive) {
    if (algorithm === "dijkstra") {
      visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
    } else if (algorithm === "aStar") {
      visitedNodesInOrder = aStarSearch(grid, startNode, finishNode);
    } else if (algorithm === "greedy") {
      visitedNodesInOrder = greedyBestFirstSearch(grid, startNode, finishNode);
    } else if (algorithm === "depth") {
      visitedNodesInOrder = depthFirstSearch(grid, startNode, finishNode);
    }
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    animate(
      visitedNodesInOrder,
      nodesInShortestPathOrder,
      animationSpeed,
      shortestPathSpeed
    );
  } else {
    let nodesInShortestPathOrder = [];
    if (algorithm === "dijkstra") {
      visitedNodesInOrder = dijkstra(grid, startNode, bomb);
      nodesInShortestPathOrder = getNodesInShortestPathOrder(bomb);
      gridAfterBomb();
      visitedNodesInOrderTwo = dijkstra(grid, bomb, finishNode);
    } else if (algorithm === "aStar") {
      visitedNodesInOrder = aStarSearch(grid, startNode, bomb);
      nodesInShortestPathOrder = getNodesInShortestPathOrder(bomb);
      gridAfterBomb();
      visitedNodesInOrderTwo = aStarSearch(grid, bomb, finishNode);
    } else if (algorithm === "greedy") {
      visitedNodesInOrder = greedyBestFirstSearch(grid, startNode, bomb);
      nodesInShortestPathOrder = getNodesInShortestPathOrder(bomb);
      gridAfterBomb();
      visitedNodesInOrderTwo = greedyBestFirstSearch(grid, bomb, finishNode);
    } else if (algorithm === "depth") {
      visitedNodesInOrder = depthFirstSearch(grid, startNode, bomb);
      nodesInShortestPathOrder = getNodesInShortestPathOrder(bomb);
      gridAfterBomb();
      visitedNodesInOrderTwo = depthFirstSearch(grid, bomb, finishNode);
    }

    const nodesInShortestPathOrderTwo = getNodesInShortestPathOrder(finishNode);

    animateWithBomb(
      visitedNodesInOrder,
      nodesInShortestPathOrder,
      visitedNodesInOrderTwo,
      animationSpeed,
      shortestPathSpeed,
      nodesInShortestPathOrderTwo
    );
  }
}

export function gridAfterBomb() {
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      const node = grid[i][j];

      node.isVisited = false;
      node.distance = "Infinity";
      node.prevNode = "none";
      node.gCost = 10000;
      node.hCost = 10000;
      node.fCost = 10000;
      node.status = 1;
    }
  }
}

export function animateShortestPathWithBomb(
  nodesInShortestPathOrder,
  nodesInShortestPathOrderTwo,
  shortestPathSpeed
) {
  nodesInShortestPathOrder.shift();
  nodesInShortestPathOrderTwo.shift();
  const node = nodesInShortestPathOrder[0];
  document.getElementById(`node-${node.row}-${node.col}`).className =
    "node-shortest-path-start ";
  for (let i = 1; i < nodesInShortestPathOrder.length; i++) {
    const node = nodesInShortestPathOrder[i];
    setTimeout(() => {
      if (i < nodesInShortestPathOrder.length - 1) {
        const node = nodesInShortestPathOrder[i + 1];
        const prevNode = nodesInShortestPathOrder[i];
        if (prevNode.col > node.col) {
          document.getElementById(`node-${node.row}-${node.col}`).className =
            "node-shortest-path-pre-left";
        } else if (prevNode.col < node.col) {
          document.getElementById(`node-${node.row}-${node.col}`).className =
            "node-shortest-path-pre-right";
        } else if (prevNode.row < node.row) {
          document.getElementById(`node-${node.row}-${node.col}`).className =
            "node-shortest-path-pre-down";
        } else {
          document.getElementById(`node-${node.row}-${node.col}`).className =
            "node-shortest-path-pre-up";
        }
      }
      document.getElementById(`node-${node.row}-${node.col}`).className =
        "node-shortest-path";
      if (i === nodesInShortestPathOrder.length - 1) {
        const node = nodesInShortestPathOrderTwo[0];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "node-shortest-path-bomb";
        for (let j = 1; j < nodesInShortestPathOrderTwo.length; j++) {
          const nodeTwo = nodesInShortestPathOrderTwo[j];
          setTimeout(() => {
            if (j < nodesInShortestPathOrderTwo.length - 1) {
              const node = nodesInShortestPathOrderTwo[j + 1];
              const prevNode = nodesInShortestPathOrderTwo[j];
              if (prevNode.col > node.col) {
                document.getElementById(
                  `node-${node.row}-${node.col}`
                ).className = "node-shortest-path-pre-left";
              } else if (prevNode.col < node.col) {
                document.getElementById(
                  `node-${node.row}-${node.col}`
                ).className = "node-shortest-path-pre-right";
              } else if (prevNode.row < node.row) {
                document.getElementById(
                  `node-${node.row}-${node.col}`
                ).className = "node-shortest-path-pre-down";
              } else {
                document.getElementById(
                  `node-${node.row}-${node.col}`
                ).className = "node-shortest-path-pre-up";
              }
            }
            document.getElementById(
              `node-${nodeTwo.row}-${nodeTwo.col}`
            ).className = "node-shortest-path";
          }, j * shortestPathSpeed);
          if (j === nodesInShortestPathOrderTwo.length - 1) {
            const node = nodesInShortestPathOrderTwo[j];
            setTimeout(() => {
              document.getElementById(
                `node-${node.row}-${node.col}`
              ).className = "node-shortest-path-finish";
              algorithmDone = true;
              document.getElementById("grid").className = "grid";
            }, j * shortestPathSpeed);
          }
        }
      }
    }, i * shortestPathSpeed);
  }
}

export function animateSecond(
  visitedNodesInOrder,
  animationSpeed,
  shortestPathSpeed,
  nodesInShortestPathOrder,
  nodesInShortestPathOrderTwo
) {
  const node = visitedNodesInOrder[0];
  document.getElementById(`node-${node.row}-${node.col}`).className =
    "node-visited-start";
  for (let i = 1; i < visitedNodesInOrder.length; i++) {
    if (i === visitedNodesInOrder.length - 1) {
      setTimeout(() => {
        animateShortestPathWithBomb(
          nodesInShortestPathOrder,
          nodesInShortestPathOrderTwo,
          shortestPathSpeed
        );
      }, i * animationSpeed);
    }

    if (i < visitedNodesInOrder.length - 1) {
      setTimeout(() => {
        const node = visitedNodesInOrder[i + 1];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "node-pre";
      }, animationSpeed * i);
    }

    if (i === visitedNodesInOrder.length - 1) {
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "node-visited-finish";
      }, animationSpeed * i);
    } else {
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "node-visited";
      }, animationSpeed * i);
    }
  }
}

export function animateWithBomb(
  visitedNodesInOrder,
  nodesInShortestPathOrder,
  visitedNodesInOrderTwo,
  animationSpeed,
  shortestPathSpeed,
  nodesInShortestPathOrderTwo
) {
  const node = visitedNodesInOrder[0];
  document.getElementById(`node-${node.row}-${node.col}`).className =
    "node-visited-start-bomb";
  for (let i = 1; i < visitedNodesInOrder.length; i++) {
    if (i === visitedNodesInOrder.length - 1) {
      setTimeout(() => {
        animateSecond(
          visitedNodesInOrderTwo,
          animationSpeed,
          shortestPathSpeed,
          nodesInShortestPathOrder,
          nodesInShortestPathOrderTwo
        );
      }, i * animationSpeed);
    }

    if (i < visitedNodesInOrder.length - 1) {
      setTimeout(() => {
        const node = visitedNodesInOrder[i + 1];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "node-pre";
      }, animationSpeed * i);
    }

    if (i === visitedNodesInOrder.length - 1) {
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "bomb-node-visited";
      }, animationSpeed * i);
      if (
        document.getElementById(
          `node-${visitedNodesInOrder[i].row}-${visitedNodesInOrder[i].col}`
        ).className === "node-finish"
      ) {
        console.log("y");
        const node = visitedNodesInOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "node-visited-finish-bomb";
      }
    } else {
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "node-visited-bomb";
      }, animationSpeed * i);
    }
  }
}

export function animate(
  visitedNodesInOrder,
  nodesInShortestPathOrder,
  animationSpeed,
  shortestPathSpeed
) {
  const node = visitedNodesInOrder[0];
  document.getElementById(`node-${node.row}-${node.col}`).className =
    "node-visited-start";
  for (let i = 1; i < visitedNodesInOrder.length; i++) {
    if (i === visitedNodesInOrder.length - 1) {
      setTimeout(() => {
        animateShortestPath(nodesInShortestPathOrder, shortestPathSpeed);
      }, i * animationSpeed);
    }

    if (i < visitedNodesInOrder.length - 1) {
      setTimeout(() => {
        const node = visitedNodesInOrder[i + 1];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "node-pre";
      }, animationSpeed * i);
    }

    if (i === visitedNodesInOrder.length - 1) {
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "node-visited-finish";
      }, animationSpeed * i);
    } else {
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "node-visited";
      }, animationSpeed * i);
    }
  }
}

export function animateShortestPath(
  nodesInShortestPathOrder,
  shortestPathSpeed
) {
  nodesInShortestPathOrder.shift();
  const node = nodesInShortestPathOrder[0];
  document.getElementById(`node-${node.row}-${node.col}`).className =
    "node-shortest-path-start ";
  for (let i = 1; i < nodesInShortestPathOrder.length; i++) {
    if (i < nodesInShortestPathOrder.length - 1) {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i + 1];
        const prevNode = nodesInShortestPathOrder[i];
        if (prevNode.col > node.col) {
          document.getElementById(`node-${node.row}-${node.col}`).className =
            "node-shortest-path-pre-left";
        } else if (prevNode.col < node.col) {
          document.getElementById(`node-${node.row}-${node.col}`).className =
            "node-shortest-path-pre-right";
        } else if (prevNode.row < node.row) {
          document.getElementById(`node-${node.row}-${node.col}`).className =
            "node-shortest-path-pre-down";
        } else {
          document.getElementById(`node-${node.row}-${node.col}`).className =
            "node-shortest-path-pre-up";
        }
      }, shortestPathSpeed * i);
    }

    if (i === nodesInShortestPathOrder.length - 1) {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "node-shortest-path-finish";
        algorithmDone = true;
        document.getElementById("grid").className = "grid";
      }, shortestPathSpeed * i);
    } else {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "node-shortest-path";
      }, shortestPathSpeed * i);
    }
  }
}

export function handleMouseDown(row, col, isStart, isFinish, bomb) {
  if (isStart) {
    mouseOnStart = true;
  } else if (isFinish) {
    mouseOnFinish = true;
  } else if (bomb) {
    mouseOnBomb = true;
  } else {
    const newGrid = getGridWithWallToggled(grid, row, col);
    grid = newGrid;
    mouseIsPressed = true;
  }
}

export function handleMouseUp(row, col) {
  if (mouseOnStart) {
    // const newGrid = makeStart(grid, row, col);
    // grid = newGrid;
    mouseOnStart = false;
    // startNodeRow = row;
    // startNodeCol = col;
  } else if (mouseOnFinish) {
    // const newGrid = makeFinish(grid, row, col);
    // grid = newGrid;
    mouseOnFinish = false;
    // finishNodeRow = row;
    // finishNodeCol = col;
  } else if (mouseOnBomb) {
    // const newGrid = makeBomb(grid, row, col);
    // grid = newGrid;
    mouseOnBomb = false;
  } else {
    mouseIsPressed = false;
  }
}

export function displayAlgorithmAfterwards() {
  if (!isBombActive) {
    grid = getGrid(startNodeRow, startNodeCol, finishNodeRow, finishNodeCol);
    const startNode = grid[startNodeRow][startNodeCol];
    const finishNode = grid[finishNodeRow][finishNodeCol];
    let visitedNodesInOrder;
    if (algorithmDisplayed === "Dijkstra´s") {
      visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
      const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
      animateAfter(visitedNodesInOrder, nodesInShortestPathOrder);
    } else if (algorithmDisplayed === "Greedy") {
      visitedNodesInOrder = greedyBestFirstSearch(grid, startNode, finishNode);
      const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
      animateAfter(visitedNodesInOrder, nodesInShortestPathOrder);
    } else if (algorithmDisplayed === "A*") {
      visitedNodesInOrder = aStarSearch(grid, startNode, finishNode);
      const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
      animateAfter(visitedNodesInOrder, nodesInShortestPathOrder);
    } else if (algorithmDisplayed === "DFS") {
      visitedNodesInOrder = depthFirstSearch(grid, startNode, finishNode);
      const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
      animateAfter(visitedNodesInOrder, nodesInShortestPathOrder);
    }
  } else {
    grid = getGrid(startNodeRow, startNodeCol, finishNodeRow, finishNodeCol);
    const startNode = grid[startNodeRow][startNodeCol];
    const finishNode = grid[finishNodeRow][finishNodeCol];
    const bombNode = grid[bombNodeRow][bombNodeCol];
    if (algorithmDisplayed === "Dijkstra´s") {
      const visitedNodesInOrder = dijkstra(grid, startNode, bombNode);
      const nodesInShortestPathOrder = getNodesInShortestPathOrder(bombNode);
      gridAfterBomb();
      const visitedNodesInOrderTwo = dijkstra(grid, bombNode, finishNode);
      const nodesInShortestPathOrderTwo =
        getNodesInShortestPathOrder(finishNode);
      animateAfterBomb(
        visitedNodesInOrder,
        visitedNodesInOrderTwo,
        nodesInShortestPathOrder,
        nodesInShortestPathOrderTwo
      );
    } else if (algorithmDisplayed === "DFS") {
      const visitedNodesInOrder = depthFirstSearch(grid, startNode, bombNode);
      const nodesInShortestPathOrder = getNodesInShortestPathOrder(bombNode);
      gridAfterBomb();
      const visitedNodesInOrderTwo = depthFirstSearch(
        grid,
        bombNode,
        finishNode
      );
      const nodesInShortestPathOrderTwo =
        getNodesInShortestPathOrder(finishNode);
      animateAfterBomb(
        visitedNodesInOrder,
        visitedNodesInOrderTwo,
        nodesInShortestPathOrder,
        nodesInShortestPathOrderTwo
      );
    } else if (algorithmDisplayed === "Greedy") {
      const visitedNodesInOrder = greedyBestFirstSearch(
        grid,
        startNode,
        bombNode
      );
      const nodesInShortestPathOrder = getNodesInShortestPathOrder(bombNode);
      gridAfterBomb();
      const visitedNodesInOrderTwo = greedyBestFirstSearch(
        grid,
        bombNode,
        finishNode
      );
      const nodesInShortestPathOrderTwo =
        getNodesInShortestPathOrder(finishNode);
      animateAfterBomb(
        visitedNodesInOrder,
        visitedNodesInOrderTwo,
        nodesInShortestPathOrder,
        nodesInShortestPathOrderTwo
      );
    } else if (algorithmDisplayed === "A*") {
      const visitedNodesInOrder = aStarSearch(grid, startNode, bombNode);
      const nodesInShortestPathOrder = getNodesInShortestPathOrder(bombNode);
      gridAfterBomb();
      const visitedNodesInOrderTwo = aStarSearch(grid, bombNode, finishNode);
      const nodesInShortestPathOrderTwo =
        getNodesInShortestPathOrder(finishNode);
      animateAfterBomb(
        visitedNodesInOrder,
        visitedNodesInOrderTwo,
        nodesInShortestPathOrder,
        nodesInShortestPathOrderTwo
      );
    }
  }
}

export function animateAfterBomb(
  visitedNodesInOrder,
  visitedNodesInOrderTwo,
  nodesInShortestPathOrder,
  nodesInShortestPathOrderTwo
) {
  for (let i = 0; i < visitedNodesInOrder.length; i++) {
    const node = visitedNodesInOrder[i];

    document.getElementById(`node-${node.row}-${node.col}`).className =
      "node-afterwards-purple";
  }
  for (let i = 0; i < visitedNodesInOrderTwo.length; i++) {
    const node = visitedNodesInOrderTwo[i];

    document.getElementById(`node-${node.row}-${node.col}`).className =
      "node-afterwards";
  }
  animateShortestPathAfterWithBomb(
    nodesInShortestPathOrder,
    nodesInShortestPathOrderTwo
  );
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (
        !nodesInShortestPathOrder.includes(grid[i][j]) &&
        !nodesInShortestPathOrderTwo.includes(grid[i][j]) &&
        !visitedNodesInOrder.includes(grid[i][j]) &&
        !visitedNodesInOrderTwo.includes(grid[i][j]) &&
        !grid[i][j].isStart &&
        !grid[i][j].isFinish &&
        !grid[i][j].isWall &&
        !grid[i][j].isBomb
      ) {
        document.getElementById(`node-${i}-${j}`).className = "node";
      }
    }
  }
}

export function animateAfter(visitedNodesInOrder, nodesInShortestPathOrder) {
  for (let i = 0; i < visitedNodesInOrder.length; i++) {
    const node = visitedNodesInOrder[i];

    document.getElementById(`node-${node.row}-${node.col}`).className =
      "node-afterwards";
  }
  animateShortestPathAfter(nodesInShortestPathOrder);
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (
        !nodesInShortestPathOrder.includes(grid[i][j]) &&
        !visitedNodesInOrder.includes(grid[i][j]) &&
        !grid[i][j].isStart &&
        !grid[i][j].isFinish &&
        !grid[i][j].isWall
      ) {
        document.getElementById(`node-${i}-${j}`).className = "node";
      }
    }
  }
}

export function animateShortestPathAfter(nodesInShortestPathOrder) {
  nodesInShortestPathOrder.shift();

  const node = nodesInShortestPathOrder[0];
  const prevNode = nodesInShortestPathOrder[1];

  document.getElementById(`node-${node.row}-${node.col}`).className =
    "node-shortest-path-pre-right";

  for (let i = 1; i < nodesInShortestPathOrder.length; i++) {
    const node = nodesInShortestPathOrder[i];
    document.getElementById(`node-${node.row}-${node.col}`).className =
      "shortest-path-afterwards";

    if (i === nodesInShortestPathOrder.length - 1) {
      const node = nodesInShortestPathOrder[i];
      document.getElementById(`node-${node.row}-${node.col}`).className =
        "node-shortest-path-finish-after";
    }
  }
}

export function animateShortestPathAfterWithBomb(
  nodesInShortestPathOrder,
  nodesInShortestPathOrderTwo
) {
  nodesInShortestPathOrder.shift();

  const node = nodesInShortestPathOrder[0];
  document.getElementById(`node-${node.row}-${node.col}`).className =
    "node-shortest-path-pre-right";

  for (let i = 1; i < nodesInShortestPathOrder.length; i++) {
    const node = nodesInShortestPathOrder[i];
    document.getElementById(`node-${node.row}-${node.col}`).className =
      "shortest-path-afterwards";

    // if (i === nodesInShortestPathOrder.length - 1) {
    //   const node = nodesInShortestPathOrder[i];
    //   document.getElementById(`node-${node.row}-${node.col}`).className =
    //     "node-shortest-path-bomb-after";
    // }
  }
  nodesInShortestPathOrderTwo.shift();
  const nodeTwo = nodesInShortestPathOrderTwo[0];
  document.getElementById(`node-${nodeTwo.row}-${nodeTwo.col}`).className =
    "node-shortest-path-bomb-after";
  for (let i = 1; i < nodesInShortestPathOrderTwo.length; i++) {
    const node = nodesInShortestPathOrderTwo[i];
    document.getElementById(`node-${node.row}-${node.col}`).className =
      "shortest-path-afterwards";

    if (i === nodesInShortestPathOrderTwo.length - 1) {
      const node = nodesInShortestPathOrderTwo[i];
      document.getElementById(`node-${node.row}-${node.col}`).className =
        "node-shortest-path-finish-after";
    }
  }
}

export function handleMouseEnter(row, col) {
  if (mouseOnStart) {
    startNodeRow = row;
    startNodeCol = col;
    const newGrid = makeStart(grid, row, col);
    grid = newGrid;
    mouseOnStart = true;
    if (algorithmDone) {
      displayAlgorithmAfterwards();
    }
  } else if (mouseOnFinish) {
    finishNodeRow = row;
    finishNodeCol = col;
    const newGrid = makeFinish(grid, row, col);
    grid = newGrid;
    mouseOnFinish = true;
    if (algorithmDone) {
      displayAlgorithmAfterwards();
    }
  } else if (mouseIsPressed) {
    const newGrid = getGridWithWallToggled(grid, row, col);
    grid = newGrid;
  } else if (mouseOnBomb) {
    bombNodeRow = row;
    bombNodeCol = col;
    const newGrid = makeBomb(grid, row, col);
    grid = newGrid;

    if (algorithmDone) {
      displayAlgorithmAfterwards();
    }
  }
}

export function handleMouseLeave(row, col) {
  if (mouseOnStart) {
    const newGrid = deleteStart(grid, row, col);
    grid = newGrid;
  } else if (mouseOnFinish) {
    const newGrid = deleteFinish(grid, row, col);
    grid = newGrid;
  } else if (mouseOnBomb) {
    const newGrid = deleteBomb(grid, row, col);
    grid = newGrid;
  }
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

export function changeBomb(grid, row, col, bomb) {
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  const newNode = {
    ...node,
    isBomb: bomb,
  };
  newGrid[row][col] = newNode;
  bombNodeRow = 15;
  bombNodeCol = 37;
  return newGrid;
}

export function makeBomb(grid, row, col) {
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  const newNode = {
    ...node,
    isBomb: true,
  };
  newGrid[row][col] = newNode;
  return newGrid;
}

export function deleteBomb(grid, row, col) {
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  const newNode = {
    ...node,
    isBomb: false,
  };
  newGrid[row][col] = newNode;
  return newGrid;
}
