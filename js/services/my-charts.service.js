'use strict'

function getMyCharts(){
    const myChartsArr = loadFromStorage('canvas')
    return myChartsArr
}

function sortMyCharts(sortBy, dir){
    const myChartsArr = getMyCharts()
    
    if (sortBy === 'time'){
        myChartsArr.sort((chart1, chart2) => (chart1.creationTime.timeStamp - chart2.creationTime.timeStamp) * dir)  
    } else if(sortBy === 'title'){
        myChartsArr.sort((chart1, chart2) => chart1.title.localeCompare(chart2.title) * dir)
    }

    renderMyCharts(myChartsArr)
}

function _filterMyCharts(filterBy){
    const myChartsArr = getMyCharts()
    const txt = filterBy.toLowerCase()

    const charts = myChartsArr.filter(chart => chart.title.toLowerCase().includes(txt))

    renderMyCharts(charts)
}