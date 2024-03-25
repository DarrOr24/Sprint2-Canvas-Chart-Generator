'use strict'

const BAR_WIDTH = 40
const BAR_SPACE = 20

var gElCanvas
var gCtx


// function getChart(){}

function clearCanvas(){
    gCtx.fillStyle = 'whitesmoke'
	gCtx.fillRect(0, 0, gElCanvas.width, gElCanvas.height)
    document.querySelector('.chart-title').innerText = ''   
}

function drawChart(){
    const {theme, terms, title} = gChart
    document.querySelector('.chart-title').innerText = title

    const totalVal = terms.reduce((acc, term) =>  acc += +term.value, 0)

    switch(theme){
        default:
            alert('Select chart type')
            break

        case 'rect':
            drawRectChart(terms, totalVal)
            break

        case 'circle':
            drawCircleChart(terms, totalVal)
            break
    }
}

function drawRectChart(terms, totalVal){
    const {valueType} = gChart
    
    if(valueType === 'units') drawRectUnits(terms)
    if(valueType === 'percent') drawRectPercent(terms, totalVal)
}

function drawRectUnits(terms){
    terms.forEach((term, idx) => {
        if(term.value > gElCanvas.height){
            alert(`Maximum unit size is ${gElCanvas.height}`)
            return
        }

        term.x = (idx + 1) * (BAR_SPACE + BAR_WIDTH)
        term.y = gElCanvas.height - term.value

        gCtx.fillStyle = term.color
        gCtx.fillRect(term.x, term.y, BAR_WIDTH, term.value)
    })
}

function drawRectPercent(terms, totalVal){
    terms.forEach((term, idx) => {
        term.x = (idx + 1) * (BAR_SPACE + BAR_WIDTH)
        term.y = gElCanvas.height - (term.value*100/totalVal)*3

        gCtx.fillStyle = term.color
        gCtx.fillRect(term.x, term.y, BAR_WIDTH, term.value*3)
    })
}

function drawCircleChart(terms, totalVal){

    const numOfTerms = terms.length
    
    terms.forEach((term, idx) => {
        gCtx.beginPath()

        if(numOfTerms===1) term.x = (idx + 1) * gElCanvas.width/2
        if(numOfTerms===2) term.x = (idx + 1) * gElCanvas.width/3
        if(numOfTerms===3) term.x = (idx + 1) * gElCanvas.width/4
        if(numOfTerms===4) term.x = (idx + 1) * gElCanvas.width/5
        
        term.y = gElCanvas.height/2
        term.radius = (term.value)*100/totalVal

        gCtx.arc(term.x, term.y, term.radius, 0, 2 * Math.PI) // draws a circle
      
	    gCtx.fillStyle = term.color
	    gCtx.fill()
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





