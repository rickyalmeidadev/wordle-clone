export function createHeader() {
  const $header = document.createElement('header')
  $header.id = 'header'
  $header.classList.add('header')

  const $title = document.createElement('h1')
  $title.id = 'title'
  $title.classList.add('header__title')
  $title.textContent = 'Wordle'
  $header.appendChild($title)

  return $header
}