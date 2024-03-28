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
}

function drawChart(){
    const {theme, terms, title, valueType, backgroundName} = gChart
    write(title, backgroundName)
    
    const totalVal = terms.reduce((acc, term) =>  acc += +term.value, 0)
    terms.forEach(term => term.totalVal = totalVal)

    switch(theme){
        default:
            alert('Select chart type')
            break

        case 'rect':
            drawRectChart(valueType, terms)
            break

        case 'circle':
            drawCircleChart(valueType, terms)
            break

        case 'line':
            drawLineChart(valueType, terms, backgroundName)
            break

        case 'pie':
            drawPieChart(terms)
            break
    }
}

function drawRectChart(valueType, terms){
    terms.forEach((term, idx) => {
        term.x = (idx + 1) * (BAR_SPACE + BAR_WIDTH)
        term.percentVal = term.value*100/term.totalVal
        gCtx.fillStyle = term.color
        switch(valueType){
            case 'units':
                if(term.value > gElCanvas.height){
                    alert(`Maximum unit size is ${gElCanvas.height}`)
                    return
                }
                term.y = gElCanvas.height - term.value
                gCtx.fillRect(term.x, term.y, BAR_WIDTH, term.value)
                break
            
            case 'percent':
                // term.y = gElCanvas.height - (term.value*100/term.totalVal)*3.5
                term.y = gElCanvas.height - term.percentVal*3.5
                gCtx.fillRect(term.x, term.y, BAR_WIDTH, term.value*3.5)
        }
    })
}

function drawCircleChart(valueType, terms){
    const numOfTerms = terms.length

    terms.forEach((term, idx) => {
        term.x = (idx + 1) * gElCanvas.width/(numOfTerms+1)
        term.y = gElCanvas.height/2
     
        switch(valueType){
            case 'units':
                if(term.value > gElCanvas.height){
                    alert(`Maximum unit size is ${gElCanvas.height}`)
                    return
                }
                term.radius = term.value/2
                break

            case 'percent':
                term.radius = (term.value)*100/term.totalVal
                break
        }
        gCtx.beginPath()
        gCtx.arc(term.x, term.y, term.radius, 0, 2 * Math.PI) // draws a circle
      
	    gCtx.fillStyle = term.color
	    gCtx.fill()
    })
}

function drawPieChart(terms){
    const totalVal = terms.reduce((acc, term) =>  acc += +term.value, 0)
    terms.forEach(term => term.totalVal = totalVal)
    const radius = 100

   
    terms.forEach((term, idx, arr) => {
        term.radius = radius
        term.x = gElCanvas.width/2
        term.y = gElCanvas.height/2

        term.percentVal = term.value*100/totalVal
        
        const ratio = term.value/term.totalVal
        term.angle = ratio*2*Math.PI
       
        term.startAngle = 0
        
        for(var i=1; i<=idx; i++){
            term.startAngle += arr[idx-i].angle
        }

        const line = {
            x: term.x,
            y: term.y,
            xEnd: term.radius*Math.cos(term.startAngle) + term.x,
            yEnd: term.radius*Math.sin(term.startAngle) + term.y,
            color: term.color
        }

        term.line = line

        gCtx.beginPath()
        drawLine(line)
        drawArc(term.x, term.y,term.radius, term.startAngle, term.angle, term.color)
        gCtx.closePath()
        gCtx.fillStyle = term.color
	    gCtx.fill()
    })
}

function drawLineChart(valueType, terms, backgroundName){
    const numOfTerms = terms.length
    terms.forEach((term, idx, arr) => {
        term.percentVal = term.value*100/term.totalVal
        term.radius = 4
        term.x = (idx + 1) * (gElCanvas.width/(numOfTerms+1))

        if(valueType === 'units') {
            if(term.value > gElCanvas.height){ //units cannot exceed canvas height
                alert(`Maximum unit size is ${gElCanvas.height}`)
                return
            }
            term.y = gElCanvas.height - term.value
        } else if(valueType === 'percent') term.y = gElCanvas.height - term.percentVal*3
        
        gCtx.beginPath()
        drawArc(term.x, term.y, term.radius, 0, 2*Math.PI, term.color)
        gCtx.closePath()
        gCtx.fillStyle = term.color
	    gCtx.fill()

        if(backgroundName === '.black') var color = 'white'
        else color = 'black'

        if(idx > 0){
            const line = {
                x: arr[idx-1].x,
                y: arr[idx-1].y,
                xEnd: term.x,
                yEnd: term.y,
                color
            }

            gCtx.beginPath()
            drawLine(line)
            gCtx.closePath()
        } 
    })
}

