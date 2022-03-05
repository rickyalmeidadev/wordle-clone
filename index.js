import { createBoard } from './components/board.js'
import { createHeader } from './components/header.js'
import { createKeyboard } from './components/keyboard.js'
import { buildGame } from './game.js'

const $header = createHeader()
const $board = createBoard({ columns: 5, rows: 6 })
const $keyboard = createKeyboard()

buildGame({ $board, $keyboard })

const $root = document.getElementById('root')

$root.appendChild($header)
$root.appendChild($board)
$root.appendChild($keyboard)
