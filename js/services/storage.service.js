'use strict'

function saveToStorage(key, val) {
    const strVal = JSON.stringify(val)
	localStorage.setItem(key, strVal)
}

function loadFromStorage(key) {
    const len = localStorage.length
    
    if (!len){
        // alert('No saved charts')
        return []
    }
	const val = localStorage.getItem(key)
	return JSON.parse(val)
}



