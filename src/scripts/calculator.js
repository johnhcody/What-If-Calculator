import Graph from './graph.js';

export default class Calculator {
    constructor(obj) {
        this.rate = obj.rate;
        this.time = obj.time;
        this.habit = obj.habit;
        this.defineContribution();
    }
    // makes an array of objects w/ a key of year and yeild
    
    defineContribution() {
        this.cont = 0;
        switch (this.habit) {
            case 'coffee':
                this.cont = 520;
                break;
            case 'hair':
                this.cont = 91;
                break;
            case 'lunch':
                this.cont = 1250;
                break;
            case 'cable':
                this.cont = 2412;
                break;
            case 'save':
                this.cont = 1200;
                break;
            case 'bike':
                this.cont = 1000;
                break;
            case 'generic':
                this.cont = 1040;
                break;
            default:
                this.cont = 0;
        }
        this.makeArr();
        this.calcTotalWithInterest();
        this.calcTotalWithoutInterest();

    }


    makeArr() {
        let decRate = (this.rate / 100) + 1;
        let result = [];
        let i = 0;
        let accrual;
        while (i < this.time) {
            if (i === 0) {
                accrual = (this.cont * decRate)
             } else {
                accrual = ((this.cont * decRate) + (accrual * decRate));
            }    
            result[i] = {
                year: i + 1,
                accrual: accrual.toFixed(2)
            }
            i += 1;
        }
        console.log(result);
        let graph = new Graph(result)

        // send result to graph.js
    }
    
    calcTotalWithInterest() {
        let decRate = (this.rate / 100) + 1;
        let i = 0;
        let accrual;
        while (i < this.time) {
            if (i === 0) {
                accrual = (this.cont * decRate)
            } else {
                accrual = ((this.cont * decRate) + (accrual * decRate));
            }
            i += 1;
        }
        console.log(accrual.toFixed(2));
    }
    
    calcTotalWithoutInterest() {
        console.log(this.time * this.cont);
    }
    
}    

    
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