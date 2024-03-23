'use strict'

const BAR_WIDTH = 40
const BAR_SPACE = 20

var gElCanvas
var gCtx


function getChart(){}

function clearCanvas(){
    gCtx.fillStyle = 'whitesmoke'
	gCtx.fillRect(0, 0, gElCanvas.width, gElCanvas.height)
    document.querySelector('.chart-title').innerText = ''   
}

function drawChart(){
    const {terms, title} = gChart
    document.querySelector('.chart-title').innerText = title
    
    terms.forEach((term, idx) => {

        term.x = (idx + 1) * (BAR_SPACE + BAR_WIDTH)
        term.y = gElCanvas.height - term.value

        gCtx.fillStyle = term.color
        gCtx.fillRect(term.x, term.y, BAR_WIDTH, term.value)
    })
}

function onMouseMove(ev) {
	const { offsetX, offsetY, clientX, clientY } = ev
    const {terms} = gChart
    
    const term = terms.find(term => {
        var { x, y, value } = term

        return (offsetX >= x && offsetX <= x + BAR_WIDTH &&
                offsetY >= y && offsetY <= y + value)
    })

    if(term){
        openModal(term.name, term.value, clientX, clientY)
    } else {
        closeModal()
    }
}

function openModal(termName, termValue, x, y) {
	const elModal = document.querySelector('.modal')

	elModal.innerText = `${termName}: ${termValue}`
	elModal.style.opacity = 1
	elModal.style.top = y + 'px'
	elModal.style.left = x + 'px'
}

function closeModal() {
	document.querySelector('.modal').style.opacity = 0
}