'use strict'

function saveToStorage(key, val) {
    const strVal = JSON.stringify(val)
	localStorage.setItem(key, strVal)
}

function loadFromStorage(key) {
	var val = localStorage.getItem(key)
	return JSON.parse(val)
}

function loadAll(){
    const myChartsArr = []
    for ( var i = 0, len = localStorage.length; i < len; ++i ) {
        var val = localStorage.getItem(localStorage.key(i)) 
        var jsonVal = JSON.parse(val)
        myChartsArr.push( jsonVal )
    }
    return myChartsArr
}

