import { words } from './utils/words.js'

async function validate(guess) {
  if (guess.length == !5) {
    return false
  }

  const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${guess}`)
  return response.ok
}

function check(answer, guess) {
  let result = []

  for (let i = 0; i < guess.length; i++) {
    if (answer[i] === guess[i]) {
      result.push('correct')
      continue
    }
    if (answer.includes(guess[i])) {
      result.push('present')
      continue
    }

    result.push('absent')
  }

  return result
}

export function buildGame({ $board, $keyboard }) {
  const today = new Date()
  const index = today.getDate() + today.getMonth()
  const answer = words[index]

  let row = 0

  $keyboard.on('key', key => {
    $board.row(row).write(key)
  })

  $keyboard.on('delete', () => {
    $board.row(row).erase()
  })

  $keyboard.on('enter', async () => {
    const guess = $board.row(row).read()
    const keys = guess.split('')
    const diff = check(answer, guess)

    const isValid = await validate(guess)

    if (!isValid) {
      return
    }

    $board.row(row).paint(diff)
    $keyboard.keys(keys).paint(diff)

    if (guess === answer) {
      $keyboard.disable()
      return
    }

    if (row === 5) {
      return
    }

    row++
  })
}
