const fs = require('fs')
const data = fs.readFileSync(`./input.txt`, 'utf-8')
const input = data.split('\n\n')
const moves = input[0]
const mazeLines = input[1].split('\n').map(str => str.replace(/\s+|\(|\)/g,'').split('='))
const mazeMap = {}
for (const line of mazeLines) {
  mazeMap[line[0]] = line[1].split(',')
}
console.log(part1(moves, mazeMap))
console.log(part2(moves, mazeMap))

function part1(moves, mazeMap) {
  return getSteps(moves, mazeMap, 'AAA', false)
}

function part2(moves, mazeMap) {
  const current = Object.keys(mazeMap).filter(str => str.endsWith('A'))
  const steps = []
  for (const node of current) {
    steps.push(getSteps(moves, mazeMap, node, true))
  }
  return findLCM(steps)
}

function getSteps(moves, mazeMap, start, endsWithZ) {
  let steps = 0
  let current = start
  for (let i = 0; i < moves.length; i++) {
    if (moves.charAt(i) === 'R') {
      current = mazeMap[current][1]
    } else {
      current = mazeMap[current][0]
    }
    steps += 1
    if (!endsWithZ && current === 'ZZZ') break
    else if (endsWithZ && current.endsWith('Z')) break
    else if (i === moves.length - 1) i = -1
  }
  return steps
}

function findLCM(nums) { 
  let result = nums[0]
  const gcd = (a, b) => {
    if (b == 0) return a
    return gcd(b, a % b) 
  } 
  for (let i = 1; i < nums.length; i++) {
    result = (nums[i] * result) / gcd(nums[i], result); 
  }
  return result
} 
