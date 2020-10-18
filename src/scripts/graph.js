//const Calculator = require('./calculator');

//import { calculator } from './calculator';

import * as d3 from 'd3';
import * as d3scale from 'd3-scale';

export default class Graph {
    constructor(obj) {
        this.element = obj.element;
        this.data = obj.data;
        this.totalWithInterest = obj.totalWithInterest; 
        this.drawDimensions();
    }
    
    drawDimensions() {
        this.margin = {top: 20, right: 20, bottom: 20, left: 60};
        this.width = 850 - this.margin.left - this.margin.right; 
        this.height = 500 - this.margin.top - this.margin.bottom;
        this.element.innerHTML = '';
        
        this.makeGraph();
    }
    
    makeGraph() {


        // SVG INITIAL SETUP
        const svg = d3.select("#graph-wrapper")
        .append("svg")  
            .attr('width', this.width + this.margin.left + this.margin.right)
            .attr('height', this.height + this.margin.top + this.margin.bottom)
        .append("g")
            .attr("transform", 
                "translate(" + this.margin.left + "," + this.margin.top + ")");

        // FORMATING DATA
        const graphData = this.data.slice(0, this.data.length - 1); // graphData is an array of objects.  {year: 1, hair: 91, coffee: 120}, {year: 2, hair: 200, coffee: 320}, etc
        const subgroups = Object.keys(this.data[0]).slice(1) // subgroups is an array of the different habits selected
        const groups = Array.from(Array(this.data.length).keys()).slice(1).map(n => n.toString()) // groups is an array of integers representing each year 
        const obj = d3.map(graphData, function (d) { return (d.year) })   // obj should be ok
        
        const stackedData = d3.stack()
            .keys(subgroups)
            (graphData)
        // stackedData is necessary to put bars on top of each other.
        
        // AXESß
        debugger

        function addYears(numArr) {
            result = numArr.map(num => {
                return "Year " + num;
            })
            return result;
        }

        const xAxisText = addYears(groups); // array with year and number combines for each tick on x axis

        const x = d3.scaleBand()
            .domain(groups) //[0, num]
            .rangeRound([0, this.width])
            .padding([0.2])
        svg.append("g")
            .attr("transform", "translate(0," + this.height + ")")
            .call(d3.axisBottom(x).tickSizeOuter(0))
                .append('text')
                // attempt to display year + num at an angle
                //.tickFormat((d, i) => xAxisText[i])
                // .selectAll("text")
                // .style("text-anchor", "end")
                // .attr("dx", "-.8em")
                // .attr("dy", ".15em")
                // .attr("transform", "rotate(-65)")
                
        const y = d3.scaleLinear()
            .domain([0, this.totalWithInterest + (this.totalWithInterest * 0.05)])
            .range([this.height, 0]);
        svg.append("g")
            .call(d3.axisLeft(y))
            .append("text")
                .attr("transform", "rotate(-90)")
                .attr("y", 6)
                .attr("dy", "0.8em")
                .attr("text-anchor", "end")
                .attr("fill", "#5D6971")
                .text("Amount of Savings with Interest ($)");;
        const color = d3.scaleOrdinal(d3.schemePaired);

        const lgdColor = d3.scaleOrdinal(d3.schemePaired);
        
        
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
            .attr("x", function (d) { return x(d.data.year); })
                .transition()
                .duration(800)
                .attr("y", function (d) { return y(d[1]); })
                .attr("height", function (d) { return y(d[0]) - y(d[1]); })
                .attr("width", x.bandwidth())
                .delay(function (d, i) { return (i * 100) })


                const legend = svg.append('g')
                .attr('class', 'legend')
                .attr('transform', 'translate(' + (52) + ', 0)');
                
                
        legend.selectAll('rect')
            .data(subgroups)
            .enter()
            .append('rect')
            .attr('x', 0)
            .attr('y', function (d, i) {
                return i * 18;
            })
            .attr('width', 12)
            .attr('height', 12)
            .attr('fill', function (d, i) {
                //debugger
                return lgdColor(i);
            });
            // debugger
            const textAndValues = subgroups.concat(Object.values(this.data[this.data.length - 2]).slice(1))

            let result = [];
            function transformText(arr) {
                let i = 0;
                const nums = arr.slice(arr.length / 2);
                // debugger
                arr = arr.map(n => {
                    if (typeof n === 'number') {
                        //debugger
                        n = parseInt(n);
                        return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                    } else {
                        debugger
                        if (n === 'customTime') {
                            return 'Custom Input'
                        } else {
                            return n.charAt(0).toUpperCase() + n.slice(1);
                        }
                    }
                })
                
                while (i < (arr.length / 2)) {
                    result.push(arr[i] + ' - $' + arr[i + (arr.length / 2)])
                    //debugger
                    i += 1
                }
                return result;
            }
            const legendText = transformText(textAndValues)

        legend.selectAll('text')
            .data(legendText)
            .enter()
            .append('text')
            .text(function (d) {
                return d;
            })
            .attr('x', 18)
            .attr('y', function (d, i) {
                return i * 18;
            })
            .attr('text-anchor', 'start')
            .attr('alignment-baseline', 'hanging')
            .attr('font-family', 'sans-serif')
            .attr('fill', function (d, i) {
                //debugger
                return lgdColor(i);
            });
            



        }
}

