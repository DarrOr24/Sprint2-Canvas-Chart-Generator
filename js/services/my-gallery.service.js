'use strict'

const GALLERY_CHARTS = []

function renderGalleryCharts(){
    
    const galleryChart1 = _createChart('rect', 'Gallery1', '','units')
    const galleryChart2 = _createChart('circle', 'Gallery2', '','percent')
    const galleryChart3 = _createChart('pie', 'Gallery3', '','units')
    const galleryChart4 = _createChart('line', 'Gallery4', '','percent')

    GALLERY_CHARTS.push(galleryChart1)
    GALLERY_CHARTS.push(galleryChart2)
    GALLERY_CHARTS.push(galleryChart3)
    GALLERY_CHARTS.push(galleryChart4)
        
}

// function _createTerm() {
//     return {
//         name: '',
//         value: getRandomInt(10, 300),
//         color: getRandomColor()
//     }
// }

// function _createChart() {
//     return {
//         theme: '',
//         title: 'Title',
//         background: '',
//         valueType: 'percent',
//         terms: [_createTerm(),_createTerm()]
//     }
// }