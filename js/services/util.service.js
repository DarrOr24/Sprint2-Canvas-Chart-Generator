'use strict'

function getRandomColor() {
	const letters = '0123456789ABCDEF'
	let color = '#'

	for (var i = 0; i < 6; i++) {
		color += letters[Math.floor(Math.random() * 16)]
	}
	return color
}

function makeId(length = 4) {
	const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
	var id = ''
    
	for (var i = 0; i < length; i++) {
		id += possible.charAt(Math.floor(Math.random() * possible.length))
	}
	return id
}

function getRandomInt(min, max) {
	min = Math.ceil(min)
	max = Math.floor(max)
	return Math.floor(Math.random() * (max - min) + min) // The maximum is exclusive and the minimum is inclusive
}

function getDate(){
    const currDate = new Date().toJSON()
    const date = currDate.slice(0,10)
    const time = currDate.slice(11, 19)
	const timeStamp = new Date().getTime()
    return {date, time, timeStamp}
}