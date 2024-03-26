'use strict'

function onInit() {
    
    gTermCount = 2
    gChart = _createChart()
    renderChartTypes()
    renderEditor()
    renderBackgroundImgs()
    MY_CHARTS.forEach(chart => chart.background = '')
    gElCanvas = document.querySelector('canvas')
	gCtx = gElCanvas.getContext('2d')

    clearCanvas()
}

function onReset(){
    gTermCount = 2
    clearCanvas()
    
    const elAllChartTypes = document.querySelectorAll('.chart-type')
    elAllChartTypes.forEach(chart => chart.classList.remove('clicked'))
    
    gChart = _createChart()
    renderEditor()
}

function renderChartTypes() {
    const strHtmls = `
    <img src="img/bar-chart.jpg" alt="" onclick = "onChartSelect(this,'rect')" class="chart-type chart-type-rect">
    <img src="img/circle-chart.jpg" alt="" onclick = "onChartSelect(this,'circle')" class="chart-type chart-type-circle">`
    
    document.querySelector('.chart-samples').innerHTML = strHtmls
}

function renderEditor(){
    const {terms} = gChart

    renderChartEditorHeader()

    var strHtmls = terms.map((term,idx) => `
        <label class="name-label" for="name">Term${idx+1}:</label>
        <input class="name-input" type="text" id="name" name="name${idx+1}" placeholder="term${idx+1}" value="${term.name}" size="4">
       
        <label class="value-label" for="value">Value:</label>
        <input class="value-input" type="number" id="value" name="value${idx+1}" value="${term.value}" >

        <label class="color-label" for="color">Color:</label>
        <input class="color-input" type="color" id="color" name="color${idx+1}" value="${term.color}" />

        <button class="btn remove-term-btn" type="button" onclick="onRemoveTerm(${idx})">X</button> 
        `)


    document.querySelector('.terms').innerHTML = strHtmls.join('')
}

function renderChartEditorHeader() {
    const {title, valueType} = gChart

    if(valueType === 'percent'){
        var valueType1 = 'percent'
        var valueType1disp = '%'
        var valueType2 = 'units'
        var valueType2disp = valueType2
    } else if(valueType === 'units'){
        valueType1 = 'units'
        valueType1disp = valueType1
        valueType2 = 'percent'
        valueType2disp = '%'
    }

    var strHtmls = `
        <label class="title-label" for="title">Title:</label>
        <input class="title-input" type="text" id="title" name="title" value="${title}" size="20">

        <select name="valueType" class="val-units">
                <option  value="${valueType1}">${valueType1disp}</option>
                <option  value="${valueType2}">${valueType2disp}</option>
        </select>`

    document.querySelector('.editor-header').innerHTML = strHtmls
}

function onChartSelect(elChart, chartType){
    updateChartType(chartType)

    const elAllChartTypes = document.querySelectorAll('.chart-type')
    elAllChartTypes.forEach(chart => chart.classList.remove('clicked'))

    elChart.classList.add('clicked')
}

function onSubmit(ev){
    ev.preventDefault()

    const formData = new FormData(ev.target)
    const formDataObj = Object.fromEntries(formData)
    
    insertInputData(formDataObj)
}

function onDrawChart(){
    const {background} = gChart 
    clearCanvas()
    updateFormData()
    if(background) coverCanvasWithImg(background)
    drawChart()
}

function onClearChart(){
    clearCanvas()
}

function onRemoveTerm(idx){
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

function onMouseMove(ev) {
	const { offsetX, offsetY, clientX, clientY } = ev
    mouseMove(offsetX, offsetY, clientX, clientY)
}

function onDownloadImg(elLink) {
    const imgContent = gElCanvas.toDataURL('image/jpeg') 
    elLink.href = imgContent
}

function onSave() {
    _saveToStorage()
}

