'use strict'

var gChart = {
    theme: 'rectangles',
    title: 'Elections Results',
    style: {
        font: 'Arial',
        fontSize: '45px',
        backgroundColor: 'transparent'
    },
    valueType: 'percent/value',
    terms: [
        {
            label: 'Puk',
            value: 50,
            color: 'pink'
        },
        {
            label: 'Muk',
            value: 50,
            color: 'green'
        }
    ]
}

function insertUserInput(userDataObj){
    const {title, name1, value1, color1, name2, value2, color2} = userDataObj
    
    gChart.title = title
    gChart.terms[0].label = name1
    gChart.terms[0].value = value1
    gChart.terms[0].color = color1

    gChart.terms[1].label = name2
    gChart.terms[1].value = value2
    gChart.terms[1].color = color2
}

function createChart(chartType){
    console.log('chart type:', chartType)
    gChart.theme = chartType
    renderChartEditor()
}

function renderChartEditor(){}

function getChart(){}