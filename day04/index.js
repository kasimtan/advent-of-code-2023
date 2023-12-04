const fs = require('fs')
const data = fs.readFileSync(`./input.txt`, 'utf-8')
const input = data.split('\n').map(str => str.substring(str.indexOf(':')+2))
console.log(part1(input))
console.log(part2(input))

function part1(input) {
  let sum = 0
  for (const line of input) {
    const [winningNumbers, cardNumbers] = line.split(' | ').map(str => str.split(' ').filter(el => el !== ''))
    const totalMatching = cardNumbers.filter(value => winningNumbers.includes(value)).length
    if (totalMatching > 0) {
      sum += Math.pow(2, totalMatching - 1)
    }
  }
  return sum
}

function part2(input) {
  const additionalCards = []
  for (let i = 1; i <= input.length; i++) {
    const [winningNumbers, cardNumbers] = input[i-1].split(' | ').map(str => str.split(' ').filter(el => el !== ''))
    const totalMatching = cardNumbers.filter(value => winningNumbers.includes(value)).length
    if (totalMatching > 0) {
      const multiplier = additionalCards.filter(value => value === i).length + 1
      for (let k = 1; k <= multiplier; k++) {
        for (let j = 1; j <= totalMatching; j++) {
          additionalCards.push(i + j)
        }
      }
    }
  }
  return input.length + additionalCards.length
}