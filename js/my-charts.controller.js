'use strict'

function onMyCharts(){
    document.body.classList.toggle('my-charts-open');
    const myChartsArr = getMyCharts()

    if(myChartsArr.length === 0) {
        document.querySelector('.my-charts').innerHTML = `No saved charts`
        return 
    } 
    renderMyCharts(myChartsArr)
}

function renderMyCharts(myChartsArr){

    var strHtmls = myChartsArr.map((chart, idx) => 
        `<tr>
            <td class="saved-chart-icon btn" onclick="onOpenSavedChart(${idx})">📊</td>
            <td class="saved-chart-title" onclick="onOpenSavedChart(${idx})">${chart.title}</td>
            <td class="chart-creation-time" > ${chart.creationTime.date}\t${chart.creationTime.time}</td>
        </tr>`)

        document.querySelector('.my-charts').innerHTML = strHtmls.join('') 
}

function onCloseMyCharts(){
    document.body.classList.remove('my-charts-open')
}

function onOpenSavedChart(idx){
    // const myChartsArr = getMyCharts()
    // gChart = myChartsArr[idx]
    gChart = MY_CHARTS[idx]
    const {background} = gChart
    
    document.body.classList.remove('my-charts-open')

    clearCanvas()
    if(background) coverCanvasWithImg(background)
    drawChart()
    renderEditor()
    updateChartTypeEditor() 
}

function updateChartTypeEditor(){
    const {theme} = gChart
    const elAllChartTypes = document.querySelectorAll('.chart-type')
    elAllChartTypes.forEach(chart => chart.classList.remove('clicked'))
    
    if(theme === 'rect') var elChartType = document.querySelector('.chart-type-rect')
        
    else if(theme === 'circle') elChartType = document.querySelector('.chart-type-circle')
    
    elChartType.classList.add('clicked')
}

function onSetSortBy() {
    const elSortBy = document.querySelector('.sort-by')
    const elDir = document.querySelector('.sort-direction input')

    const sortBy = elSortBy.value
    const dir = elDir.checked ? -1 : 1

    sortMyCharts(sortBy, dir)
}

function onMyChartsFilter(){
    const input = document.querySelector('.search-input')
    _filterMyCharts(input.value)
}

function onClear(){
    const myChartsArr = getMyCharts()
    renderMyCharts(myChartsArr)
}

