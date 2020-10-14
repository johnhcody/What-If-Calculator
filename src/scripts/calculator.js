import Graph from './graph.js';

export default class Calculator {
    constructor(obj) {
        this.rate = obj.rate;
        this.columns = obj.columns;
        this.year = obj.year;
        //this.time = this.time;
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
            // 
            this[habit] = this.findAccrual(habit, value);
        })
        // 
        //  this.defineAccrual();
    }

    
    
    findAccrual(key, cont) {
        let decRate = (this.rate / 100) + 1;
        let i = 0;
        let accrual = 0;
        while (i < this.year) {
            if (i === 0) {
                accrual = (cont * decRate)
             } else {
                 accrual = ((cont * decRate) + (accrual * decRate));
            }
            // this[key] = parseFloat(accrual);
            i += 1;
        }
        this.calcTotalWithoutInterest(cont);
        return this[key] = parseFloat(parseFloat(accrual.toFixed(2)));
    }
    
    calcTotalWithoutInterest(cont) {
        //console.log(this.time * this.cont);
        debugger
        this['totalWithoutInterest'] = (this.year * cont);
    }
    
}    
