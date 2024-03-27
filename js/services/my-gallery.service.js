'use strict'

const GALLERY_CHARTS = []

function renderGalleryCharts(){

    const galleryTermsArr = getGalleryTerms()
    
    const galleryChart1 = _createChart('rect', 'Life', '','units', galleryTermsArr[0])
    const galleryChart2 = _createChart('circle', 'Favorite Movies', '','percent', galleryTermsArr[1])
    const galleryChart3 = _createChart('pie', 'Balanced Workout', '','units', galleryTermsArr[2])
    const galleryChart4 = _createChart('line', 'Best Cities', '','percent', galleryTermsArr[3])

    GALLERY_CHARTS.push(galleryChart1)
    GALLERY_CHARTS.push(galleryChart2)
    GALLERY_CHARTS.push(galleryChart3)
    GALLERY_CHARTS.push(galleryChart4)
        
}

function getGalleryTerms(){
    
    //terms gallerychart1
    const g1t1 = _createTerm('Work', 35, 'red')
    const g1t2 = _createTerm('Sport', 20, 'blue')
    const g1t3 = _createTerm('Kids', 20, 'yellow')
    const g1t4 = _createTerm('Personal Time', 5, 'green')

    //terms gallerychart2
    const g2t1 = _createTerm('Horror', 60, 'red')
    const g2t2 = _createTerm('Doco', 40, 'blue')
    const g2t3 = _createTerm('Comedy', 50, 'yellow')
    const g2t4 = _createTerm('Drama', 30, 'green')

    //terms gallerychart3
    const g3t1 = _createTerm('Skill', 30, 'red')
    const g3t2 = _createTerm('Mobility', 50, 'blue')
    const g3t3 = _createTerm('Strength', 30, 'yellow')
    const g3t4 = _createTerm('Cardio', 10, 'green')

    //terms gallerychart4
    const g4t1 = _createTerm('Tel Aviv', 100, 'red')
    const g4t2 = _createTerm('New York', 90, 'blue')
    const g4t3 = _createTerm('Milano', 60, 'yellow')
    const g4t4 = _createTerm('Paris', 50, 'green')

    //Gallery chart terms
    const galleryChart1 = [[g1t1, g1t2, g1t3, g1t4]]
    const galleryChart2 = [[g2t1, g2t2, g2t3, g2t4]]
    const galleryChart3 = [[g3t1, g3t2, g3t3, g3t4]]
    const galleryChart4 = [[g4t1, g4t2, g4t3, g4t4]]

    const galleryTermsArr = [galleryChart1, galleryChart2, galleryChart3, galleryChart4]

    return galleryTermsArr
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