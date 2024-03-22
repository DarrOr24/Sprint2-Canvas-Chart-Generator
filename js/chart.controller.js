'use strict'

function onInit() {
    renderGallery()
    renderEditor()
    gElCanvas = document.querySelector('canvas')
	gCtx = gElCanvas.getContext('2d')

    gCtx.fillStyle = 'whitesmoke'
	gCtx.fillRect(0, 0, gElCanvas.width, gElCanvas.height)
}

function renderEditor(){
    const {terms} = gChart
    var strHtmls = terms.map(term => `
        <label for="name">Name:</label>
        <input type="text" id="name" name="name" value="${term.name}" size="5">
                    
        <label for="value">Value:</label>
        <input type="number" id="value" name="value" value="${term.value}" style="width: 50px;">
                
        <label for="color">Color:</label>
        <input type="color" id="color" name="color" value="${term.color}" style="width: 30px;"/>

        <button type="button" onclick="onRemoveTerm(event)">X</button> 
        <br>
        `)

    document.querySelector('.terms').innerHTML = strHtmls.join('')
    
}

function onChartSelect(chartType){
    updateChartType(chartType)
}

function onSubmit(ev){
    ev.preventDefault()

    const userData = new FormData(ev.target)
    const userDataObj = Object.fromEntries(userData)
    
    insertUserInput(userDataObj)
    // renderChartEditor()
}

function onDrawChart(){
    createChart()
}

function onClearChart(){
    clearCanvas()
}

function onRemoveTerm(ev){
    console.log(ev)
}