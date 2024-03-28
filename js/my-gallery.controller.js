'use strict'

function renderGalleryImgs() {

    const strHtmls = `<div class="gallery-card" onclick="onSelectGalleryChart(this, 0, '.math')">
                        <img src="img/Life.jpg" class="gallery-img life" />
                        <h2 class="text">Life</h2>
                      </div>

                      <div class="gallery-card" onclick="onSelectGalleryChart(this, 1, '.flower')" >
                        <img src="img/favorite-movies.jpg" class="gallery-img movies" />
                        <h2 class="text">Movies</h2>
                      </div>

                      <div class="gallery-card" onclick="onSelectGalleryChart(this, 2, '.black')" >
                        <img src="img/Balanced-workout.jpg" class="gallery-img workout" />
                        <h2 class="text">Sport</h2>
                      </div>

                      <div class="gallery-card" onclick="onSelectGalleryChart(this, 3, '.math')" >
                        <img src="img/Best-cities.jpg" class="gallery-img cities" />
                        <h2 class="text">Cities</h2>
                      </div>`

    document.querySelector('.gallery-charts').innerHTML = strHtmls
}

function onSelectGalleryChart(elGalleryImg, idx, backgroundName=''){
    clearCanvas()

    const elGalleryCards = document.querySelectorAll('.gallery-card')
    elGalleryCards.forEach(chart => chart.classList.remove('clicked'))
    elGalleryImg.classList.add('clicked')

    if(backgroundName) renderBackground(backgroundName)
    
    gChart = GALLERY_CHARTS[idx]
    const {terms} = gChart
    gTermCount = terms.length
    
    drawChart()
    renderEditor()
    updateOpacityEditor()
    updateChartTypeEditor()
}