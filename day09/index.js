const fs = require('fs')
const data = fs.readFileSync(`./input.txt`, 'utf-8')
const input = data.split('\n').map(str => str.split(' ').map(Number))
console.log(part1(input))
console.log(part2(input))

function part1(input) {
  let sum = 0
  for (const line of input) {
    let lastNums = []
    let newSet = [...line]
    while (true) {
      const diffSet = []
      lastNums.push(newSet[newSet.length - 1])
      for (let i = newSet.length - 1; i > 0; i--) {
        diffSet.unshift(newSet[i] - newSet[i-1])
      }
      newSet = [...diffSet]
      if (newSet[newSet.length - 1] === 0) break
    }
    sum += lastNums.reduce((acc, v) => acc + v, 0)
  }
  return sum
}

function part2(input) {
  let sum = 0
  for (const line of input) {
    let firstNums = []
    let newSet = [...line]
    while (true) {
      const diffSet = []
      firstNums.push(newSet[0])
      for (let i = newSet.length - 1; i > 0; i--) {
        diffSet.unshift(newSet[i] - newSet[i-1])
      }
      newSet = [...diffSet]
      if (newSet[newSet.length - 1] === 0) break
    }
    let diff = firstNums[firstNums.length - 1]
    for (let i = firstNums.length - 2; i >= 0; i--) {
      diff = firstNums[i] - diff
    }
    sum += diff
  }
  return sum
}