'use strict'


function renderGallery() {

    const strHtmls = `
            <img src="img/triangles.jpg" onclick="onSelectImg(this)" class="background-img" />
            <img src="img/paint.jpg" onclick="onSelectImg(this)" class="background-img" />
			<img src="img/flower.jpg" onclick="onSelectImg(this)" class="background-img" />
			<img src="img/money-square.jpg" onclick="onSelectImg(this)" class="background-img" />`

    document.querySelector('.backgrounds').innerHTML = strHtmls
}

function onSelectImg(elImg) {
    coverCanvasWithImg(elImg)
}

function coverCanvasWithImg(elImg) {
    // gElCanvas.height = (elImg.naturalHeight / elImg.naturalWidth) * gElCanvas.width
    gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
    // gCtx.drawImage(elImg, 0, 0, elImg.naturalWidth, elImg.naturalHeight)
    gChart.background = elImg
}
