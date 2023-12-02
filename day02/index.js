const fs = require('fs')
const data = fs.readFileSync(`./input.txt`, 'utf-8')
const input = data.split('\n')
console.log(part1(input))
console.log(part2(input))

function part1(input) {
  let sum = 0
  const maxRGB = [12, 13, 14]
  for (let i = 0; i < input.length; i++) {
    let possible = true
    const subsets = input[i].substring(input[i].indexOf(':')+1).split(';')
    for (const subset of subsets) {
      const rgb = [0, 0, 0]
      for (const cube of subset.split(',')) {
        const num = +cube.match(/\d+/)[0]
        if (cube.indexOf('red') > 0) {
          rgb[0] += num
        } else if (cube.indexOf('green') > 0) {
          rgb[1] += num
        } else if (cube.indexOf('blue') > 0) {
          rgb[2] += num
        }
      }
      if (rgb[0] > maxRGB[0] || rgb[1] > maxRGB[1] || rgb[2] > maxRGB[2]) {
        possible = false
        break
      }
    }
    if (possible) {
      sum += i+1
    }
  }
  return sum
}

function part2(input) {
  let sum = 0
  for (const line of input) {
    const subsets = line.substring(line.indexOf(':')+1).split(';')
    const rgb = [1, 1, 1]
    for (const subset of subsets) {
      for (const cube of subset.split(',')) {
        const num = +cube.match(/\d+/)[0]
        if (cube.indexOf('red') > 0 && num > rgb[0]) {
          rgb[0] = num
        } else if (cube.indexOf('green') > 0 && num > rgb[1]) {
          rgb[1] = num
        } else if (cube.indexOf('blue') > 0 && num > rgb[2]) {
          rgb[2] = num
        }
      }
    }
    sum += rgb[0] * rgb[1] * rgb[2]
  }
  return sum
}