function drawArc(x, y, radius, startAngle, angle, color){
    gCtx.arc(x, y, radius, startAngle, angle+startAngle) // draws a circle    
	gCtx.strokeStyle = color
	gCtx.stroke()
}

function drawLine(line) {
    const {x, y, xEnd, yEnd, color} = line
    
	gCtx.moveTo(x, y)
	gCtx.lineTo(xEnd, yEnd)
    
	gCtx.strokeStyle = color
	gCtx.stroke()
}

function mouseMove(offsetX, offsetY, clientX, clientY){
    const {terms, theme} = gChart

    switch(theme){
        case 'rect':
            mouseMoveRect(terms,offsetX, offsetY, clientX, clientY)
            break

        case 'circle':
            mouseMoveCircle(terms,offsetX, offsetY, clientX, clientY)
            break

        case 'pie':
            mouseMovePie(terms,offsetX, offsetY, clientX, clientY)
            break

        case 'line':
            mouseMoveLine(terms,offsetX, offsetY, clientX, clientY)
            break
    }
}

function mouseMoveRect(terms,offsetX, offsetY, clientX, clientY){
    const {valueType} = gChart
    const term = terms.find(term => {
        var { x, y, value } = term
        if(valueType === 'units'){
            return (offsetX >= x && offsetX <= x + BAR_WIDTH &&
                    offsetY >= y && offsetY <= y + value)
        }else if(valueType === 'percent'){
            return (offsetX >= x && offsetX <= x + BAR_WIDTH &&
                    offsetY >= y && offsetY <= y + value*3.5)
        }
    })

    if((term) && valueType === 'units'){
        openModal(term.name, term.value, clientX, clientY)
    }else if((term) && valueType === 'percent'){
        openModal(term.name, term.percentVal, clientX, clientY)
    }else {
        closeModal()
    }
}

function mouseMoveCircle(terms,offsetX, offsetY, clientX, clientY){
    const {valueType} = gChart

    const term = terms.find(term => {
        var { x, y, radius } = term
        
        return (offsetX >= x - radius  && offsetX <= x + radius &&
                offsetY >= y - radius  && offsetY <= y + radius)
    })

    if(term){
        if(valueType === 'units') openModal(term.name, term.value, clientX, clientY)
        if(valueType === 'percent') openModal(term.name, term.radius, clientX, clientY)
    } else {
        closeModal()
    }
}

function mouseMovePie(terms,offsetX, offsetY, clientX, clientY){
    const {valueType} = gChart
    const term = terms.find((term, idx, arr) => {
        const { line} = term
        if(idx === arr.length - 1){
            var endLine = arr[0].line
        }else {
            endLine = arr[idx+1].line
        }
        //NOT SO ACCURATE (FIX IT IF I HAVE TIME)
        const xMax = Math.max(line.xEnd, endLine.xEnd)
        const xMin = Math.min(line.xEnd, endLine.xEnd)
        const yMax = Math.max(line.yEnd, endLine.yEnd)
        const yMin = Math.min(line.yEnd, endLine.yEnd)
    
        return (offsetX >= xMin && offsetX <= xMax &&
                offsetY >= yMin && offsetY <= yMax)
    })

    if((term) && valueType === 'units'){
        openModal(term.name, term.value, clientX, clientY)
    }else if((term) && valueType === 'percent'){
        openModal(term.name, term.percentVal, clientX, clientY)
    }else {
        closeModal()
    }
}

function mouseMoveLine(terms,offsetX, offsetY, clientX, clientY){
    const {valueType} = gChart

    const term = terms.find(term => {
        var { x, y, radius } = term
        
        return (offsetX >= x - radius*2  && offsetX <= x + radius*2 &&
                offsetY >= y - radius*2  && offsetY <= y + radius*2)
    })

    if(term){
        if(valueType === 'units') openModal(term.name, term.value, clientX, clientY)
        if(valueType === 'percent') openModal(term.name, term.percentVal, clientX, clientY)
    } else {
        closeModal()
    }
}

function openModal(termName, termValue, x, y) {
    
    var {valueType} = gChart
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

function write(str, backgroundName, pos = {x:175, y:10}){
    gCtx.font = '30px Arial'
    gCtx.textAlign = 'center'
	gCtx.textBaseline = 'top'

    if(backgroundName==='.black') var color='white'
    else color='black'

    str = str.toUpperCase()
    gCtx.fillStyle = color

    gCtx.fillText(str, pos.x, pos.y)
}






