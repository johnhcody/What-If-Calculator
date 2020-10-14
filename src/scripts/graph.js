//const Calculator = require('./calculator');

//import { calculator } from './calculator';

import * as d3 from 'd3';

export default class Graph {
    constructor(obj) {
        this.element = obj.element;
        this.data = obj.data;
        this.totalWithInterest = obj.totalWithInterest; 
        this.makeGraph();
    }
    
    makeGraph() {
            const svgData = this.data;
            const graphData = this.data.slice(0, this.data.length - 1);
            debugger
            const series = d3.stack().keys(this.data[this.data.length - 1])(graphData)

            this.margin = {top: 20, right: 20, bottom: 20, left: 20};
            this.width = 600 - this.margin.left - this.margin.right; 
            this.height = 500 - this.margin.top - this.margin.bottom;

            this.element.innerHTML = '';
            const svg = d3.select(this.element).append('svg');  // before svg was const svg, changed to this to have access to it in addAxes()
            svg.attr('width', this.width);
            svg.attr('height', this.height);
            // going with a new strategy
            const gSvg = svg.append('g')
                .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`);
            // const newSvg = svg.append("g").attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");
            // debugger
        const subgroups = Object.keys(this.data[0]).slice(1) // subgroups is good
        const groups = Array.from(Array(this.data.length).keys()).slice(1).map(n => n.toString()) // groups is an array of integers representing each year 
        const obj = d3.map(graphData, function (d) { return (d.year) })   //obj should be ok
        debugger

        const x = d3.scaleBand()
            .domain(groups) //[0, num]
            .range([0, this.width])
            .padding([0.2])
        svg.append("g")
            .attr("transform", "translate(0," + this.height + ")")
            .call(d3.axisBottom(x).tickSizeOuter(0));
        debugger
        const y = d3.scaleLinear()
            .domain([0, this.totalWithInterest])
            .range([this.height, 0]);
        svg.append("g")
            .call(d3.axisLeft(y));
        debugger
        const color = d3.scaleOrdinal()
            .domain(subgroups)
            .range(['#e41a1c', '#377eb8', '#4daf4a', '#00e9ff', '#905caa', '#f8ff35'])
        
        const stackedData = d3.stack()
            .keys(subgroups)
            (graphData)
        
        
        // from bc_example.html... will try a new approach
        debugger
        svg.append("g")
            .selectAll("g")
            // Enter in the stack data = loop key per key = group per group
            .data(stackedData)
            .enter().append("g")
            .attr("fill", function (d) { return color(d.key); })
            .selectAll("rect")
            // enter a second time = loop subgroup per subgroup to add all rectangles
            .data(function (d) { return d; })
            .enter().append("rect")
            .attr("x", function (d) { return x(d.year); })
            .attr("y", function (d) { return y(d[1]); })
            .attr("height", function (d) { return y(d[0]) - y(d[1]); })
            .attr("width", x.bandwidth())

        // d3.select("svg").selectAll("g.bar")
        //     .data(stackedData) // Pass the sorted data in
        //     .enter()
        //     .append("g")
        //     .attr("class", "bar")
        //     .each(function (d) {
        //         d3.select(this).selectAll("rect")
        //             .data(d)
        //             .enter()
        //             .append("rect")
        //             .attr("width", 40)
        //             .attr("height", p => y(p[1]) - y(p[0]))
        //             .attr("x", (p, i) => x(i) + 25)
        //             .attr("y", p => y(p[1]))
        //             .style("fill", color(d.key)) 
            // })
        }
}







        //     const xScale = d3.scaleBand()
        //         .domain(Object.keys(graphData[0]))
        //         .range([0, this.width])
        //         .padding(0.1); 
            
        //     debugger
        //     const yScale = d3.scaleLinear()
        //         .domain([0, this.totalWithInterest])
        //         .range([this.height, 0]);
        //     // debugger
        //     const color = d3.scaleOrdinal()
        //         .domain(['red', 'blue', 'green', 'yellow', 'pink', 'purple', 'gray'])
        //         .range(d3.schemeAccent);

        //     const rects = gSvg.selectAll('g').data(series).enter()
        //         .append('g')
        //         .attr('fill', d => color(d.key));

        //     rects.selectAll('rect')
        //         .data(d => d)
        //         .join("rect")
        //         .attr("x", (d, i) => xScale(d.data.category))
        //         .attr("y", d => yScale(d[1]))
        //         .attr("height", d => yScale(d[0]) - yScale(d[1]))
        //         .attr("width", xScale.bandwidth())

        // const xAxis = gSvg.append("g")
        //     .attr("id", "xAxis")
        //     .attr("transform", "translate(0," + this.height + ")")
        //     .call(d3.axisBottom(xScale));

        // const yAxis = gSvg.append("g")
        //     .attr("id", "yAxis")
        //     .call(d3.axisLeft(yScale));
            
        //     return svg.node();
            
    //     }
        
    // }
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
    