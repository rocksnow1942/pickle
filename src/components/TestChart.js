import React, { Component ,useRef,useEffect } from 'react'
// import './App.css'
import { scaleLinear } from 'd3-scale'
import { max } from 'd3-array'
import { select } from 'd3-selection'
// import { d3} from 'd3'
let fs = require('fs')

let d3 = require('d3')

class TestChart extends Component {
    constructor(props) {
        super(props)
        
        this.createChart = this.createChart.bind(this)
    }
    componentDidMount() {
        this.createChart()
    }
    componentDidUpdate() {
        while(this.node.firstChild){
            this.node.removeChild(this.node.firstChild)
        }
        
        this.createChart()
    }
    
    createChart () {
        const node = this.node
        let txt = fs.readFileSync('/Users/hui/Downloads/aapl.csv', 'utf8', )
        
        let data = Object.assign(d3.csvParse(txt,
        d3.autoType).map(({ date, close }) => ({ date, value: close })), { y: `close - ${this.props.count}` })

        let line = d3.line()
            .defined(d => !isNaN(d.value))
            .x(d => x(d.date))
            .y(d => y(d.value))


        let base = data[0].value
        let height = 600
        let width = 600
        let margin = ({ top: 20, right: 30, bottom: 30, left: 50 })

        let x = d3.scaleUtc()
            .domain(d3.extent(data, d => d.date))
            .range([margin.left, width - margin.right])

        let y = d3.scaleLinear()
            .domain([0, d3.max(data, d => d.value)]).nice()
            .range([height - margin.bottom, margin.top])
        
        let xAxis = g => g
            .attr("transform", `translate(0,${height - margin.bottom})`)
            .call(d3.axisBottom(x).ticks(width / 80).tickSizeOuter(0)) 

        let yAxis = g => g
            .attr("transform", `translate(${margin.left},0)`)
            .call(d3.axisLeft(y))
            .call(g => g.select(".domain").remove())
            .call(g => g.select(".tick:last-of-type text").clone()
                .attr("x", 3)
                .attr("text-anchor", "start")
                .attr("font-weight", "bold")
                .text(data.y))
       
    
        // const svg = d3.create("svg")
        //     .attr("viewBox", [0, 0, width, height]);
        const svg = select(node)
        svg.attr("viewBox", [0, 0, width, height])
        svg.attr("viewBox", [0, 0, width, height])
        svg.append("g")
            .call(xAxis);

        svg.append("g")
            .call(yAxis);

        svg.append("path")
            .datum(data)
            .attr("fill", "none")
            .attr("stroke", "steelblue")
            .attr("stroke-width", 1.5)
            .attr("stroke-linejoin", "round")
            .attr("stroke-linecap", "round")
            .attr("d", line);    
        }
        render( ) {
            return <svg ref={node => this.node = node} width={500} height={500}> </svg>
        }
}


// const TestChart = () => {
//     const ref = useRef()
//     useEffect(()=>{
//         const svgElement = d3.select(ref.current)
//         svgElement.append("circle")
//             .attr("cx", 150)
//             .attr("cy", 70)
//             .attr("r", 50)
//     },[])
//     return (
//         <svg ref={ref} style={{border:"2px solid gold"}}> </svg>
//     )
// }


export default TestChart