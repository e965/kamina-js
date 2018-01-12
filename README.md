# kamina.js
Синтаксический сахар (или что-то около того) для собственных нужд.

### Примеры использования

#### $make

`$make.qs(selector, options)`:
```js
$make.qs(
	'.sock',    // эквивалент document.querySelector('.jopa'), или при добавлении опции
	['a']       // эквивалент document.querySelectorAll('.jopa')
)
```

`$make.qsf(selector, fromNode, options)`:
```js
let life = $make.qs('.life')
$make.qsf(
	'.goal',
	life,    // эквивалент life.querySelector('.goal'), или при добавлении опции
	['a']    // эквивалент life.querySelectorAll('.goal')
)

/* или же то же самое, но без использования переменной с селектором '.life' */

$make.qsf('.goal', '.life', ['a'])
```

`$make.safe(value)`:
```js
$make.safe('<img onerror="alert(\'ya tebya vzlomal ololo!\')" src="">') // Экскейпит строку от некоторых нежелательных символов
```

---

#### $create

`$create.elem(what, content, classes, options)`:
```js
$create.elem(
	'div',                   // создание элемента "div"
	'<span>azaza</span>',    // с содержимым "<span>azaza</span>"
	'foo bar',               // и классами "foo" и "bar"
	[
		's',                 // "<span>azaza</span>" будет защищено $make.safe()
		'html'               // функция вернёт html в текстовом виде
	]
)
```

`$create.link(url, content, options)`:
```js
$create.link(
	'https://cojam.ru',      // создание элемента "a" с href="https://cojam.ru". При пустом значении будет href="javascript:void(0)". Для внешних ссылок (начинающихся с "http") автоматически добавляется target="_blank"
	'<span>ololo</span>',    // с содержимым "<span>ololo</span>"
	[
		'e',                 // включает защиту от "опасного target="_blank"" (habr.ru/post/282880/)
		's',                 // "<span>ololo</span>" будет защищено $make.safe()
		'html'               // функция вернёт html в текстовом виде
	]
)
```

`$create.text(content)`:
```js
$create.text('ololo') // создаёт текстовый узел с текстом "ololo"
```

---

#### $check

`$check.get(value)`:
```js
let hello = $check.get('suka')            // создание переменной hello со значением get-параметра "suka" (если он есть, но пустой, то вернётся просто true)
if (hello == 'blyat') { drinkVodka() }    // если get-параметр "suka" равен "blyat", то выполняется drinkVodka()
```

---

#### $ls

`$ls.get(item)`, `$ls.set(item, value)`, `$ls.rm(item)`:
```js
$ls.set('item', 'test')       // создать в локальном хранилище элемент "item" со значением "test"
let item = $ls.get('item')    // присвоить переменной item значение элемента "item" из локального хранилища
$ls.rm('item')                // удалить из локального хранилища элемент "item"
```
`$ls.test()`
```js
if (!$ls.test()) {
	alert('Локальное хранилище отключено!')
}
```

### TODO

* Функции для работы с sessionStorage
