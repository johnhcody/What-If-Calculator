//const Calculator = require('./calculator');

//import { calculator } from './calculator';

export default class Graph {
    constructor(props) {
        this.margin = {top: 20, right: 20, bottom: 20, left: 20};
        this.width = 600 - this.margin.left - this.margin.right; 
        this.height = 500 - this.margin.top - this.margin.bottom;
    }
        
        makeGraph() {
            console.log('graph');
        }
        
}

