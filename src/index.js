const reset = require('./styles/reset.scss');
const style = require('./styles/index.scss'); 


const Calculator = require("./scripts/calculator");
const Graph = require("./scripts/graph");

// document.addEventListener("DOMContentLoaded", function () {
//     const graph = document.getElementsById("");

//     const graph = new Graph();
//     new Calculator(game, ctx).start();
// });


const form = document.getElementById('input-form');

form.addEventListener('submit', (e) => {
    debugger
    // handle the form data
    new FormData(form);

    form.addEventListener('formdata', (e) => {
        let data = e.formData;
        console.log(data);
    })

});