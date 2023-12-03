const fs = require('fs')
const data = fs.readFileSync(`./input.txt`, 'utf-8')
const input = data.split('\n').map(str => str.split(''))
console.log(part1(input))
console.log(part2(input))

function part1(input) {
  let sum = 0
  for (let row = 0; row < input.length; row++) {
    const colLength = input[row].length
    for (let col = 0; col < colLength; col++) {
      if (isNaN(input[row][col])) continue
      else {
        let num = input[row][col]
        let nextIndex = col + 1
        while (nextIndex < colLength && !isNaN(input[row][nextIndex])) {
          num += input[row][nextIndex]
          nextIndex += 1
        }
        if (adjacentHasSymbol(input, row, col, nextIndex - 1)) {
          sum += +num
        }
        col = nextIndex - 1
      }
    }
  }
  return sum
}

function part2(input) {
  let sum = 0
  for (let row = 0; row < input.length; row++) {
    const colLength = input[row].length
    for (let col = 0; col < colLength; col++) {
      if (input[row][col] !== '*') continue
      else {
        const nums = getAdjacentNumbers(input, row, col)
        if (nums.length === 2) {
          sum += nums[0] * nums[1]
        }
      }
    }
  }
  return sum
}

function adjacentHasSymbol(grid, row, startCol, endCol) {
  const leftHasSymbol = hasSymbol(grid, row - 1, row + 1, startCol - 1, startCol - 1)
  const rightHasSymbol = hasSymbol(grid, row - 1, row + 1, endCol + 1, endCol + 1)
  const topHasSymbol = hasSymbol(grid, row - 1, row - 1, startCol, endCol)
  const bottomHasSymbol = hasSymbol(grid, row + 1, row + 1, startCol, endCol)
  return leftHasSymbol || rightHasSymbol || topHasSymbol || bottomHasSymbol
}

function hasSymbol(grid, startRow, endRow, startCol, endCol) {
  for (let i = startRow; i <= endRow; i++) {
    if (i < 0) continue
    else if (i >= grid.length) break
    for (let j = startCol; j <= endCol; j++) {
      if (j < 0) continue
      else if (j >= grid[0].length) break
      if (isNaN(grid[i][j]) && grid[i][j] !== '.') {
        return true
      }
    }
  }
}

function getAdjacentNumbers(grid, row, col) {
  const nums = []
  if (isNumber(grid, row, col - 1)) {
    nums.push(getNumStr(grid, row, col - 1))
  }
  if (isNumber(grid, row, col + 1)) {
    nums.push(getNumStr(grid, row, col + 1))
  }
  if (isNumber(grid, row - 1, col)) {
    nums.push(getNumStr(grid, row - 1, col))
  } else {
    if (isNumber(grid, row - 1, col - 1)) {
      nums.push(getNumStr(grid, row - 1, col - 1))
    }
    if (isNumber(grid, row - 1, col + 1)) {
      nums.push(getNumStr(grid, row - 1, col + 1))
    }
  }
  if (isNumber(grid, row + 1, col)) {
    nums.push(getNumStr(grid, row + 1, col))
  } else {
    if (isNumber(grid, row + 1, col - 1)) {
      nums.push(getNumStr(grid, row + 1, col - 1))
    }
    if (isNumber(grid, row + 1, col + 1)) {
      nums.push(getNumStr(grid, row + 1, col + 1))
    }
  }
  return nums
}

function isNumber(grid, row, col) {
  return row >= 0 && row < grid.length && col >= 0 && col < grid[0].length && !isNaN(grid[row][col])
}

function getNumStr(grid, row, col) {
  let numStr = ''
  let startCol = col
  while (startCol - 1 >= 0 && !isNaN(grid[row][startCol - 1])) {
    startCol -= 1
  }
  while (!isNaN(grid[row][startCol])) {
    numStr += grid[row][startCol]
    startCol += 1
  }
  return numStr
}