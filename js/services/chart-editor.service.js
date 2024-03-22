'use strict'

var gChart = {
    theme: '',
    title: '',
    valueType: 'percent/value',
    terms: [{}, {}]
}

function updateChartType(chartType){
    gChart.theme = chartType  
}

function insertUserInput(userDataObj){
    const {title, name1, value1, color1, name2, value2, color2} = userDataObj
    
    gChart.title = title
    gChart.terms[0].name = name1
    gChart.terms[0].value = value1
    gChart.terms[0].color = color1

    gChart.terms[1].name = name2
    gChart.terms[1].value = value2
    gChart.terms[1].color = color2
}

function addTerm(term){} 
function updateTerm(idx, term){} 
function removeTerm(idx){}
function renderChart(){}