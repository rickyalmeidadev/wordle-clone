import { v4 as uuid } from 'https://jspm.dev/uuid'

export function createBoard({ columns = 5, rows = 6 } = {}) {
  const ID = uuid()

  const $board = document.createElement('div')
  $board.id = `board-${ID}`
  $board.classList.add('board')

  for (let i = 0; i < rows; i++) {
    const $row = document.createElement('div')
    $row.id = `row-${ID}-${i}`
    $row.classList.add('board__row')
    $board.appendChild($row)

    for (let j = 0; j < columns; j++) {
      const $column = document.createElement('div')
      $column.id = `column-${ID}-${i}-${j}`
      $column.classList.add('board__column')
      $row.appendChild($column)
    }
  }

  $board.row = row => {
    const $row = $board.querySelector(`#row-${ID}-${row}`)
    const $columns = Array.from($row.querySelectorAll('.board__column'))

    return {
      write: letter => {
        const $column = $columns.find($column => !$column.textContent)

        if ($column instanceof HTMLElement) {
          $column.textContent = letter
        }
      },
      erase: () => {
        const $column = Array.from($columns)
          .reverse()
          .find($column => !!$column.textContent)

        if ($column instanceof HTMLElement) {
          $column.textContent = ''
        }
      },
      read: () => {
        return $columns.reduce(
          (accumulator, $column) => accumulator + $column.textContent,
          '',
        )
      },
      paint: diff => {
        $columns.forEach(($column, index) => {
          $column.classList.add(`board__column--${diff[index]}`)
        })
      },
    }
  }

  $board.read = () => {
    const $rows = Array.from($board.querySelectorAll('.board__row'))

    let board = 'Have a go: https://bit.ly/3pC5xzq\n\n'
    let done = false

    $rows.forEach($row => {
      if (done) {
        return
      }

      const $columns = Array.from($row.querySelectorAll('.board__column'))

      $columns.forEach($column => {
        if ($column.classList.contains('board__column--correct')) {
          board += '🟩'
          return
        }

        if ($column.classList.contains('board__column--present')) {
          board += '🟨'
          return
        }

        if ($column.classList.contains('board__column--absent')) {
          board += '⬛'
          return
        }

        done = true
      })

      board += '\n'
    })

    return board
  }

  return $board
}
