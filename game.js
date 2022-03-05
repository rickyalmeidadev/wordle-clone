function isValid(guess) {
  return guess.length === 5
}

function diff(answer, guess) {
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
  let answer = 'react'
  let row = 0

  $keyboard.on('key', key => {
    $board.row(row).write(key)
  })

  $keyboard.on('delete', () => {
    $board.row(row).erase()
  })

  $keyboard.on('enter', () => {
    const guess = $board.row(row).read()

    if (!isValid(guess)) {
      return
    }

    $board.row(row).paint(diff(answer, guess))

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
