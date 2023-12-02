const fs = require('fs')
const data = fs.readFileSync(`./input.txt`, 'utf-8')
const input = data.split('\n')
console.log(part1(input))
console.log(part2(input))

function part1(input) {
  let sum = 0
  for (const line of input) {
    const numStr = line.replace(/[^1-9]/g, '')
    sum += parseInt(`${numStr[0]}${numStr.slice(-1)}`, 10)
  }
  return sum
}

function part2(input) {
  let sum = 0
  const digits = ['1', '2', '3', '4', '5', '6', '7', '8', '9']
  const letters = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine']
  for (const line of input) {
    let minIndexPair = [Number.MAX_SAFE_INTEGER, 0]
    let maxIndexPair = [-1, 0]
    for (let i = 0; i < digits.length; i++) {
      const dMinIndex = line.indexOf(digits[i])
      const dMaxIndex = line.lastIndexOf(digits[i])
      const lMinIndex = line.indexOf(letters[i])
      const lMaxIndex = line.lastIndexOf(letters[i])
      if (dMinIndex >= 0 && dMinIndex < minIndexPair[0]) {
        minIndexPair = [dMinIndex, digits[i]]
      }
      if (dMaxIndex > maxIndexPair[0]) {
        maxIndexPair = [dMaxIndex, digits[i]]
      }
      if (lMinIndex >= 0 && lMinIndex < minIndexPair[0]) {
        minIndexPair = [lMinIndex, digits[i]]
      }
      if (lMaxIndex > maxIndexPair[0]) {
        maxIndexPair = [lMaxIndex, digits[i]]
      }
    }
    sum += parseInt(`${minIndexPair[1]}${maxIndexPair[1]}`, 10)
  }
  return sum
}
