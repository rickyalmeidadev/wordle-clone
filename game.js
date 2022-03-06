import { words } from './utils/words.js'

function validate(guess) {
  return words.includes(guess)
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

    const isValid = validate(guess)

    if (!isValid) {
      alert('Not in word list')
      return
    }

    $board.row(row).paint(diff)
    $keyboard.keys(keys).paint(diff)

    if (guess === answer) {
      alert('You win!')
      $keyboard.disable()
      return
    }

    if (row === 5) {
      alert(`You lost! The answer was ${answer}`)
      return
    }

    row++
  })
}
