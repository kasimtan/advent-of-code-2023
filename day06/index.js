const fs = require('fs')
const data = fs.readFileSync(`./input.txt`, 'utf-8')
const input = data.split('\n').map(str => str.split(':')[1].trim().split(/\s+/).map(Number))
console.log(part1(input[0], input[1]))
console.log(part2(input[0], input[1]))

function part1(time, distance) {
  let product = 1
  for (let i = 0; i < time.length; i++) {
    product *= getValidWays(time[i], distance[i])
  }
  return product
}

function part2(time, distance) {
  const realTime = time.join('')
  const realDistance = distance.join('')
  return getValidWays(realTime, realDistance)
}

function getValidWays(time, distance) {
  let validWays = 0
  for (let j = Math.floor(time / 2); j > 0; j--) {
    if (j * (time - j) > distance) {
      validWays += 1
    }
  }
  return validWays * 2 - (time % 2 === 0 ? 1 : 0)
}