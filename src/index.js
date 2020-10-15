import './styles/reset.scss';
import './styles/index.scss';
import Calculator from './scripts/calculator';
import { defineContribution } from './scripts/calculator';
import Graph from './scripts/graph';



const submission = document.getElementById('input-form')
const reset = document.getElementById('reset')

if (reset) {
    debugger
    reset.addEventListener('click', resetGraph)
}

function resetGraph() {
    debugger
    let obj = {}
    new Graph({
        element: document.querySelector('#graph-wrapper'),
        data: [obj],
        totalWithInterest: 0
    })
    debugger
    document.getElementById("int").innerHTML = `$0`;
    document.getElementById("no-int").innerHTML = `$0`;
}


if (submission) {
    submission.addEventListener('submit', makeGraphArr)
}



function makeGraphArr(e) {
    e.preventDefault();
    const data = new FormData(submission)
    let result = [];
    let habits = data.getAll('habit')
    let time = parseInt(data.get('time'))
    let i = 0;
    while (i < time) {
            result[i] = {
                year: i + 1,
                columns: habits, 
                rate: parseInt(data.get('rate')),
            }
            i += 1;
        }
    let col = [];
    result = result.map(obj => {      
        const calc = new Calculator(obj)
        col = calc['columns']
        delete calc['columns']
        delete calc['rate']
        //noInt.push(calc['totalWithoutInterest']);
        //debugger
        // delete calc['totalWithoutInterest']
        return calc
        })
    console.log(col);



        function calcTotalWithoutInt(col, year) {
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
 
    // debugger
    const yr = result[result.length - 1].year
    const noInterest = calcTotalWithoutInt(col, yr);
    const add = (a, b) => a + b;
    const totalWithInterest = parseInt(Object.values(result[result.length - 1]).reduce(add)) - result[result.length - 1].year
    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    document.getElementById("int").innerHTML = `$ ${numberWithCommas(totalWithInterest)}`;
    document.getElementById("no-int").innerHTML = `$ ${numberWithCommas(noInterest)}`;
    
    result.push(['year'].concat(habits))

    const graph = new Graph({
        element: document.querySelector('#graph-wrapper'),
        data: result,
        totalWithInterest: totalWithInterest
    })
}


   