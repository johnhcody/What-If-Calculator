//const Calculator = require('./calculator');

//import { calculator } from './calculator';

export default class Graph {
    constructor(obj) {
        this.element = obj.element;
        this.data = obj.data;
        this.makeGraph();
    }
    
    makeGraph() {
            this.margin = {top: 20, right: 20, bottom: 20, left: 20};
            this.width = 600 - this.margin.left - this.margin.right; 
            this.height = 500 - this.margin.top - this.margin.bottom;

            this.element.innerHTML = '';
            const svg = d3.select(this.element).append('svg');
            svg.attr('width', this.width);
            svg.attr('height', this.height);
            svg.append('g')
        }
        
}

