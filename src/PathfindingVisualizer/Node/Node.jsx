import React, { useState, useEffect } from "react";
import "./Node.css";
import { isBombActive } from "../PathfindingVisualizerFunctionalComponent";
import { startNodeRow } from "../PathfindingVisualizerFunctionalComponent";
import { startNodeCol } from "../PathfindingVisualizerFunctionalComponent";

let mouseIsPressed = false;
let startMouseIsPressed = false;
let finishMouseIsPressed = false;
let bombMouseIsPressed = false;
let bombRow = 0;
let bombCol = 0;
let prevNodeRow = 0;
let prevNodeCol = 0;

const Node = ({
  row,
  col,
  isFinish,
  isStart,
  isWall,
  isBomb,
  onMouseDown,
  onMouseEnter,
  onMouseUp,
  onMouseLeave,
}) => {
  const [wall, setWall] = useState(isWall);
  const [start, setStart] = useState(isStart);
  const [finish, setFinish] = useState(isFinish);
  const [bomb, setBomb] = useState(isBomb);

  useEffect(() => {
    if (row === bombRow && col === bombCol && !isBombActive) setBomb(false);
    else setBomb(isBomb);
  }, [col, row, isBomb]);

  const changeNode = () => {
    if (!start && !finish && !isBomb && mouseIsPressed) {
      setWall(!wall);
    }
  };

  const changeStart = () => {
    if (startMouseIsPressed && !finish && !bomb) {
      setStart(!start);
    }
  };

  const changeFinish = () => {
    if (finishMouseIsPressed && !start) {
      setFinish(!finish);
    }
  };

  const changeBomb = () => {
    if (bombMouseIsPressed) {
      setBomb(!bomb);
      className = "node";
      bombRow = row;
      bombCol = col;
    }
  };

  const delteMouse = () => {
    startMouseIsPressed = false;

    finishMouseIsPressed = false;

    bombMouseIsPressed = false;

    mouseIsPressed = false;
  };

  const changeMouseIsPressed = () => {
    if (start) {
      startMouseIsPressed = !startMouseIsPressed;
    } else if (finish) {
      finishMouseIsPressed = !finishMouseIsPressed;
    } else if (bomb) {
      bombMouseIsPressed = !bombMouseIsPressed;
    } else {
      mouseIsPressed = !mouseIsPressed;
    }
  };

  let className = bomb
    ? "node-bomb"
    : finish
    ? "node-finish"
    : start
    ? "node-start"
    : wall
    ? "node-wall"
    : "node";

  return (
    <div
      className={className}
      id={`node-${row}-${col}`}
      onMouseDown={() => {
        onMouseDown(row, col, start, finish, bomb);
        changeMouseIsPressed();
        changeNode();
      }}
      onMouseEnter={() => {
        onMouseEnter(row, col, start, finish, bomb);
        changeNode();
        changeStart();
        changeFinish();
        changeBomb();
      }}
      onMouseLeave={() => {
        onMouseLeave(row, col);
        changeStart();
        changeFinish();
        changeBomb();
      }}
      onMouseUp={() => {
        onMouseUp(row, col);
        delteMouse();
      }}
    ></div>
  );
};

export default Node;
