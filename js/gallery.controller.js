'use strict'


function renderGallery() {

    const strHtmls = `
            <img src="img/square.jpg" onclick="onSelectImg(this)" class="gallery-chart" />
			<img src="img/square.jpg" onclick="onSelectImg(this)" class="gallery-chart" />
			<img src="img/square.jpg" onclick="onSelectImg(this)" class="gallery-chart" />`

    document.querySelector('.gallery-charts').innerHTML = strHtmls
}

function onSelectImg(elImg) {
    coverCanvasWithImg(elImg)
}

function coverCanvasWithImg(elImg) {
    // gElCanvas.height = (elImg.naturalHeight / elImg.naturalWidth) * gElCanvas.width
    gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
    gChart.background = elImg
}
