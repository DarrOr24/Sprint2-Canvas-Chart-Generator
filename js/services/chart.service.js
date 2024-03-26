'use strict'

const MY_CHARTS = loadFromStorage('canvas')


var gTermCount = 2
var gChart = _createChart()

function updateChartType(chartType){
    gChart.theme = chartType  
}

function insertInputData(formDataObj){

    const {title, valueType, name1, value1, color1, name2, value2, color2} = formDataObj
    gChart.title = title
    gChart.valueType = valueType
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

// function renderChart(){
//     console.log(gChart)
// }

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

// function updateTerm(idx, term){} 

function removeTerm(idx){
    gTermCount--
    gChart.terms.splice(idx, 1)
    renderEditor()
}

function _createTerm() {
    return {
        name: '',
        value: getRandomInt(10, 300),
        color: getRandomColor()
    }
}

function _createChart() {
    return {
        theme: '',
        title: 'Title',
        background: '',
        valueType: 'percent',
        terms: [_createTerm(),_createTerm()]
    }
}

function _saveToStorage() {
    var {background} = gChart
    gChart.background = ''
    const chart = structuredClone(gChart)
    chart.background = background
    chart.creationTime = getDate()
    
    MY_CHARTS.push(chart)
    saveToStorage('canvas', MY_CHARTS)
}

