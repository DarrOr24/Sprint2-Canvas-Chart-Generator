'use strict'

const STORAGE_KEY_ARR = []
var gKeyCount = 0

var gTermCount = 2
var gChart = _createChart()

function updateChartType(chartType){
    gChart.theme = chartType  
}


function insertInputData(formDataObj){

    const {title, name1, value1, color1, name2, value2, color2} = formDataObj
    gChart.title = title
    const names = [name1, name2]
    const values = [value1, value2]
    const colors = [color1, color2]

    if (gTermCount >= 3){
        const {name3, value3, color3} = formDataObj
        names.push(name3)
        values.push(value3)
        colors.push(color3)

        if(gTermCount === 4){
            const {name4, value4, color4} = formDataObj
            names.push(name4)
            values.push(value4)
            colors.push(color4)
        }
    }
   
    gChart.terms.forEach((term, idx) => {
        term.name = names[idx]
        term.value = values[idx]
        term.color = colors[idx]
    } )
      
}

function addTerm(){
    if(gTermCount===4){
        alert('Reached max amount of terms')
        return
    }
    
    gTermCount++

    const newTerm = _createTerm()
    gChart.terms.push(newTerm) 
    renderEditor()
} 

function updateTerm(idx, term){} 

function removeTerm(idx){
    gTermCount--
    gChart.terms.splice(idx, 1)
    renderEditor()
}

function renderChart(){}

function _createTerm() {
    return {
        name: '',
        value: getRandomInt(10, 300),
        color: getRandomColor()
    }
}

function _createChart() {
    return {
        type: 'myChart',
        theme: '',
        title: 'Work life Balance',
        valueType: 'percent/value',
        terms: [_createTerm(),_createTerm()]
    }
}

function _saveChartToStorage() {
    const {title} = gChart
    STORAGE_KEY_ARR.push(title)
    saveToStorage(STORAGE_KEY_ARR[gKeyCount], gChart)
    gKeyCount++
   
}