'use strict'


function onOpenGalleryChart(idx){
    gChart = GALLERY_CHARTS[idx]
    const {background, terms} = gChart
    gTermCount = terms.length

    clearCanvas()
    if(background) coverCanvasWithImg(background)
    drawChart()
    renderEditor()
    updateChartTypeEditor() 
}


function renderGalleryImgs() {

    const strHtmls = `<img src="img/Life.jpg" onclick="onSelectGalleryChart(this, 0, '.math')" class="gallery-img life" />
                      <img src="img/favorite-movies.jpg" onclick="onSelectGalleryChart(this, 1, '.flower')" class="gallery-img movies" />
                      <img src="img/Balanced-workout.jpg" onclick="onSelectGalleryChart(this, 2, '.black')" class="gallery-img workout" />
                      <img src="img/Best-cities.jpg" onclick="onSelectGalleryChart(this, 3, '.math')" class="gallery-img cities" />`

    document.querySelector('.gallery-charts').innerHTML = strHtmls
}

function onSelectGalleryChart(elGalleryImg, idx, background=''){
    clearCanvas()

    const elGalleryImgs = document.querySelectorAll('.gallery-img')
    elGalleryImgs.forEach(chart => chart.classList.remove('clicked'))
    elGalleryImg.classList.add('clicked')

    if(background) renderBackground(background)
    
    gChart = GALLERY_CHARTS[idx]
    const {terms} = gChart
    gTermCount = terms.length

    drawChart()
    renderEditor()
    updateChartTypeEditor()
}