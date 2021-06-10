# Pathfinding Visualizer

Welcome to Pathfinding Visualizer! Inspired by a similar project done by Clement Mihailescu I wanted to create my own version of a tool to visualize pathfinding algorithms.
You can play around with it here (use Google Chrome!): https://ludwigfritsch.github.io/PathfindingVisualizer/

## The Algorithms
**Dijkstra´s Algoithm** (weighted): Presumably the most popular pathfinding algorithm of them all, guarantees the shortest path.  
**A Star Search** (weighted): used in many fields of computer science, uses heuristics to guarantee the shortest path.  
**Greedy Best First Search** (unweighted): a more heuristic-heavy version of A Star Search, doesn't guarantee the shortest path.  
**Breadth First Search** (unweighted): one of the most commonly used algorithms for traversing, does guarantee the shortest path.  
**Depth First Search** (unweighted): a very inefficient algorithm for the shortest-path-problem , does not guarantee the shortest path.  

## Quick technical explanation
The project was built in React 17.0.2.  
At the base of the project lies a two-dimensional array of nodes.  
Each node has properties like row, column, isVisited etc.  
For each node in the array a Node React Component gets rendered, in total they form the grid you can see and interact with.  
When a user clicks on a node, not only the Node Component gets updated(changes its color) but the node in the array   
gets updated as well(e.g. the arrtribute isWall gets toggled).    
The array of nodes gets passed as an argument to a pathfinding algorithm which returns an array of nodes in which   
it visited the nodes when searching for the shortest path.  
This returned array the gets traversed and every Node component corresponding to a node in this array changes it color.  
