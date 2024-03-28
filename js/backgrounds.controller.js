'use strict'


function renderBackgroundImgs() {

    const strHtmls = `
            <img src="img/triangles.jpg" onclick="onSelectImg(this, '.triangle')" class="background-img triangle" />
            <img src="img/paint.jpg" onclick="onSelectImg(this, '.paint')" class="background-img paint" />
			<img src="img/math.jpg" onclick="onSelectImg(this, '.math')" class="background-img math" />
			<img src="img/flower.jpg" onclick="onSelectImg(this, '.flower')" class="background-img flower" />
			<img src="img/black.jpg" onclick="onSelectImg(this, '.black')" class="background-img black" />
            `

    document.querySelector('.backgrounds').innerHTML = strHtmls
}

function onSelectImg(elBackgroundImg, backgroundName) {
    coverCanvasWithImg(elBackgroundImg)

    const elBackgroundImgs = document.querySelectorAll('.background-img')
    elBackgroundImgs.forEach(chart => chart.classList.remove('clicked'))

    elBackgroundImg.classList.add('clicked')
    gChart.backgroundName = backgroundName

    const elOpacity = document.querySelector('.opacity-input')
    gChart.opacity = elOpacity.value

   
}

function coverCanvasWithImg(elImg) {
    const {opacity, backgroundName} = gChart
    clearCanvas()
    if(opacity)gCtx.globalAlpha = opacity
    // gCtx.globalAlpha = opacity
    gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
    gCtx.globalAlpha = 1.0
    gChart.background = elImg
    gChart.backgroundName = backgroundName
}

function renderBackground(backgroundName){
    const elBackground = document.querySelector(backgroundName)
    coverCanvasWithImg(elBackground)

    const elBackgroundImgs = document.querySelectorAll('.background-img')
    elBackgroundImgs.forEach(chart => chart.classList.remove('clicked'))
    elBackground.classList.add('clicked')
}

function onOpacityChange(opacity){
    const {backgroundName} = gChart
    if(!backgroundName) return
    gChart.opacity = opacity
    
    renderBackground(backgroundName)
}