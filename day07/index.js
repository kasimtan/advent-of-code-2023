const fs = require('fs')
const data = fs.readFileSync(`./input.txt`, 'utf-8')
const input = data.split('\n')
const hands = input.map(str => str.split(' ')[0])
const bids = input.map(str => str.split(' ')[1])
const HandType = {
  KIND5: 'five-of-a-kind',
  KIND4: 'four-of-a-kind',
  KIND3: 'three-of-a-kind',
  FH: 'full-house',
  PAIR2: 'two-pair',
  PAIR1: 'one-pair',
  HC: 'high-card'
}
console.log(part1(hands, bids))
console.log(part2(hands, bids))

function part1(hands, bids) {
  let total = 0
  const modifiedHands = hands.map(str => str.replaceAll('J','W').replaceAll('Q','X').replaceAll('K','Y').replaceAll('A','Z'))
  const bidMaps = {}
  for (let i = 0; i < modifiedHands.length; i++) {
    bidMaps[modifiedHands[i]] = bids[i]
  }
  const sortedHands = sortHands(modifiedHands)
  for (let i = 1; i <= sortedHands.length; i++) {
    total += i * bidMaps[sortedHands[i-1]]
  }
  return total
}

function part2(hands, bids) {
  let total = 0
  const jokerId = '1'
  const modifiedHands = hands.map(str => str.replaceAll('J',jokerId).replaceAll('Q','X').replaceAll('K','Y').replaceAll('A','Z'))
  const bidMaps = {}
  for (let i = 0; i < modifiedHands.length; i++) {
    bidMaps[modifiedHands[i]] = bids[i]
  }
  const sortedHands = sortHands(modifiedHands, jokerId)
  for (let i = 1; i <= sortedHands.length; i++) {
    total += i * bidMaps[sortedHands[i-1]]
  }
  return total
}

function sortHands(hands, jokerId) {
  const highCards = []
  const onePairs = []
  const twoPairs = []
  const threeOfAKinds = []
  const fullHouses = []
  const fourOfAKinds = []
  const fiveOfAKinds = []
  for (const hand of hands) {
    const type = getHandType(hand, jokerId)
    if (type === HandType.KIND5) fiveOfAKinds.push(hand)
    else if (type === HandType.KIND4) fourOfAKinds.push(hand)
    else if (type === HandType.FH) fullHouses.push(hand)
    else if (type === HandType.KIND3) threeOfAKinds.push(hand)
    else if (type === HandType.PAIR2) twoPairs.push(hand)
    else if (type === HandType.PAIR1) onePairs.push(hand)
    else highCards.push(hand)
  }
  return [
    ...highCards.sort(),
    ...onePairs.sort(),
    ...twoPairs.sort(),
    ...threeOfAKinds.sort(),
    ...fullHouses.sort(),
    ...fourOfAKinds.sort(),
    ...fiveOfAKinds.sort()
  ]
}

function getHandType(hand, jokerId) {
  const counts = hand.split('').reduce((counts, val) => {
    counts[val] = (counts[val] || 0) + 1
    return counts
  }, {})
  const jokerCount = counts[jokerId]
  const values = Object.values(counts)
  if (values.length === 1) {
    return HandType.KIND5
  }
  else if (values.length === 2 && Math.max(...values) === 4) {
    if (jokerCount > 0) return HandType.KIND5
    return HandType.KIND4
  }
  else if (values.length === 2) {
    if (jokerCount > 0) return HandType.KIND5
    return HandType.FH
  }
  else if (values.length === 3 && Math.max(...values) === 3) {
    if (jokerCount > 0) return HandType.KIND4
    return HandType.KIND3
  }
  else if (values.length === 3) {
    if (jokerCount > 1) return HandType.KIND4
    if (jokerCount > 0) return HandType.FH
    return HandType.PAIR2
  }
  else if (values.length === 4) {
    if (jokerCount > 0) return HandType.KIND3
    return HandType.PAIR1
  }
  else {
    if (jokerCount > 0) return HandType.PAIR1
    return HandType.HC
  }
}
