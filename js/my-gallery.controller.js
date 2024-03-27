'use strict'


function onOpenGalleryChart(idx){
    // const myChartsArr = getMyCharts()
    // gChart = myChartsArr[idx]
    gChart = GALLERY_CHARTS[idx]
    const {background, terms} = gChart
    gTermCount = terms.length

    document.body.classList.remove('my-charts-open')

    clearCanvas()
    if(background) coverCanvasWithImg(background)
    drawChart()
    renderEditor()
    updateChartTypeEditor() 
}