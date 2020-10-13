//const { ContextReplacementPlugin } = require("webpack");

function calculator(rate, time, cont) {
    this.rate = rate;
    this.time = time;
    this.cont = cont;
}    
// makes an array of objects w/ a key of year and yeild

calculator.prototype.makeArr = function makeArr(rate, time, cont) {
    rate = (rate / 100) + 1;
    let result = [];
    let i = 0;
    let accrual;
    while (i < time) {
        accrual = ((cont * rate) + (accrual * rate));
        result[i] = {
            year: i + 1,
            accrual: accrual.toFixed(2)
        }
        i += 1;
    }
    return result;
}

calculator.prototype.calcTotalWithInterest = function calcTotalWithInterest(rate, time, cont) {
    rate = (rate / 100) + 1;
    let i = 0;
    let accrual;
    while (i < time) {
        accrual = ((cont * rate) + (accrual * rate));
        i += 1;
    }
    return accrual.toFixed(2);
}

calculator.prototype.calcTotalWithoutInterest = function calcTotalWithoutInterest(rate, time, cont) {
    return time * cont;
}

module.exports(calculator);
    
//assumes contributions are made at the start of each compounding period

// calcIntYrBegin(rate, time, cont) {
//     rate = (rate / 100) + 1;
//     let i = 0;
//     let accrual;
//     while (i < time) {
//         accrual = ((cont * rate) + (accrual * rate));
//         i += 1;
//     }
//     return accrual;
// }

// // assumes that contributions are made at the end of each compounding period

// calcIntYrEnd(rate, time, cont) {
//     rate = (rate / 100) + 1;
//     let i = 0;
//     let accrual;
//     while (i < (time - 1)) {
//         accrual = ((cont * rate) + (accrual * rate));
//         i += 1;
//     }
//     return accrual + cont;
// }


// // returns an object we can use with svg

// constructObj(rate, time, cont) {
//     rate = (rate / 100) + 1;
//     let obj = {}
//     let i = 0;
//     let accrual;
//     while (i < time) {
//         accrual = ((cont * rate) + (accrual * rate));
//         i += 1;
//         obj[i] = accrual.toFixed(2);
//     }
//     return obj;
// }