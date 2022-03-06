import { v4 as uuid } from 'https://jspm.dev/uuid'

export function createKeyboard() {
  const ID = uuid()
  const rows = ['qwertyuiop', 'asdfghjkl', 'zxcvbnm']

  const $keyboard = document.createElement('div')
  $keyboard.id = `keyboard-${ID}`
  $keyboard.classList.add('keyboard')

  for (let i = 0; i < rows.length; i++) {
    const $row = document.createElement('div')
    $row.id = `keyboard-row-${ID}-${i}`
    $row.classList.add('keyboard__row')
    $keyboard.appendChild($row)

    const row = rows[i]

    for (let j = 0; j < row.length; j++) {
      const key = row[j]
      const $key = document.createElement('div')
      $key.id = `keyboard-key-${key}-${ID}`
      $key.classList.add('keyboard__key')
      $key.textContent = key
      $row.appendChild($key)
    }

    const IS_MIDDLE_ROW = i === 1
    const IS_LAST_ROW = i === 2

    if (IS_MIDDLE_ROW) {
      const $spacer = document.createElement('div')
      $spacer.classList.add('keyboard__spacer')
      $row.prepend($spacer)
      $row.appendChild($spacer.cloneNode(true))
    }

    if (IS_LAST_ROW) {
      const $enter = document.createElement('div')
      $enter.id = `keyboard-enter-${ID}`
      $enter.classList.add('keyboard__special')
      $enter.textContent = 'enter'

      const $delete = document.createElement('div')
      $delete.id = `keyboard-delete-${ID}`
      $delete.classList.add('keyboard__special')
      $delete.textContent = 'del'

      $row.prepend($enter)
      $row.appendChild($delete)
    }
  }

  const events = []

  $keyboard.disable = () => {
    events.forEach(event => event.element.removeEventListener(event.type, event.handler))
  }

  $keyboard.on = (type, callback) => {
    if (type === 'key') {
      const $keys = Array.from($keyboard.querySelectorAll('.keyboard__key'))

      $keys.forEach($key => {
        function handleClick() {
          callback($key.textContent)
        }
        $key.addEventListener('click', handleClick)
        events.push({ element: $key, type: 'click', handler: handleClick })
      })

      function handleKeyDown({ key }) {
        if (/^[a-z]$/.test(key)) {
          const $key = $keys.find($key => $key.textContent === key)
          $key.click()
        }
      }
      document.addEventListener('keydown', handleKeyDown)
      events.push({ element: document, type: 'keydown', handler: handleKeyDown })
    }

    if (type === 'delete') {
      const $delete = $keyboard.querySelector(`#keyboard-delete-${ID}`)
      function handleClick() {
        callback()
      }
      $delete.addEventListener('click', handleClick)
      events.push({ element: $delete, type: 'click', handler: handleClick })

      function handleKeyDown({ key }) {
        if (key === 'Backspace' || key === 'Delete') {
          $delete.click()
        }
      }
      document.addEventListener('keydown', handleKeyDown)
      events.push({ element: document, type: 'keydown', handler: handleKeyDown })
    }

    if (type === 'enter') {
      const $enter = $keyboard.querySelector(`#keyboard-enter-${ID}`)
      function handleClick() {
        callback()
      }
      $enter.addEventListener('click', handleClick)

      function handleKeyDown({ key }) {
        if (key === 'Enter') {
          $enter.click()
        }
      }
      document.addEventListener('keydown', handleKeyDown)
      events.push({ element: document, type: 'keydown', handler: handleKeyDown })
    }
  }

  $keyboard.keys = keys => {
    const $keys = []
    keys.forEach(key => {
      const $key = $keyboard.querySelector(`#keyboard-key-${key}-${ID}`)
      $keys.push($key)
    })

    $keys.paint = diff => {
      $keys.forEach(($key, index) => {
        if ($key.classList.contains('keyboard__key--correct')) {
          return
        }

        $key.classList.add(`keyboard__key--${diff[index]}`)
      })
    }

    return $keys
  }

  return $keyboard
}
