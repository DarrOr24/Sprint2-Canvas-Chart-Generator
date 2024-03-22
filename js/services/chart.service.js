'use strict'

const BAR_WIDTH = 50
const BAR_SPACE = 25

var gChart = {
    theme: 'rect',
    title: 'Elections Results',
    style: {
        font: 'Arial',
        fontSize: '45px',
        backgroundColor: 'transparent'
    },
    valueType: 'percent/value',
    terms: [
        {
            name: 'Puk',
            value: 50,
            color: 'pink'
        },
        {
            name: 'Muk',
            value: 50,
            color: 'green'
        }
    ]
}

var gElCanvas
var gCtx


function insertUserInput(userDataObj){
    const {title, name1, value1, color1, name2, value2, color2} = userDataObj
    
    gChart.title = title
    gChart.terms[0].name = name1
    gChart.terms[0].value = value1
    gChart.terms[0].color = color1

    gChart.terms[1].name = name2
    gChart.terms[1].value = value2
    gChart.terms[1].color = color2
}

function updateChartType(chartType){
    gChart.theme = chartType  
}

// function renderChartEditor(){
//     console.log(gChart)
// }

function getChart(){}


function createChart(){
    const {title} = gChart
    document.querySelector('.chart-title').innerText = title
	drawCharts()
}

function drawCharts(){
    const {terms} = gChart
    
    terms.forEach((term, idx) => {

        term.x = (idx + 1) * (BAR_SPACE + BAR_WIDTH)
        term.y = gElCanvas.height - term.value

        gCtx.fillStyle = term.color
        gCtx.fillRect(term.x, term.y, BAR_WIDTH, term.value)
    })
}

function onMouseMove(ev) {
	const { offsetX, offsetY, clientX, clientY } = ev
    const {terms} = gChart

    const term = terms.find(term => {
        var { x, y, value } = term

        return (offsetX >= x && offsetX <= x + BAR_WIDTH &&
                offsetY >= y && offsetY <= y + value)
    })

    if(term){
        openModal(term.name, term.value, clientX, clientY)
    } else {
        closeModal()
    }
}

function openModal(termName, termValue, x, y) {
	const elModal = document.querySelector('.modal')

	elModal.innerText = `${termName}: ${termValue}`
	elModal.style.opacity = 1
	elModal.style.top = y + 'px'
	elModal.style.left = x + 'px'
}

function closeModal() {
	document.querySelector('.modal').style.opacity = 0
}