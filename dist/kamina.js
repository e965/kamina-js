'use strict'

/*
 * kamina.js
 * cojam.ru, 2017
 */

var $make = {
	qs: function(qS, options) {
		if (!options) options = []
		return options.includes('a') ? document.querySelectorAll(qS) : document.querySelector(qS)
	},
	safe: (value) => value.toString().replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/'/g, '&#39;').replace(/"/g, '&#34;')
}

var $create = {
	elem: function(what, content, classes, options) {
		let elem = document.createElement(what)

		if (!options) options = []
		if (!content) content = ''

		if (content && options.includes('s'))
			elem.textContent = content
			else elem.innerHTML = content

		if (classes) elem.setAttribute('class', classes)

		return options.includes('html') ? elem.outerHTML : elem
	},
	link: function(url, content, options) {
		let link = this.elem('a')

		if (url)
			link.setAttribute('href', $make.safe(url))
			else link.setAttribute('href', 'javascript:void(0)')

		if (url.indexOf('http') == 0) link.setAttribute('target', '_blank')

		if (!options) options = []
		if (options.includes('e')) link.setAttribute('rel', 'nofollow noopener')
		if (options.includes('s'))
			link.textContent = content
			else link.innerHTML = content

		return options.includes('html') ? link.outerHTML : link
	}
}

var $check = {
	get: function(value) {
		let params = new URLSearchParams(location.search)
		return (params.get(value) == '') ? true : params.get(value)
	}
}

var $ls = {
	get: (item) => localStorage.getItem(item),
	set: (item, value) => localStorage.setItem(item, value),
	rm: (item) => localStorage.removeItem(item),
	test: function() {
		let test = 'ls_test'
		try {
			this.set(test, test)
			this.rm(test)
			return true
		} catch (e) { return false }
	}
}
