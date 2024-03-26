'use strict'

const BAR_WIDTH = 40
const BAR_SPACE = 20

var gElCanvas
var gCtx


// function getChart(){}

function clearCanvas(){
    gCtx.fillStyle = 'whitesmoke'
    // gCtx.fillStyle = '#f0f0f0'
	gCtx.fillRect(0, 0, gElCanvas.width, gElCanvas.height)
    document.querySelector('.chart-title').innerText = ''   
}

function drawChart(){
    const {theme, terms, title, valueType} = gChart
    document.querySelector('.chart-title').innerText = title

    const totalVal = terms.reduce((acc, term) =>  acc += +term.value, 0)
    terms.forEach(term => term.totalVal = totalVal)

    switch(theme){
        default:
            alert('Select chart type')
            break

        case 'rect':
            if(valueType === 'units') drawRectUnits(terms)
            if(valueType === 'percent') drawRectPercent(terms)
            break

        case 'circle':
            if(valueType === 'units') drawCircleUnits(terms)
            if(valueType === 'percent') drawCirclePercent(terms)
            break

        case 'pie':
            if(valueType === 'units') drawPieUnits(terms)
            if(valueType === 'percent') drawPiePercent(terms)
            break
    }
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

function drawRectPercent(terms){
    terms.forEach((term, idx) => {
        term.x = (idx + 1) * (BAR_SPACE + BAR_WIDTH)
        term.y = gElCanvas.height - (term.value*100/term.totalVal)*3

        gCtx.fillStyle = term.color
        gCtx.fillRect(term.x, term.y, BAR_WIDTH, term.value*3)
    })
}

function drawCirclePercent(terms){
    const numOfTerms = terms.length

    terms.forEach((term, idx) => {
        gCtx.beginPath()

        if(numOfTerms===1) term.x = (idx + 1) * gElCanvas.width/2
        if(numOfTerms===2) term.x = (idx + 1) * gElCanvas.width/3
        if(numOfTerms===3) term.x = (idx + 1) * gElCanvas.width/4
        if(numOfTerms===4) term.x = (idx + 1) * gElCanvas.width/5
        
        term.y = gElCanvas.height/2
        term.radius = (term.value)*100/term.totalVal

        gCtx.arc(term.x, term.y, term.radius, 0, 2 * Math.PI) // draws a circle
      
	    gCtx.fillStyle = term.color
	    gCtx.fill()
    })
}

function drawCircleUnits(terms){
    const numOfTerms = terms.length
    terms.forEach((term, idx) => {
        if(term.value > gElCanvas.height){
            alert(`Maximum unit size is ${gElCanvas.height}`)
            return
        }

        gCtx.beginPath()

        if(numOfTerms===1) term.x = (idx + 1) * gElCanvas.width/2
        if(numOfTerms===2) term.x = (idx + 1) * gElCanvas.width/3
        if(numOfTerms===3) term.x = (idx + 1) * gElCanvas.width/4
        if(numOfTerms===4) term.x = (idx + 1) * gElCanvas.width/5
        
        term.y = gElCanvas.height/2
        term.radius = term.value/2

        gCtx.arc(term.x, term.y, term.radius, 0, 2 * Math.PI) // draws a circle
      
	    gCtx.fillStyle = term.color
	    gCtx.fill()
    })

}

function drawPiePercent(terms){
    // const numOfTerms = terms.length
    console.log('hi')

    terms.forEach((term, idx) => {
        gCtx.beginPath()
        term.totalVal = 300;
        

        term.x = gElCanvas.width/2
        term.y = gElCanvas.height/2
        term.radius = 100
        const ratio = term.value/term.totalVal
        console.log(term.value)
        console.log('total',term.totalVal)
        console.log(ratio)
        term.angle = ratio*2 * Math.PI
        console.log(ratio)
        

        const startAngle = term.angle*idx

        gCtx.arc(term.x, term.y, term.radius, startAngle, ratio*Math.PI) // draws a circle
      
	    gCtx.StrokeStyle = term.color
	    gCtx.stroke()
    })
}

function mouseMove(offsetX, offsetY, clientX, clientY){
    const {terms, valueType, theme} = gChart

    switch(theme){
        case 'rect':
            if(valueType === 'units') mouseMoveRectUnits(terms,offsetX, offsetY, clientX, clientY)
            if(valueType === 'percent') mouseMoveRectPerc(terms,offsetX, offsetY, clientX, clientY)
            break

        case 'circle':
            mouseMoveCircle(terms,offsetX, offsetY, clientX, clientY)
            break
    }
}

function mouseMoveRectUnits(terms,offsetX, offsetY, clientX, clientY){
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

function mouseMoveRectPerc(terms,offsetX, offsetY, clientX, clientY){
    const term = terms.find(term => {
        var { x, y, value } = term

        return (offsetX >= x && offsetX <= x + BAR_WIDTH &&
                offsetY >= y && offsetY <= y + value*3)
    })

    if(term){
        openModal(term.name, (term.value*100/term.totalVal), clientX, clientY)
    } else {
        closeModal()
    }
}
function mouseMoveCircle(terms,offsetX, offsetY, clientX, clientY){
    const {valueType} = gChart

    const term = terms.find(term => {
        var { x, y, value, radius } = term
        
        return (offsetX >= x-radius  && offsetX <= x + radius &&
                offsetY >= y - radius && offsetY <= y + radius)
    })

    if(term){
        if(valueType === 'units') openModal(term.name, term.value, clientX, clientY)
        if(valueType === 'percent') openModal(term.name, term.radius, clientX, clientY)
    } else {
        closeModal()
    }
}

function openModal(termName, termValue, x, y) {
    
    var {valueType, theme} = gChart
    if(valueType === 'percent'){
        valueType = `%`
        termValue = termValue.toFixed(2)
    } 

    const elModal = document.querySelector('.modal')

	elModal.innerText = `${termName}: ${termValue}${valueType}`
	elModal.style.opacity = 1
	elModal.style.top = y + 'px'
	elModal.style.left = x + 'px'
}

function closeModal() {
	document.querySelector('.modal').style.opacity = 0
}





