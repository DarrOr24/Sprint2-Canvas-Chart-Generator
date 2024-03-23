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
    const len = localStorage.length
    
    if (!len){
        alert('No saved charts')
        return
    }

    const myChartsArr = []
    for ( var i = 0; i < len; ++i ) {
        var val = localStorage.getItem(localStorage.key(i)) 
        var jsonVal = JSON.parse(val)
        if (jsonVal.type === "myChart") myChartsArr.push( jsonVal )
    }
    return myChartsArr
}

