'use strict'

/*
 * kamina.js, yet another syntactic sugar
 * cojam.ru, 2017-2018
 */

let $make = {
	qs: (qS, options = []) => {
		return options.includes('a')
			? document.querySelectorAll(qS)
			: document.querySelector(qS)
	},

	qsf: (qS, from, options = []) => {
		if (!from.nodeName) {
			from = document.querySelector(from)
		}

		return options.includes('a')
			? from.querySelectorAll(qS)
			: from.querySelector(qS)
	},

	safe: value => value.toString()
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/'/g, '&#39;')
		.replace(/"/g, '&#34;')
}

let $create = {
	elem: (what = '', content = '', classes = '', options = []) => {
		let elem = document.createElement(what)

		if (classes != '') {
			elem.setAttribute('class', classes)
		}

		if (content != '') {
			elem.innerHTML = options.includes('s')
				? $make.safe(content)
				: content
		}

		return options.includes('html')
			? elem.outerHTML
			: elem
	},

	link: (url = 'javascript:void(0)', content = '', classes = '', options = []) => {
		let link = document.createElement('a')

		link.setAttribute('href', url)

		if (url.startsWith('http')) {
			link.setAttribute('target', '_blank')
		}

		if (options.includes('e')) {
			link.setAttribute('rel', 'nofollow noopener')
		}

		if (classes != '') {
			link.setAttribute('class', classes)
		}

		if (content != '') {
			link.innerHTML = options.includes('s')
				? $make.safe(content)
				: content
		}

		return options.includes('html')
			? link.outerHTML
			: link
	},

	text: content => document.createTextNode(content)
}

let $check = {
	get: value => {
		let params = new URLSearchParams(location.search)

		return (params.get(value) == '')
			? true
			: params.get(value)
	}
}

let $storage = {
	getType: (options = []) =>
		options.includes('s')
			? sessionStorage
			: localStorage,

	get(item, options) {
		return (this.getType(options)).getItem(item)
	},

	set(item, value, options) {
		return (this.getType(options)).setItem(item, value)
	},

	rm(item, options) {
		return (this.getType(options)).removeItem(item)
	},

	test() {
		let test = `$s_${Math.random()}`

		try {
			console.log(this.getType_)

			this.set(test, test)
			this.rm(test)
			return true
		} catch (e) { console.log(e); return false }
	}
}

let $ls = $storage // для сохранения совместимости со старыми версиями
