export default class Calculator {
    constructor(obj) {
        this.rate = obj.rate;
        this.columns = obj.columns;
        this.year = obj.year;
        this.custom = obj.custom;
        this.customTime = obj.customTime;
        this.customMult = obj.customMult;
        this.makeNewKeys();
    }
    // makes an array of objects w/ a key of year and yeild
    
    makeNewKeys() {
        let value;
        let customVal = this.custom * this.customMult;
        if (this.year === 0) this.columns.map(habit => this[habit] = 0)
        this.columns.map(habit => {
            switch (habit) {
                case 'coffee':
                    value = 427;
                    break;
                case 'hair':
                    value = 112;
                    break;
                case 'lunch':
                    value = 1200;
                    break;
                case 'cable':
                    value = 2369;
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
                case 'customTime':
                    value = customVal;
                    break;
                default:
                    break;
            }
            if (this.year > 0) this[habit] = this.findAccrual(habit, value);
        })
    }

    
    
    findAccrual(habit, contribution) {
        let decimalRate = (this.rate / 100) + 1;
        let i = 0;
        let accrual = 0;
        while (i < this.year) {
            if (i === 0) {
                accrual = (contribution * decimalRate)
             } else {
                 accrual = ((contribution * decimalRate) + (accrual * decimalRate));
            }
            i += 1;
        }
        return this[habit] = parseInt(accrual);
    }
    
}    
 