//const Calculator = require('./calculator');

//import { calculator } from './calculator';

import * as d3 from 'd3';

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
            this.svg = d3.select(this.element).append('svg');  // before svg was const svg, changed to this to have access to it in addAxes()
            this.svg.attr('width', this.width);
            this.svg.attr('height', this.height);
            this.plot = this.svg.append('g')
                .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`);

            // this.createScales();
            //this.addScales();
            this.addAxes();
            // this.addLine();
        }

    addAxes() {
        let max = 0; // y axis
        let len = this.data[0].time.length; // x axis
        let xDomainArr = [];
        //debugger

        let i = 0;
        while (i < this.data.length) {
            max += this.data[i].totalWithInterest;
            xDomainArr.push(`Year ${(i + 1).toString()}`);
            i += 1;
        }
        // console.log(xDomainArr);
        
        const x = d3.scaleBand()
            .domain(xDomainArr)
            .range([0, this.width]) // it might be this.data.length??
            .padding([0.2])
        this.svg.append('g')
            .attr("transform", "translate(0," + this.height + ")") // looks problematic
            .call(d3.axisBottom(x)
            .tickSizeOuter(0))
            .selectAll('text')
                .attr("transform", "translate(-10,0)rotate(-45)")
                .style("text-anchor", "end");
        
        const y = d3.scaleLinear()
            .domain([0, max])
            .range([this.height, 0])
        this.svg.append('g')
            .call(d3.axisLeft(y));


            
            
            
        }
        
    }
    
    
    // this.data.forEach(habit => {
    //     debugger
    //     max += habit.totalWithInterest;
    // })
    //const scale = d3.scaleLinear().domain([0, max]).range([0, len]);
    // console.log('from graph.js')
    // console.log(max);
    // console.log(this.data)

    // Add X axis
    // var x = d3.scaleBand()
    //     .domain(groups) // groups is an array of the things you want to display on the x ais
    //     .range([0, width])
    //     .padding([0.2])
    // svg.append("g")
    //     .attr("transform", "translate(0," + height + ")")
    //     .call(d3.axisBottom(x).tickSizeOuter(0));