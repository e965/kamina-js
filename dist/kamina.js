'use strict'

/*
 * kamina.js, yet another syntactic sugar
 * cojam.ru, 2017-2018
 */

var $make = {
	qs: (qS, options) => {
		if (!options) { options = [] }
		return options.includes('a')
			? document.querySelectorAll(qS)
			: document.querySelector(qS)
	},
	qsf: (qS, from, options) => {
		if (!options) { options = [] }
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

var $create = {
	elem: (what, content, classes, options) => {
		let elem = document.createElement(what)

		if (!options) { options = [] }
		if (!content) { content = '' }

		if (classes) {
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
	link: (url, content, classes, options) => {
		let link = document.createElement('a')

		if (!options) { options = [] }
		if (!content) { content = '' }

		link.setAttribute('href', (url != '')
			? $make.safe(url)
			: 'javascript:void(0)')

		if (url.indexOf('http') == 0) {
			link.setAttribute('target', '_blank')
		}

		if (options.includes('e')) {
			link.setAttribute('rel', 'nofollow noopener')
		}

		if (classes) {
			elem.setAttribute('class', classes)
		}

		if (content != '') {
			link.innerHTML = content != '' && options.includes('s')
				? $make.safe(content)
				: content
		}

		return options.includes('html')
			? link.outerHTML
			: link
	},
	text: content => document.createTextNode(content)
}

var $check = {
	get: value => {
		let params = new URLSearchParams(location.search)
		return (params.get(value) == '')
			? true
			: params.get(value)
	}
}

var $ls = {
	get: item => localStorage.getItem(item),
	set: (item, value) => localStorage.setItem(item, value),
	rm: item => localStorage.removeItem(item),
	test() {
		let test = 'ls_test'
		try {
			this.set(test, test)
			this.rm(test)
			return true
		} catch (e) { return false }
	}
}
