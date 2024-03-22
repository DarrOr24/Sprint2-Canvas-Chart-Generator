'use strict'

function onInit() {
    renderGallery()
    gElCanvas = document.querySelector('canvas')
	gCtx = gElCanvas.getContext('2d')

    gCtx.fillStyle = 'whitesmoke'
	gCtx.fillRect(0, 0, gElCanvas.width, gElCanvas.height)
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
    createChart() 
}

function onClearChart(){
    clearCanvas()
}

function onRemoveTerm(ev){
    console.log(ev)
}