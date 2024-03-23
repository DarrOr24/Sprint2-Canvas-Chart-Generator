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

    var strHtmls = terms.map((term,idx, arr) => `
        <label for="name">Name:</label>
        <input type="text" id="name" name="name${idx+1}" placeholder="term${idx+1}" value="${term.name}" size="5">
                    
        <label for="value">Value:</label>
        <input type="number" id="value" name="value${idx+1}" value="${term.value}" style="width: 50px;">
                
        <label for="color">Color:</label>
        <input type="color" id="color" name="color${idx+1}" value="${term.color}" style="width: 30px;"/>

        <button type="button" onclick="onRemoveTerm('${term.id}', ${idx})">X</button> 
        <br>
        `)

    document.querySelector('.terms').innerHTML = strHtmls.join('')
    
}

function onChartSelect(chartType){
    updateChartType(chartType)
}

function onSubmit(ev){
    ev.preventDefault()

    const formData = new FormData(ev.target)
    const formDataObj = Object.fromEntries(formData)

    insertInputData(formDataObj)
    
}

function onDrawChart(){
    drawChart()
}

function onClearChart(){
    clearCanvas()
}

function onRemoveTerm(termId, idx){
    updateFormData()
    removeTerm(idx)
}

function onAddTerm(){
    updateFormData()
    addTerm()
}

function updateFormData(){ //Same as submit
    const form = document.getElementById('chart-values')
    const formData = new FormData(form)
    const formDataObj = Object.fromEntries(formData)

    insertInputData(formDataObj)
}