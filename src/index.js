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



function makeArr(e) {
    e.preventDefault();
    form = e.currentTarget;
    console.log(...form);
} 

const form  = document.querySelector('#input-form')

if (form) {
    console.log(form);
    console.log(...form);
    addEventListener('submit', makeArr)
}

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