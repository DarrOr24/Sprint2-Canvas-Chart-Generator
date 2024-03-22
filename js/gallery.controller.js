'use strict'

function onInit() {
    renderGallery()
}

function renderGallery() {

    const strHtmls = `
    <div class="sample1"><img src="img/bar-chart.png" alt=""></div>
    <div class="sample2"><img src="img/circle-chart.jpg" alt=""></div>`

    document.querySelector('.chart-samples').innerHTML = strHtmls
}