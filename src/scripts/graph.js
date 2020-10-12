let Calculator = require('./calculator');

class Graph {
    constructor() {
        this.margin = {top: 20, right: 20, bottom: 20, left: 20};
        this.width = 600 - this.margin.left - this.margin.right; 
        this.height = 500 - this.margin.top - this.margin.bottom;
    }

    makeGraph() {
        //how to import data from calculator.js?
        const data = Calculator.makeArr();

        var line = d3.line()
            .x(function (d) { return x(d.year); })
            .y(function (d) { return y(d.yield); });
    }
}

export default Graph;