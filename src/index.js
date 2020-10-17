import './styles/reset.scss';
import './styles/index.scss';
import Calculator from './scripts/calculator';
import { defineContribution } from './scripts/calculator';
import Graph from './scripts/graph';



const COMPOUND_INT_QUOTES = 
    ['\“Compound interest is the 8th wonder of the world. He who understands it, earns it; he who doesn’t, pays it.\” - Albert Einstein',
    '\"Time is your friend, impulse is your enemy. Take advantage of compound interest and don\'t be captivated by the siren song of the market.\" - Warren Buffet',
    '\"The strongest force in the universe is Compound Interest.\" - Albert Einstein',
    '\"Understanding both the power of compound interest and the difficulty of getting it is the heart and soul of understanding a lot of things.\" - Charlie Munger',
    '\"Knowledge and productivity are like compound interest. The more you know, the more you learn; the more you learn, the more you can do; the more you can do, the more the opportunity. I don`t want to give you a rate, but it is a very high rate. Given two people with exactly the same ability, the one person who manages day in and day out to get in one more hour of thinking will be tremendously more productive over a lifetime.\" - Richard Hamming',
    '\"It should be everyone\'s right in a capitalist system to have some way to take advantage of compound interest.\" - Katy Lederer'
]
// debugger

const submission = document.getElementById('input-form')
const reset = document.getElementById('reset')

if (reset) {
    reset.addEventListener('click', resetGraph)
}


if (submission) {
    submission.addEventListener('submit', makeGraphArr)
    submission.addEventListener('submit', selectQuote)
}


function resetGraph() {
    document.getElementById("int").innerHTML = '';
    document.getElementById("no-int").innerHTML = '';
    document.getElementById("input-form").reset();
    document.getElementById("graph-wrapper").innerHTML = '';
}

function selectQuote(e) {
    e.preventDefault();
    document.getElementById("footer-text").innerHTML = COMPOUND_INT_QUOTES[Math.floor(Math.random() * COMPOUND_INT_QUOTES.length)];
}



function makeGraphArr(e) {
    // handle form submission
    e.preventDefault();
    const data = new FormData(submission)
    let result = [];
    let habits = data.getAll('habit')
    let time = parseInt(data.get('time'))
    let custom = parseInt(data.get('custom'))
    let customTime = data.get('custom-time')
    if (isNaN(custom) === true) customTime = null;
    if (customTime) habits.push('customTime');
    let customMult = 0;
    if (customTime === 'daily') {
        customMult = 365;
    } else if (customTime === 'monthly') {
        customMult = 12;
    } else if (customTime === 'yearly') {
        customMult = 1;
    } else if (customTime === 'weekly') {
        customMult = 52;
    }
    

    // maps an array that will be sent to the calculator

    let i = 0;
    if (isNaN(custom) !== true) {
        while (i < time) {
                result[i] = {
                    year: i + 1,
                    columns: habits, 
                    rate: parseInt(data.get('rate')),
                    custom: custom,
                    customTime: customTime,
                    customMult: customMult
                }
                i += 1;
            }
    } else {
        while (i < time) {
            result[i] = {
                year: i + 1,
                columns: habits,
                rate: parseInt(data.get('rate')),
            }
            i += 1;
        }
    }

    // formats the data in a way that the graph can handle (must be an array of objects with no unecessary keys)
    // if the custom field is empty (isNaN(custom) !== true) evaluates to false
    let col = [];
    if (isNaN(custom) !== true) {
        result = result.map(obj => {
            const calc = new Calculator(obj)
            col = calc['columns']
            delete calc['columns']
            delete calc['rate']
            delete calc['customMult']
            delete calc['custom']
            return calc
        })
    } else {
        result = result.map(obj => {    
            const calc = new Calculator(obj)
            col = calc['columns']
            delete calc['columns']
            delete calc['rate']
            delete calc['customMult']
            delete calc['customTime']
            delete calc['custom']
            return calc
            })
    }

    // calculates total without interest by grabbing the year and a predefined value and multiplying.  CustomTime is handled separately so the value is set to zero.  If it is not zero, then it will error out when we add the array using .reduce()
        function calcTotalWithoutInt(col, year) {
            col = col.map(habit => {
                switch(habit) {
                    case 'coffee':
                            habit = 427 * year;
                            return habit;
                        case 'hair':
                            habit = 112 * year;
                            return habit;
                        case 'lunch':
                            habit = 1200 * year;
                            return habit;
                        case 'cable':
                            habit = 2369 * year;
                            return habit;
                        case 'save':
                            habit = 1200 * year;
                            return habit;
                        case 'bike':
                            habit = 1000 * year;
                            return habit;
                        case 'generic':
                            habit = 1040 * year;
                            return habit;
                        case 'customTime':
                            habit = 0;
                            return habit;
                        default:
                            break;
                }
            });
            const add = (a, b) => a + b;
            return col.reduce(add) 
        }

        const yr = result[result.length - 1].year
        const noInterest = calcTotalWithoutInt(col, yr);
        const add = (a, b) => a + b;
    const totalWithInterest = parseInt(Object.values(result[result.length - 1]).reduce(add)) - result[result.length - 1].year

    // used to display noInterest and interest
    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    // interpolates the value of the last element of the array
    document.getElementById("int").innerHTML = `$ ${numberWithCommas(totalWithInterest)}`;
    if (isNaN(custom) !== false) {
        document.getElementById("no-int").innerHTML = `$ ${numberWithCommas(noInterest)}`
    } else {
        document.getElementById("no-int").innerHTML = `$ ${numberWithCommas(noInterest + ((custom * customMult) * time))}`;
    }
    
    result.push(['year'].concat(habits))
    data
    const graph = new Graph({
        element: document.querySelector('#graph-wrapper'),
        data: result,
        totalWithInterest: totalWithInterest
    })

    const reset = document.getElementsByClassName('reset-btn')[0];

    reset.style.display = "block";
}


// MODALS


const modal = document.getElementById("myModal");
const infoModal = document.getElementById("myModal2");

const btn = document.getElementById("myBtn");
const infoBtn = document.getElementById("myBtn2");

const span = document.getElementsByClassName("close")[0];
const infoSpan = document.getElementsByClassName("close")[1];




btn.onclick = function (event, modal) {
    modal = document.getElementById("myModal");
    openModal(event, modal);
}

infoBtn.onclick = function (event, modal) {
    modal = document.getElementById("myModal2");
    openModal(event, modal);
}

span.onclick = function (event, modal) {
    closeModal(event, modal);
}

infoSpan.onclick = function (event, modal) {
    closeModal(event, modal);
}


window.onclick = function (event) {

    switch (event.target) {
        case modal:
            event.target.style.display = "none";
            break;
        case infoModal:
            event.target.style.display = "none";
            break;
        default:
            break;
    }
}

function openModal(event, modal) {
    modal.style.display = "block";
}

function closeModal() {
    const modal = Object.values(document.getElementsByClassName('modal'));
    modal.map(mod => {
        return mod.style.display = "none";
    })
}