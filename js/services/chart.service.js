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

function createDataObj(userDataObj){
    console.log(userDataObj)
}

function createChart(chartType){
    console.log('chart type:', chartType)
    renderChartEditor()
}

function renderChartEditor(){}

function getChart(){}