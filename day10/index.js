const fs = require('fs')
const data = fs.readFileSync(`./input.txt`, 'utf-8')
const input = data.split('\n').map(str => str.split(''))
const [startRow, startCol] = getStartPos(input)
const Direction = {
  UP: 'up',
  DOWN: 'down',
  RIGHT: 'right',
  LEFT: 'left'
}
console.log(part1([...input], startRow, startCol))
console.log(part2([...input], startRow, startCol))

function part1(maze, startRow, startCol) {
  let farthestSteps = 0
  maze[startRow][startCol] = 0
  const queue = [[startRow, startCol, 1]]
  do {
    const [row, col, step] = queue.shift()
    const up = updateIfValid(maze, row-1, col, Direction.UP, step)
    if (up) {
      queue.push([row-1, col, step+1])
      if (step > farthestSteps) farthestSteps = step
    }
    const right = updateIfValid(maze, row, col+1, Direction.RIGHT, step)
    if (right) {
      queue.push([row, col+1, step+1])
      if (step > farthestSteps) farthestSteps = step
    }
    const down = updateIfValid(maze, row+1, col, Direction.DOWN, step)
    if (down) {
      queue.push([row+1, col, step+1])
      if (step > farthestSteps) farthestSteps = step
    }
    const left = updateIfValid(maze, row, col-1, Direction.LEFT, step)
    if (left) {
      queue.push([row, col-1, step+1])
      if (step > farthestSteps) farthestSteps = step
    }
  } while (queue.length > 0)
  return farthestSteps
}

function part2(maze, startPos) {
}

function getStartPos(input) {
  for (let i = 0; i < input.length; i++) {
    if (input[i].indexOf('S') !== -1) {
      return [i, input[i].indexOf('S')]
    }
  }
}

function updateIfValid(maze, row, col, direction, val) {
  if (row < 0 || col < 0 || row > maze.length - 1 || col > maze[0].length - 1) {
    return false
  }
  // console.log(direction, maze[row][col], val)
  if (direction === Direction.UP && ['F', '7', '|'].includes(maze[row][col]) ||
    direction === Direction.RIGHT && ['7', 'J', '-'].includes(maze[row][col]) ||
    direction === Direction.DOWN && ['L', 'J', '|'].includes(maze[row][col]) ||
    direction === Direction.LEFT && ['F', 'L', '-'].includes(maze[row][col])
  ) {
    maze[row][col] = val
    return true
  }
  return false
}