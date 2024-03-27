'use strict'

const GALLERY_CHARTS = []

function renderGalleryCharts(){

    const g1t1 = _createTerm('Work', 50, 'red')
    const g1t2 = _createTerm('Sport', 50, 'blue')
    const g1t3 = _createTerm('Sport', 50, 'blue')
    
    const galleryChart1 = _createChart('rect', 'Gallery1', '','units')
    const galleryChart2 = _createChart('circle', 'Gallery2', '','percent')
    const galleryChart3 = _createChart('pie', 'Gallery3', '','units')
    const galleryChart4 = _createChart('line', 'Gallery4', '','percent')

    GALLERY_CHARTS.push(galleryChart1)
    GALLERY_CHARTS.push(galleryChart2)
    GALLERY_CHARTS.push(galleryChart3)
    GALLERY_CHARTS.push(galleryChart4)
        
}

// function _createTerm(name='', value=getRandomInt(10, 300), color= getRandomColor()) {
//     return {
//         name,
//         value,
//         color
//     }
// }

// function _createChart(theme='', title = 'Title', background='', valueType='percent', terms= [_createTerm(),_createTerm()]) {
//     return {
//         theme,
//         title,
//         background,
//         valueType,
//         terms
//     }
// }