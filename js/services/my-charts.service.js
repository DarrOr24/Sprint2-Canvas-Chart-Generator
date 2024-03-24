'use strict'

function getMyCharts(){
    const myChartsArr = loadFromStorage('canvas')
    return myChartsArr
}

function sortMyCharts(sortBy, dir){
    const myChartsArr = getMyCharts()
    
    console.log(sortBy, dir)
    if (sortBy === 'time'){
        myChartsArr.sort((chart1, chart2) => (chart1.creationTime.timeStamp - chart2.creationTime.timeStamp) * dir)  
    } else if(sortBy === 'title'){
        console.log('TITLE')
    }

    renderMyCharts(myChartsArr)
}