import Graph from './graph.js';

export default class Calculator {
    constructor(obj) {
        this.rate = obj.rate;
        this.columns = obj.columns;
        this.year = obj.year;
        this.time = this.time;
        this.makeNewKeys();
    }
    // makes an array of objects w/ a key of year and yeild
    
    makeNewKeys() {
        let value;
        
        this.columns.map(habit => {
            switch (habit) {
                case 'coffee':
                    value = 520;
                    break;
                case 'hair':
                    value = 91;
                    break;
                case 'lunch':
                    value = 1250;
                    break;
                case 'cable':
                    value = 2412;
                    break;
                case 'save':
                    value = 1200;
                    break;
                case 'bike':
                    value = 1000;
                    break;
                case 'generic':
                    value = 1040;
                    break;
                default:
                    break;
            }
            // debugger
            this[habit] = this.findAccrual(habit, value);
        })
        debugger
        //  this.defineAccrual();
    }

    defineAccrual() {
        this.cont = 0;
        let decRate = (this.rate / 100) + 1;
        debugger

        if (this.coffee >= 0) {
            this.coffee = this.findAccrual(coffee, 520)
        } else if (this.hair >= 0) {
            this.hair = this.findAccrual(hair, 91)
        } else if (this.lunch >= 0) {
            this.lunch = this.findAccrual(lunch, 1250)
        } else if (this.cable >= 0) {
            this.cable = this.findAccrual(cable, 2412)
        } else if (this.save >= 0) {
            this.save = this.findAccrual(save, 1200)
        } else if (this.bike >= 0) {
            this.bike = this.findAccrual(bike, 1000)
        } else if (this.generic >= 0) {
            this.generic = this.findAccrual(generic, 1040)
        } 
         




        // switch (this) {
        //     case 'coffee':
        //         this.cont = 520;
        //         break;
        //     case 'hair':
        //         this.cont = 91;
        //         break;
        //     case 'lunch':
        //         this.cont = 1250;
        //         break;
        //     case 'cable':
        //         this.cont = 2412;
        //         break;
        //     case 'save':
        //         this.cont = 1200;
        //         break;
        //     case 'bike':
        //         this.cont = 1000;
        //         break;
        //     case 'generic':
        //         this.cont = 1040;
        //         break;
        //     default:
        //         this.cont = 0;
        // }
        // this.findAccrual();
        // this.calcTotalWithInterest();
        // this.calcTotalWithoutInterest();
    }


    findAccrual(key, cont) {
        let decRate = (this.rate / 100) + 1;
        let i = 0;
        let accrual = 0;
        // debugger
        while (i < this.year) {
            if (i === 0) {
                accrual = (cont * decRate)
             } else {
                accrual = ((cont * decRate) + (accrual * decRate));
            }
            // debugger
            this[key] = parseFloat(accrual).toFixed(2);
            i += 1;
            // debugger
        }
        return this[key] = parseFloat(accrual).toFixed(2);
        // debugger
        //console.log(result);
        //let graph = new Graph(result)
        // this.time = result;
        // const that = this;
        // return that;
        // send result to graph.js
    }
    
    calcTotalWithInterest() {
        // let decRate = (this.rate / 100) + 1;
        // let i = 0;
        // let accrual;
        // while (i < this.time) {
        //     if (i === 0) {
        //         accrual = (this.cont * decRate)
        //     } else {
        //         accrual = ((this.cont * decRate) + (accrual * decRate));
        //     }
        //     i += 1;
        // }
        this['totalWithInterest'] = parseFloat(this.time[this.time.length - 1].accrual)
        // debugger
        // this['totalWithInterest'] = accrual.toFixed(2);
        // console.log(accrual.toFixed(2));
    }
    
    calcTotalWithoutInterest() {
        //console.log(this.time * this.cont);
        this['totalWithoutInterest'] = (this.time.length * this.cont);
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