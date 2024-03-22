'use strict'



function renderGallery() {

    const strHtmls = `
    <div onclick = "onChartSelect('rect')" class="sample1"><img src="img/bar-chart.png" alt=""></div>
    <div onclick = "onChartSelect('circle')" class="sample2"><img src="img/circle-chart.jpg" alt=""></div>`

    document.querySelector('.chart-samples').innerHTML = strHtmls
}