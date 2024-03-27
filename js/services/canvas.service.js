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
            drawRectChart(valueType, terms)
            break

        case 'circle':
            drawCircleChart(valueType, terms)
            break

        case 'line':
            drawLineChart(valueType, terms)
            break

        case 'pie':
            drawPieChart(terms)
            break
    }
}

function drawRectChart(valueType, terms){
    terms.forEach((term, idx) => {
        term.x = (idx + 1) * (BAR_SPACE + BAR_WIDTH)
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
                term.y = gElCanvas.height - (term.value*100/term.totalVal)*3.5
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

function drawLineChart(valueType, terms){
    const numOfTerms = terms.length
    terms.forEach((term, idx, arr) => {
        if(valueType === 'units') {
            if(term.value > gElCanvas.height){ //units cannot exceed canvas height
                alert(`Maximum unit size is ${gElCanvas.height}`)
                return
            }
            term.y = gElCanvas.height - term.value
        } else if(valueType === 'percent') term.y = gElCanvas.height - (term.value*100/term.totalVal)*3
        
        term.x = (idx + 1) * (gElCanvas.width/(numOfTerms+1))

        gCtx.beginPath()
        drawArc(term.x, term.y, 4, 0, 2*Math.PI, term.color)
        gCtx.closePath()
        gCtx.fillStyle = term.color
	    gCtx.fill()

        if(idx > 0){
            const xEnd = term.x
            const yEnd = term.y

            const x = arr[idx-1].x
            const y = arr[idx-1].y

            const line = {
            x: x,
            y: y,
            xEnd: xEnd,
            yEnd: yEnd,
            color: 'black'
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
    const {terms, valueType, theme} = gChart

    switch(theme){
        case 'rect':
            mouseMoveRect(valueType, terms,offsetX, offsetY, clientX, clientY)
            break

        case 'circle':
            mouseMoveCircle(terms,offsetX, offsetY, clientX, clientY)
            break

        // case 'pie':
        //     mouseMovePie(terms,offsetX, offsetY, clientX, clientY)
        //     break
    }
}

function mouseMoveRect(valueType, terms,offsetX, offsetY, clientX, clientY){
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
        openModal(term.name, (term.value*100/term.totalVal), clientX, clientY)
    }else {
        closeModal()
    }
}

function mouseMoveCircle(terms,offsetX, offsetY, clientX, clientY){
    const {valueType} = gChart

    const term = terms.find(term => {
        var { x, y, radius } = term
        
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

function mouseMovePie(terms,offsetX, offsetY, clientX, clientY){
    
    const term = terms.find((term, idx, arr) => {
        const { line } = term
        if(idx === arr.length - 1){
            var endLine = arr[0].line
        }else {
            endLine = arr[idx+1].line
        }
        
        return (offsetX >= line.xEnd && offsetX <= endLine.xEnd &&
                offsetY >= line.yEnd && offsetY <= endLine.yEnd)
    })

    if(term){
        console.log(term.value)
        openModal(term.name, term.value, clientX, clientY)
    } else {
        closeModal()
    }
}

function help(terms){
    terms.forEach((term, idx, arr) => {
        const { line } = term
        if(idx === arr.length - 1){
            var endLine = arr[0].line
        }else {
            endLine = arr[idx+1].line
        }
        
        console.log(line.xEnd, endLine.xEnd, line.yEnd, endLine.yEnd)
        
        
        
    })
}

function openModal(termName, termValue, x, y) {
    
    var {valueType, theme} = gChart
    if(valueType === 'percent'){
        valueType = `%`
        if(theme === 'rect' || theme === 'circle') termValue = termValue.toFixed(2)
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





