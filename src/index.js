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

function resetGraph() {
    // debugger
    let obj = {}
    new Graph({
        element: document.querySelector('#graph-wrapper'),
        data: [obj],
        totalWithInterest: 0
    })
    // debugger
    document.getElementById("int").innerHTML = `$0`;
    document.getElementById("no-int").innerHTML = `$0`;
}


if (submission) {
    submission.addEventListener('submit', makeGraphArr)
    submission.addEventListener('submit', selectQuote)
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
    let yearly = parseInt(data.get('yearly'))
    if (yearly) habits.push('yearly');
    debugger
    let i = 0;
    while (i < time) {
            result[i] = {
                year: i + 1,
                columns: habits, 
                rate: parseInt(data.get('rate')),
                yearly: yearly
            }
            i += 1;
        }
    let col = [];
    result = result.map(obj => {      
        const calc = new Calculator(obj)
        col = calc['columns']
        delete calc['columns']
        delete calc['rate']
        return calc
        })
    console.log(col);



        function calcTotalWithoutInt(col, year) {
            if (col.includes('yearly')) col.pop(1);
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
    document.getElementById("no-int").innerHTML = `$ ${numberWithCommas(noInterest + (yearly * time))}`;
    
    result.push(['year'].concat(habits))

    const graph = new Graph({
        element: document.querySelector('#graph-wrapper'),
        data: result,
        totalWithInterest: totalWithInterest
    })
}


   