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
            const graphData = this.data.slice(0, this.data.length - 1);
            const series = d3.stack().keys(this.data[this.data.length - 1])(graphData)

            this.margin = {top: 20, right: 20, bottom: 20, left: 20};
            this.width = 600 - this.margin.left - this.margin.right; 
            this.height = 500 - this.margin.top - this.margin.bottom;

            this.element.innerHTML = '';
            const svg = d3.select(this.element).append('svg');  // before svg was const svg, changed to this to have access to it in addAxes()
            svg.attr('width', this.width);
            svg.attr('height', this.height);
            const gSvg = svg.append('g')
                .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`);
            // const newSvg = svg.append("g").attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");
            const xScale = d3.scaleBand()
                .domain(graphData.map(function (d) { return d.category; }))
                .range([0, this.width])
                .padding(0.1);
            
            // debugger
            const yScale = d3.scaleLinear()
                .domain([0, d3.max(series, d => d3.max(d, d => d[1]))])
                .range([this.height, 0]);
            // debugger
            const color = d3.scaleOrdinal(d3.schemeAccent);

            const rects = gSvg.selectAll('g').data(series).enter()
                .append('g')
                .attr('fill', d => color(d.key));

            rects.selectAll('rect')
                .data(d => d)
                .join("rect")
                .attr("x", (d, i) => xScale(d.data.category))
                .attr("y", d => yScale(d[1]))
                .attr("height", d => yScale(d[0]) - yScale(d[1]))
                .attr("width", xScale.bandwidth())

        const xAxis = gSvg.append("g")
            .attr("id", "xAxis")
            .attr("transform", "translate(0," + this.height + ")")
            .call(d3.axisBottom(xScale));

        const yAxis = gSvg.append("g")
            .attr("id", "yAxis")
            .call(d3.axisLeft(yScale));

        return svg.node();

        }

    // addAxes() {
    //     let max = 0; // y axis
    //     let len = this.data[0].time.length; // x axis
    //     let xDomainArr = [];
    //     //debugger

    //     let i = 0;
    //     while (i < this.data.length) {
    //         max += this.data[i].totalWithInterest;
    //         xDomainArr.push(`Year ${(i + 1).toString()}`);
    //         i += 1;
    //     }
    //     // console.log(xDomainArr);
        
    //     const x = d3.scaleBand()
    //         .domain(xDomainArr)
    //         .range([0, this.width]) // it might be this.data.length??
    //         .padding([0.2])
    //     this.svg.append('g')
    //         .attr("transform", "translate(0," + this.height + ")") // looks problematic
    //         .call(d3.axisBottom(x)
    //         .tickSizeOuter(0))
    //         .selectAll('text')
    //             .attr("transform", "translate(-10,0)rotate(-45)")
    //             .style("text-anchor", "end");
        
    //     const y = d3.scaleLinear()
    //         .domain([0, max])
    //         .range([this.height, 0])
    //     this.svg.append('g')
    //         .call(d3.axisLeft(y));


            
            
            
    //     }
        
    // }
    
    