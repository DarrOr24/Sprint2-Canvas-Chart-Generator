'use strict'

const GALLERY_CHARTS = []

function renderGalleryCharts(){
    const galleryTermsArr = getGalleryTerms()

    const galleryChart1 = _createChart('rect', 'Life', '.math' ,'units', galleryTermsArr[0])
    const galleryChart2 = _createChart('circle', 'Favorite Movies', '.flower','percent', galleryTermsArr[1])
    const galleryChart3 = _createChart('pie', 'Balanced Workout', '.black','units', galleryTermsArr[2])
    const galleryChart4 = _createChart('line', 'Best Cities', '.math','percent', galleryTermsArr[3])

    GALLERY_CHARTS.push(galleryChart1)
    GALLERY_CHARTS.push(galleryChart2)
    GALLERY_CHARTS.push(galleryChart3)
    GALLERY_CHARTS.push(galleryChart4)      
}

function getGalleryTerms(){
    
    //terms gallerychart1
    const g1t1 = _createTerm('Work', 300, '#AE8DC3')
    const g1t2 = _createTerm('Sport', 100, '#6FBAD3')
    const g1t3 = _createTerm('Kids', 150, '#797278')
    const g1t4 = _createTerm('Personal Time', 70, '#378191')

    //terms gallerychart2
    const g2t1 = _createTerm('Horror', 60, '#d2414d')
    const g2t2 = _createTerm('Doco', 40, '#797278')
    const g2t3 = _createTerm('Comedy', 50, '#c89599')
    const g2t4 = _createTerm('Drama', 30, '#728e6f')

    //terms gallerychart3
    const g3t1 = _createTerm('Skill', 150, '#378191')
    const g3t2 = _createTerm('Mobility', 280, '#728e6f')
    const g3t3 = _createTerm('Strength', 200, '#5bdf6d')
    const g3t4 = _createTerm('Cardio', 150, '#c89599')

    //terms gallerychart4
    const g4t1 = _createTerm('Tel Aviv', 100, '#378191')
    const g4t2 = _createTerm('New York', 90, '#797278')
    const g4t3 = _createTerm('Milano', 60, '#AE8DC3')
    const g4t4 = _createTerm('Paris', 50, '#728e6f')

    //Gallery chart terms
    const galleryChart1 = [g1t1, g1t2, g1t3, g1t4]
    const galleryChart2 = [g2t1, g2t2, g2t3, g2t4]
    const galleryChart3 = [g3t1, g3t2, g3t3, g3t4]
    const galleryChart4 = [g4t1, g4t2, g4t3, g4t4]

    const galleryTermsArr = [galleryChart1, galleryChart2, galleryChart3, galleryChart4]

    return galleryTermsArr
}

