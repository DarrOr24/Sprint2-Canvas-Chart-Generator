'use strict'

var gTermCount = 2

var gChart = {
    theme: '',
    title: 'Work life Balance',
    valueType: 'percent/value',
    terms: [{
        name: 'term1',
        value: 300,
        color: getRandomColor()
    }, 
    {
        name: 'term2',
        value: 100,
        color: getRandomColor() 
    }]
}


function updateChartType(chartType){
    gChart.theme = chartType  
}


function insertInputData(userDataObj){

    const {title, name1, value1, color1, name2, value2, color2} = userDataObj
    gChart.title = title
    const names = [name1, name2]
    const values = [value1, value2]
    const colors = [color1, color2]

    if (gTermCount >= 3){
        const {name3, value3, color3} = userDataObj
        names.push(name3)
        values.push(value3)
        colors.push(color3)

        if(gTermCount === 4){
            const {name4, value4, color4} = userDataObj
            names.push(name4)
            values.push(value4)
            colors.push(color4)
        }
    }
   
   
    gChart.terms.forEach((term, idx, arr) => {
        term.name = names[idx]
        term.value = values[idx]
        term.color = colors[idx]

    } )
      
}

function addTerm(){
    if(gTermCount===4){
        alert('Reached max amount of terms')
        return
    }
    
    gTermCount++

    gChart.terms.push({
        name: `term${gTermCount}`,
        value: 200,
        color: getRandomColor()  
    })
    
    renderEditor()
} 

function updateTerm(idx, term){} 
function removeTerm(idx){}
function renderChart(){}