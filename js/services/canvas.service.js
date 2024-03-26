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
            drawPie(terms)
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

function drawPie(terms){
    const totalVal = terms.reduce((acc, term) =>  acc += +term.value, 0)
    terms.forEach(term => term.totalVal = totalVal)
    const radius = 100
   
    terms.forEach((term, idx, arr) => {
        gCtx.beginPath()
        
        term.x = gElCanvas.width/2
        term.y = gElCanvas.height/2
        
        const ratio = term.value/term.totalVal
        
        term.angle = ratio*360
       
        var startAngle = 0
        

        for(var i=1; i<=idx; i++){
            startAngle += arr[idx-i].angle
        }

        const start = startAngle*Math.PI/180
        const finish = (startAngle+term.angle)*Math.PI/180
        const angleRad = [start, finish]

        const lines = angleRad.map(angle => {
            const xEnd= radius*Math.cos(angle) + term.x
            const yEnd= radius*Math.sin(angle) + term.y
            const line = {
                x: term.x,
                y: term.y,
                xEnd: xEnd,
                yEnd: yEnd,
                color: term.color
            }
            // drawLine(line)
            return line
        })

        drawTriangle(lines)

        drawArcDeg(term.x, term.y,radius, startAngle, term.angle, term.color)
    })
}


function drawArcDeg(x, y, radius, startAngle, angle, color){
    gCtx.beginPath()
    angle = angle*Math.PI/180
    startAngle = startAngle*Math.PI/180
    
    gCtx.arc(x, y, radius, startAngle, angle+startAngle) // draws a circle
        
	gCtx.strokeStyle = color
	gCtx.stroke()
    // gCtx.fillStyle = color
	// gCtx.fill()
}

function drawLine(line) {
    const {x, y, xEnd, yEnd, color} = line
    gCtx.beginPath()
	gCtx.moveTo(x, y)
	gCtx.lineTo(xEnd, yEnd)
    
	// gCtx.lineWidth = 3
	gCtx.strokeStyle = color
	gCtx.stroke()
}

function drawTriangle(lines){
    drawLine(lines[0])
    // drawLine(lines[1])
    const closingLine = {
        x: lines[0].xEnd,
        y: lines[0].yEnd,
        xEnd: lines[1].xEnd,
        yEnd: lines[1].yEnd,
        color: lines[0].color
    }
    drawLine(closingLine)
    gCtx.closePath()
    gCtx.fillStyle = lines[0].color
	gCtx.fill()

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





