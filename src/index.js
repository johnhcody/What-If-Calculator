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
    // debugger
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
    e.preventDefault();
    const data = new FormData(submission)
    let result = [];
    let habits = data.getAll('habit')
    let time = parseInt(data.get('time'))
    let custom = parseInt(data.get('custom'))
    let customTime = data.get('custom-time')
    if (isNaN(custom) === true) customTime = null;
    debugger
    if (customTime) habits.push('customTime');
    let customMult = 0;
    if (customTime === 'daily') {
        customMult = 365;
    } else if (customTime === 'monthly') {
        customMult = 12;
    } else if (customTime === 'yearly') {
        customMult = 1;
    }
    
    let i = 0;
    debugger
    if (isNaN(custom) !== true) {
        while (i < time) {
                // debugger
                result[i] = {
                    year: i + 1,
                    columns: habits, 
                    rate: parseInt(data.get('rate')),
                    custom: custom,
                    customTime: customTime,
                    customMult: customMult
                }
                // custom: number-input
                i += 1;
            }
    } else {
        while (i < time) {
            // debugger
            result[i] = {
                year: i + 1,
                columns: habits,
                rate: parseInt(data.get('rate')),
            }
            // custom: number-input
            i += 1;
        }
    }

    let col = [];
    debugger
    // if the custom field is empty (isNaN(custom) !== true) evaluates to false
    if (isNaN(custom) !== true) {
        debugger
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
            debugger      
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

    console.log(col);



        function calcTotalWithoutInt(col, year) {
            if (col.includes('customTime')) col = col.filter(function (value) { return value !== 'customTime' })
            debugger
            col = col.map(habit => {
                switch(habit) {
                    case 'coffee':
                            habit = 520 * year;
                            return habit;
                        case 'hair':
                            habit = 91 * year;
                            return habit;
                        case 'lunch':
                            habit = 1250 * year;
                            return habit;
                        case 'cable':
                            habit = 2412 * year;
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
                        default:
                            break;
                }
            });
            const add = (a, b) => a + b;
            debugger
            return col.reduce(add) 
        }
        debugger
        const yr = result[result.length - 1].year
        const noInterest = calcTotalWithoutInt(col, yr);
        const add = (a, b) => a + b;
    const totalWithInterest = parseInt(Object.values(result[result.length - 1]).reduce(add)) - result[result.length - 1].year
    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    debugger
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
}

const modal = document.getElementById("myModal");

// Get the button that opens the modal
const btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
const span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function () {
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

function openModal() {

}

function closeModal() {

}