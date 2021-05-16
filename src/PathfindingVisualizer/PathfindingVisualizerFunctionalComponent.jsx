import React, { useState } from "react";
import { dijkstra } from "../algorithms/dijkstra";
import { aStarSearch } from "../algorithms/aStarSearch.js";
import { greedyBestFirstSearch } from "../algorithms/greedyBestFirstSearch.js";
import { getNodesInShortestPathOrder } from "../algorithms/getNodesInShortestPathOrder.js";
import { depthFirstSearch } from "../algorithms/depthFirstSearch.js";
import { breadthFirstSearch } from "../algorithms/breadthFirstSearch.js";
import { recursiveDivision } from "../algorithms/recursiveDivision.js";
import Node from "./Node/Node.jsx";
import "./PathfindingVisualizer.css";
import "./Node/Node.css";

let startprevNode = "";
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
  console.log("render");
  const [animationSpeed, setAnmationSpeed] = useState("Fast");
  const [bomb, setBomb] = useState(true);
  const [algorithm, setAlgorithm] = useState("");
  const [tutorialCounter, setTutorialCounter] = useState(1);

  function tutorialCounterIncrease() {
    if (tutorialCounter < 9) {
      setTutorialCounter((prev) => prev + 1);
    } else {
      document.getElementById("tutorialNine").style.visibility = "hidden";
    }
  }

  function tutorialCounterDecrease() {
    if (tutorialCounter > 1) {
      setTutorialCounter((prev) => prev - 1);
    }
  }
  return (
    <div>
      <div className="tutorial-hidden" id="tutorialNine">
        <div className="tutorialCounter">{tutorialCounter}/9</div>

        <h3>Enjoy!</h3>
        <h6>
          I hope you have just as much fun playing around with this
          visualization tool as I had building it!
        </h6>
        <p className="paragraphTutorial">
          If you want to see the source code for this application, check out my{" "}
          <a href="https://google.de" target="_blank">
            github
          </a>
          .
        </p>

        <button
          className="skipButton"
          onClick={() => {
            document.getElementById("tutorialNine").className =
              "tutorial-hidden";
            document.getElementById("grid").className = "grid";
            makeClickable();
          }}
        >
          Skip Tutorial
        </button>
        <button
          className="previousButton"
          onClick={() => {
            tutorialCounterDecrease();
            document.getElementById("tutorialNine").className =
              "tutorial-hidden";
            document.getElementById("tutorialEight").className = "tutorial";
          }}
        >
          Previous
        </button>
        <button
          className="nextButton"
          onClick={() => {
            tutorialCounterIncrease();
            document.getElementById("tutorialNine").className =
              "tutorial-hidden";
            document.getElementById("grid").className = "grid";
            makeClickable();
          }}
        >
          Next
        </button>
      </div>

      <div className="tutorial-hidden" id="tutorialEight">
        <div className="tutorialCounter">{tutorialCounter}/9</div>

        <h3>Visualizing and more</h3>
        <h6>
          Use the navbar buttons to visualize algorithms and to do other stuff!
        </h6>
        <p className="paragraphTutorial">
          You can clear the current path, clear walls and weights, clear the
          entire board, and adjust the visualization speed, all from the navbar.
          If you want to access this tutorial again, click on "Pathfinding
          Visualizer" in the top left corner of your screen.
        </p>
        <img
          src="https://i.ibb.co/sFRv4KG/nav.png"
          alt=""
          className="imageTutorial"
        />

        <button
          className="skipButton"
          onClick={() => {
            document.getElementById("tutorialEight").className =
              "tutorial-hidden";
            document.getElementById("grid").className = "grid";
            makeClickable();
          }}
        >
          Skip Tutorial
        </button>
        <button
          className="previousButton"
          onClick={() => {
            tutorialCounterDecrease();
            document.getElementById("tutorialEight").className =
              "tutorial-hidden";
            document.getElementById("tutorialSeven").className = "tutorial";
          }}
        >
          Previous
        </button>
        <button
          className="nextButton"
          onClick={() => {
            tutorialCounterIncrease();
            document.getElementById("tutorialEight").className =
              "tutorial-hidden";
            document.getElementById("tutorialNine").className = "tutorial";
          }}
        >
          Next
        </button>
      </div>

      <div className="tutorial-hidden" id="tutorialSeven">
        <div className="tutorialCounter">{tutorialCounter}/9</div>

        <h3>Dragging nodes</h3>
        <h6>Click and drag the start, bomb, and target nodes to move them.</h6>
        <p className="paragraphTutorial">
          Note that you can drag nodes even after an algorithm has finished
          running. This will allow you to instantly see different paths.
        </p>
        <img
          src="https://s3.gifyu.com/images/dragging77f0190e061452e4.gif"
          alt=""
          className="imageTutorial"
        />

        <button
          className="skipButton"
          onClick={() => {
            document.getElementById("tutorialSeven").className =
              "tutorial-hidden";
            document.getElementById("grid").className = "grid";
            makeClickable();
          }}
        >
          Skip Tutorial
        </button>
        <button
          className="previousButton"
          onClick={() => {
            tutorialCounterDecrease();
            document.getElementById("tutorialSeven").className =
              "tutorial-hidden";
            document.getElementById("tutorialSix").className = "tutorial";
          }}
        >
          Previous
        </button>
        <button
          className="nextButton"
          onClick={() => {
            tutorialCounterIncrease();
            document.getElementById("tutorialSeven").className =
              "tutorial-hidden";
            document.getElementById("tutorialEight").className = "tutorial";
          }}
        >
          Next
        </button>
      </div>

      <div className="tutorial-hidden" id="tutorialSix">
        <div className="tutorialCounter">{tutorialCounter}/9</div>

        <h3>Adding a bomb</h3>
        <h6>Click the "Add Bomb" button.</h6>
        <p className="paragraphTutorial">
          Adding a bomb will change the course of the chosen algorithm. In other
          words, the algorithm will first look for the bomb (in an effort to
          diffuse it) and will then look for the target node. Note that the
          Bidirectional Swarm Algorithm does not support adding a bomb.
        </p>
        <img
          src="https://i.ibb.co/vQPnf0t/bomb.png"
          alt=""
          className="imageTutorial"
        />

        <button
          className="skipButton"
          onClick={() => {
            document.getElementById("tutorialSix").className =
              "tutorial-hidden";
            document.getElementById("grid").className = "grid";
            makeClickable();
          }}
        >
          Skip Tutorial
        </button>
        <button
          className="previousButton"
          onClick={() => {
            tutorialCounterDecrease();
            document.getElementById("tutorialSix").className =
              "tutorial-hidden";
            document.getElementById("tutorialFive").className = "tutorial";
          }}
        >
          Previous
        </button>
        <button
          className="nextButton"
          onClick={() => {
            tutorialCounterIncrease();
            document.getElementById("tutorialSix").className =
              "tutorial-hidden";
            document.getElementById("tutorialSeven").className = "tutorial";
          }}
        >
          Next
        </button>
      </div>

      <div className="tutorial-hidden" id="tutorialFive">
        <div className="tutorialCounter">{tutorialCounter}/9</div>

        <h3>Adding walls</h3>
        <h6>Click on the grid to add a wall.</h6>
        <p className="paragraphTutorial">
          Walls are impenetrable, meaning that a path cannot cross through them.
        </p>
        <img
          src="https://i.ibb.co/zHnMSkr/addWalls.gif"
          alt=""
          className="imageTutorial"
        />

        <button
          className="skipButton"
          onClick={() => {
            document.getElementById("tutorialFive").className =
              "tutorial-hidden";
            document.getElementById("grid").className = "grid";
            makeClickable();
          }}
        >
          Skip Tutorial
        </button>
        <button
          className="previousButton"
          onClick={() => {
            tutorialCounterDecrease();
            document.getElementById("tutorialFive").className =
              "tutorial-hidden";
            document.getElementById("tutorialFour").className = "tutorial";
          }}
        >
          Previous
        </button>
        <button
          className="nextButton"
          onClick={() => {
            tutorialCounterIncrease();
            document.getElementById("tutorialFive").className =
              "tutorial-hidden";
            document.getElementById("tutorialSix").className = "tutorial";
          }}
        >
          Next
        </button>
      </div>

      <div className="tutorial-hidden" id="tutorialFour">
        <div className="tutorialCounter">{tutorialCounter}/9</div>

        <h3>Meet the algorithms</h3>
        <h6>Not all algorithms are created equal.</h6>
        <p className="paragraphTutorial">
          <div>
            <p className="algorithmTutorial" style={{ paddingTop: "5px" }}>
              <strong>Dijkstra's Algorithm </strong>(weighted): the father of
              pathfinding algorithms, guarantees the shortest path
            </p>
            <p> </p>
          </div>

          <div>
            <p className="algorithmTutorial">
              <strong>A* Search</strong>(weighted): arguably the best
              pathfinding algorithm, uses heuristics to guarantee the shortest
              path much faster than Dijkstra's Algorithm
            </p>
          </div>

          <div>
            <p className="algorithmTutorial">
              <strong>Greedy Best-first Search</strong>(weighted): a faster,
              more heuristic-heavy version of A*, does not guarantee the
              shortest path
            </p>
          </div>

          <div>
            <p className="algorithmTutorial">
              <strong>Breath-first Search</strong>(unweighted): a great
              algorithm, guarantees the shortest path
            </p>
          </div>

          <div>
            <p className="algorithmTutorial">
              <strong>Depth-first Search</strong>(unweighted): a very bad
              algorithm for pathfinding, does not guarantee the shortest path
            </p>
          </div>
        </p>

        <button
          className="skipButton"
          onClick={() => {
            document.getElementById("tutorialFour").className =
              "tutorial-hidden";
            document.getElementById("grid").className = "grid";
            makeClickable();
          }}
        >
          Skip Tutorial
        </button>
        <button
          className="previousButton"
          onClick={() => {
            tutorialCounterDecrease();
            document.getElementById("tutorialFour").className =
              "tutorial-hidden";
            document.getElementById("tutorialThree").className = "tutorial";
          }}
        >
          Previous
        </button>
        <button
          className="nextButton"
          onClick={() => {
            tutorialCounterIncrease();
            document.getElementById("tutorialFour").className =
              "tutorial-hidden";
            document.getElementById("tutorialFive").className = "tutorial";
          }}
        >
          Next
        </button>
      </div>

      <div className="tutorial-hidden" id="tutorialThree">
        <div className="tutorialCounter">{tutorialCounter}/9</div>

        <h3>Picking an algorithm</h3>
        <h6>Choose an algorithm from the "Algorithms" drop-down menu.</h6>
        <p className="paragraphTutorial">
          Note that some algorithms are unweighted, while others are weighted.
          Unweighted algorithms do not take turns or weight nodes into account,
          whereas weighted ones do. Additionally, not all algorithms guarantee
          the shortest path.
        </p>
        <img
          src="https://i.ibb.co/f2zTpHQ/algos.png"
          alt=""
          className="imageTutorial"
        />

        <button
          className="skipButton"
          onClick={() => {
            document.getElementById("tutorialThree").className =
              "tutorial-hidden";
            document.getElementById("grid").className = "grid";
            makeClickable();
          }}
        >
          Skip Tutorial
        </button>
        <button
          className="previousButton"
          onClick={() => {
            tutorialCounterDecrease();
            document.getElementById("tutorialThree").className =
              "tutorial-hidden";
            document.getElementById("tutorialTwo").className = "tutorial";
          }}
        >
          Previous
        </button>
        <button
          className="nextButton"
          onClick={() => {
            tutorialCounterIncrease();
            document.getElementById("tutorialThree").className =
              "tutorial-hidden";
            document.getElementById("tutorialFour").className = "tutorial";
          }}
        >
          Next
        </button>
      </div>

      <div className="tutorial-hidden" id="tutorialTwo">
        <div className="tutorialCounter">{tutorialCounter}/9</div>

        <h3>What is a pathfinding algorithm?</h3>
        <h6>
          At its core, a pathfinding algorithm seeks to find the shortest path
          between two points. This application visualizes various pathfinding
          algorithms in action, and more!
        </h6>
        <p className="paragraphTutorial">
          All of the algorithms on this application are adapted for a 2D grid,
          where 90 degree turns have a "cost" of 1 and movements from a node to
          another have a "cost" of 1.
        </p>
        <img
          src="https://i.ibb.co/dBxK3WN/path.png"
          alt=""
          className="imageTutorial"
        />

        <button
          className="skipButton"
          onClick={() => {
            document.getElementById("tutorialTwo").className =
              "tutorial-hidden";
            document.getElementById("grid").className = "grid";
            makeClickable();
          }}
        >
          Skip Tutorial
        </button>
        <button
          className="previousButton"
          onClick={() => {
            tutorialCounterDecrease();
            document.getElementById("tutorialTwo").className =
              "tutorial-hidden";
            document.getElementById("tutorialOne").className = "tutorial";
          }}
        >
          Previous
        </button>
        <button
          className="nextButton"
          onClick={() => {
            tutorialCounterIncrease();
            document.getElementById("tutorialTwo").className =
              "tutorial-hidden";
            document.getElementById("tutorialThree").className = "tutorial";
          }}
        >
          Next
        </button>
      </div>

      <div className="tutorial" id="tutorialOne">
        <div className="tutorialCounter">{tutorialCounter}/9</div>

        <h3>Welcome to Pathfinding Visualizer!</h3>
        <h6>
          This short tutorial will walk you through all of the features of this
          application.
        </h6>
        <p className="paragraphTutorial">
          If you want to dive right in, feel free to press the "Skip Tutorial"
          button below. Otherwise, press "Next"!
        </p>
        <img
          src="https://i.ibb.co/Fgx4FgN/c-icon.png"
          alt=""
          className="imageTutorialOne"
        />

        <button
          className="skipButton"
          onClick={() => {
            document.getElementById("tutorialOne").style.visibility = "hidden";
            document.getElementById("grid").className = "grid";
            makeClickable();
          }}
        >
          Skip Tutorial
        </button>
        <button className="previousButton">Previous</button>
        <button
          className="nextButton"
          onClick={() => {
            tutorialCounterIncrease();
            document.getElementById("tutorialOne").className =
              "tutorial-hidden";
            document.getElementById("tutorialTwo").className = "tutorial";
          }}
        >
          Next
        </button>
      </div>

      {/* // */}
      {/* // */}
      {/* // */}
      {/* // */}
      {/* // */}
      {/* // */}
      {/* // */}
      {/* // */}
      {/* // */}
      {/* // */}

      <div className="navBar" id="navBar">
        <a
          href="./PathfindingVisualizerFunctionalComponent.jsx"
          className="homeButton"
        >
          PathfindingVisualizer
        </a>

        <ul className="menu cf click" id="click">
          <li>
            <a>Algorithms ▼</a>
            <ul class="submenu" id="submenu">
              <li>
                <a
                  onClick={() => {
                    algorithmDisplayed = "Dijkstra´s";
                    setAlgorithm("dijkstra");
                  }}
                >
                  Dijkstra`s Algorithm
                </a>
              </li>
              <li>
                <a
                  onClick={() => {
                    setAlgorithm("aStar");
                    algorithmDisplayed = "A*";
                  }}
                >
                  A* Search
                </a>
              </li>
              <li>
                <a
                  onClick={() => {
                    setAlgorithm("greedy");
                    algorithmDisplayed = "Greedy";
                  }}
                >
                  Greedy Best First Search
                </a>
              </li>
              <li>
                <a
                  onClick={() => {
                    setAlgorithm("breadth");
                    algorithmDisplayed = "BFS";
                  }}
                >
                  Breadth-first Search
                </a>
              </li>
              <li>
                <a
                  onClick={() => {
                    setAlgorithm("depth");
                    algorithmDisplayed = "DFS";
                  }}
                >
                  Depth-first Search
                </a>
              </li>
            </ul>
          </li>
        </ul>

        <button
          id="click1"
          className="click"
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
          id="click2"
          className="visualize click"
          onClick={() => {
            if (algorithm === "") return;
            document.getElementById("grid").className = "grid-not-clickable";
            document.getElementById("click").style.pointerEvents = "none";
            document.getElementById("click1").style.pointerEvents = "none";
            document.getElementById("click2").style.pointerEvents = "none";
            document.getElementById("click3").style.pointerEvents = "none";
            document.getElementById("click4").style.pointerEvents = "none";
            document.getElementById("click5").style.pointerEvents = "none";
            document.getElementById("click6").style.pointerEvents = "none";
            makeAlgorithm(algorithm, animationSpeed);
          }}
        >
          Visualize {algorithmDisplayed}
        </button>
        <button id="click3" className="click">
          Clear Bord
        </button>
        <button
          id="click4"
          className="click"
          onClick={() => {
            clearPath();
            clearWalls();
            resetGrid();
            this.forceUpdate();
          }}
        >
          Clear walls
        </button>
        <button id="click5" className="click" onClick={clearPath}>
          Clear Path
        </button>

        <ul id="click6" className="menu cf click">
          <li>
            <a>Speed: {animationSpeed} ▼</a>
            <ul class="submenu-speed">
              <li>
                <a
                  onClick={() => {
                    setAnmationSpeed("Fast");
                  }}
                >
                  Fast
                </a>
              </li>
              <li>
                <a
                  onClick={() => {
                    setAnmationSpeed("Average");
                  }}
                >
                  Average
                </a>
              </li>
              <li>
                <a
                  onClick={() => {
                    setAnmationSpeed("Slow");
                  }}
                >
                  Slow
                </a>
              </li>
            </ul>
          </li>
        </ul>
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
      </div>

      <div className="grid-not-clickable" id="grid">
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

export function makeClickable() {
  document.getElementById("click").classList.remove("click");
  document.getElementById("click1").classList.remove("click");
  document.getElementById("click2").classList.remove("click");
  document.getElementById("click3").classList.remove("click");
  document.getElementById("click4").classList.remove("click");
  document.getElementById("click5").classList.remove("click");
  document.getElementById("click6").classList.remove("click");
}

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

  // for (let row = 0; row < grid.length; row++) {
  //   for (let col = 0; col < grid[row].length; col++) {
  //     const nodeCopy = grid[row][col];
  //     const node = document.getElementById(`node-${row}-${col}`);

  //     node.className = "node";

  //     if (row === startNodeRow && col === startNodeCol)
  //       node.className = "node-start";
  //     if (row === finishNodeRow && col === finishNodeCol)
  //       node.className = "node-finish";
  //   }
  // }
}

export function clearPath() {
  algorithmDone = false;
  grid = getGrid(startNodeRow, startNodeCol, finishNodeRow, finishNodeCol);
  resetGrid();
}

export function clearWalls() {
  algorithmDone = false;
  grid = getGridClearWalls(
    startNodeRow,
    startNodeCol,
    finishNodeRow,
    finishNodeCol,
    bombNodeRow,
    bombNodeCol
  );
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

export function getGridClearWalls(
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
          false,
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
      const nodeCopy = grid[row][col];
      const node = document.getElementById(`node-${row}-${col}`);
      node.className = "node";

      if (row === startNodeRow && col === startNodeCol)
        node.className = "node-start";
      if (row === finishNodeRow && col === finishNodeCol)
        node.className = "node-finish";
      if (row === bombNodeRow && col === bombNodeCol && isBombActive)
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
    } else if (algorithm === "breadth") {
      visitedNodesInOrder = breadthFirstSearch(grid, startNode, finishNode);
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
    } else if (algorithm === "breadth") {
      visitedNodesInOrder = breadthFirstSearch(grid, startNode, bomb);
      nodesInShortestPathOrder = getNodesInShortestPathOrder(bomb);
      gridAfterBomb();
      visitedNodesInOrderTwo = breadthFirstSearch(grid, bomb, finishNode);
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
            if (nodesInShortestPathOrderTwo[j].isStart) {
              document.getElementById(
                `node-${nodeTwo.row}-${nodeTwo.col}`
              ).className = "node-shortest-path-start";
            }
          }, j * shortestPathSpeed);
          if (j === nodesInShortestPathOrderTwo.length - 1) {
            const node = nodesInShortestPathOrderTwo[j];
            setTimeout(() => {
              document.getElementById(
                `node-${node.row}-${node.col}`
              ).className = "node-shortest-path-finish";
              algorithmDone = true;
              document.getElementById("grid").className = "grid";
              document.getElementById("click").style.pointerEvents = "all";
              document.getElementById("click1").style.pointerEvents = "all";
              document.getElementById("click2").style.pointerEvents = "all";
              document.getElementById("click3").style.pointerEvents = "all";
              document.getElementById("click4").style.pointerEvents = "all";
              document.getElementById("click5").style.pointerEvents = "all";
              document.getElementById("click6").style.pointerEvents = "all";
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
    } else if (
      !(
        visitedNodesInOrder[i].row === startNodeRow &&
        visitedNodesInOrder[i].col === startNodeCol
      )
    ) {
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "node-visited";
      }, animationSpeed * i);
    } else {
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "node-visited-start";
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
    } else if (
      !(
        visitedNodesInOrder[i].row === finishNodeRow &&
        visitedNodesInOrder[i].col === finishNodeCol
      )
    ) {
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "node-visited-bomb";
      }, animationSpeed * i);
    } else {
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "node-visited-finish-bomb";
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
        document.getElementById("click").style.pointerEvents = "all";
        document.getElementById("click1").style.pointerEvents = "all";
        document.getElementById("click2").style.pointerEvents = "all";
        document.getElementById("click3").style.pointerEvents = "all";
        document.getElementById("click4").style.pointerEvents = "all";
        document.getElementById("click5").style.pointerEvents = "all";
        document.getElementById("click6").style.pointerEvents = "all";
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
    } else if (algorithmDisplayed === "BFS") {
      visitedNodesInOrder = breadthFirstSearch(grid, startNode, finishNode);
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
    } else if (algorithmDisplayed === "BFS") {
      const visitedNodesInOrder = breadthFirstSearch(grid, startNode, bombNode);
      const nodesInShortestPathOrder = getNodesInShortestPathOrder(bombNode);
      gridAfterBomb();
      const visitedNodesInOrderTwo = breadthFirstSearch(
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

  for (let i = 0; i < visitedNodesInOrder.length; i++) {
    const node = visitedNodesInOrder[i];
    if (!nodesInShortestPathOrder.includes(node))
      document.getElementById(`node-${node.row}-${node.col}`).className =
        "node-afterwards";
  }
  animateShortestPathAfter(nodesInShortestPathOrder);
}

export function animateShortestPathAfter(nodesInShortestPathOrder) {
  nodesInShortestPathOrder.shift();

  for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
    const node = nodesInShortestPathOrder[i];
    document.getElementById(`node-${node.row}-${node.col}`).className =
      "shortest-path-afterwards";
  }

  let node = nodesInShortestPathOrder[0];
  document.getElementById(`node-${node.row}-${node.col}`).className =
    "node-shortest-path-pre-right";

  node = nodesInShortestPathOrder[nodesInShortestPathOrder.length - 1];
  document.getElementById(`node-${node.row}-${node.col}`).className =
    "node-shortest-path-finish-after";
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
    if (algorithmDone) {
      startprevNode = grid[row][col];
    }
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
