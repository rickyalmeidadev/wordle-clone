# Wordle Clone

> :construction: Documentation under construction

## Demo

Visit the [demo](https://rickyalmeidadev-wordle.netlify.app/) to see the wordle clone in action.

## Features

- A new word every day
- Responsive design
- Mobile friendly
- Virtual Keyboard

## API

#### createKeyboard()

It returns a keyboard instance.

```js
const $keyboard = createKeyboard();
```

#### $keyboard.disable()

Disable the virtual keyboard and turn off every keyboard event.

```js
$keyboard.disable();
```

#### $keyboard.on(type, callback)

A keyboard event listener.

```js
$keyboard.on('key', key => console.log('Pressed key: ', key));
```

| Parameter  | Type       | Description                                 | Required |
| :--------- | :--------- | :------------------------------------------ | :------- |
| `type`     | `string`   | Type of the event                           | Yes      |
| `callback` | `function` | A callback called when the event is trigged | Yes      |

### $keyboard.keys(keys)

It receives an array of keys and returns the interface to manage them on the virtual keyboard.

```js
const $keys = $keyboard.keys(['h', 'o', 'u', 's', 'e']);
```

| Parameter | Type       | Description       | Required |
| :-------- | :--------- | :---------------- | :------- |
| `keys`    | `string[]` | A list of letters | Yes      |

## Author

Made with :heart: by [Ricky Almeida](https://www.github.com/rickyalmeidadev)
