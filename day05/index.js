const fs = require('fs')
const data = fs.readFileSync(`./input.txt`, 'utf-8')
const input = data.split('\n\n').map(str => str.split(/: |\n/).slice(1))
const seeds = input[0][0].split(/\s/).map(Number)
const phases = input.slice(1).map(arr => arr.map(str => str.split(/\s/).map(Number)))
console.log(part1(seeds, phases))
console.log(part2(seeds, phases))

function part1(seeds, phases) {
  let minLocation = Number.MAX_SAFE_INTEGER
  for (const seed of seeds) {
    const result = getLocation(seed, phases)
    if (result < minLocation) {
      minLocation = result
    }
  }
  return minLocation
}

function part2(seeds, phases) {
  let minLocation = Number.MAX_SAFE_INTEGER
  console.time('total execution time')
  for (let i = 0; i < seeds.length; i += 2) {
    console.time(`seed pair ${i/2}`)
    for (let seed = seeds[i]; seed < seeds[i] + seeds[i+1]; seed++) {
      const result = getLocation(seed, phases)
      if (result < minLocation) {
        minLocation = result
      }
    }
    console.timeEnd(`seed pair ${i/2}`)
  }
  console.timeEnd('total execution time')
  return minLocation
}

function getLocation(seed, phases) {
  let result = seed
  for (const phase of phases) {
    // avoid using array destructuring as it hits performance pretty badly
    // i.e. for (const [dest, source, len] of phase) {}
    for (const ranges of phase) {
      var lower = ranges[1];
      var upper = ranges[1] + ranges[2];
      if (result >= lower && result < upper) {
        result = ranges[0] + (result - lower)
        break;
      }
    }
  }
  return result
}
