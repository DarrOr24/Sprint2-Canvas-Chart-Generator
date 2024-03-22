'use strict'

function onChartSelect(chartType){
    createChart(chartType)
}

function onSubmit(ev){
    ev.preventDefault()

    const userData = new FormData(ev.target)
    const userDataObj = Object.fromEntries(userData)
    
    insertUserInput(userDataObj)
}