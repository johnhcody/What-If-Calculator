// const reset = require('./styles/reset.scss');
// const style = require('./styles/index.scss'); 
// import Graph from '../src/scripts/graph.js';
// import Calculator from '../src/scripts/calculator.js';
// const Calculator = require("./scripts/calculator");
// const Graph = require("./scripts/graph");

// import './styles/reset.scss';
// import './styles/index.scss';

// document.addEventListener("DOMContentLoaded", function () {
//     const graph = document.getElementsById("");

//     const graph = new Graph();
//     new Calculator(game, ctx).start();
// });

import './styles/reset.scss';
import './styles/index.scss';
import Calculator from './scripts/calculator';
import Graph from './scripts/graph';

// testing
// window.addEventListener('DOMContentLoaded', (event) => {
//     console.log('DOM fully loaded and parsed');
// });

const submission = document.getElementById('input-form')


if (submission) {
    submission.addEventListener('submit', makeObj)
}

function makeObj(e) {
    e.preventDefault();
    const data = new FormData(submission)
    //const data = e.currentTarget;
    console.log(...data);
    let obj = {}
    for (const [key, value] of data.entries()) {
        //console.log(key, value);
        if (key === 'rate' || key === 'time') {
            obj[key] = parseInt(value)
        } else {
            obj[key] = value;
        }
    }
    console.log(obj);
    new Calculator(obj);
}








// function makeArr(e) {
//     e.preventDefault();
//     form = e.currentTarget;
//     console.log(...form);
// } 

// const form  = document.querySelector('#input-form')

// if (form) {
//     console.log(form);
//     console.log(...form);
//     addEventListener('submit', makeArr)
// }

// const form = document.getElementById('input-form');
// console.log(form);
// form.addEventListener('submit', (e) => {
//     // handle the form data
//     new FormData(form);

//     form.addEventListener('formdata', (e) => {
//         let data = e.formData;
//         console.log(...data);
//     })

// });