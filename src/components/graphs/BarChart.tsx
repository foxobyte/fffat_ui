import React, { useState, useEffect, useRef } from "react";
import * as d3 from "d3";
import './barChart.css';

export default function BarChart() {

    const [data, setData] = useState([
        { name: new Date().toDateString(), value: 3000 },
        { name: "Thu Feb 16 2025", value: 3500 },
        { name: "Thu Mar 16 2025", value: 23566 },
        { name: "Thu Jun 16 2025", value: 5988 },
    ]);
    // Set up dimensions
    const margin = { top: 0, right: 100, bottom: 30, left: 100 };
    const width = 800 - margin.left - margin.right;
    const height = 300 - margin.top - margin.bottom;
    const svgRef = useRef();
    useEffect(() => {
        // Create SVG container
        const svg = d3.select(svgRef.current);

        // Create scales
        const xScale = d3.scaleBand().domain(data.map((d) => d.name)).range([0, width]).padding(0.5);
        const yScale = d3.scaleLinear().domain([0, d3.max(data, (d) => d.value)]).range([height, 0]);

        // Create bars
        svg
            .selectAll(".bar")
            .data(data)
            .enter()
            .append("rect")
            .attr("class", "bar")
            .attr("x", (d) => xScale(d.name))
            .attr("y", (d) => yScale(d.value))
            .attr("width", xScale.bandwidth())
            .attr("height", (d) => height - yScale(d.value))
            .attr("transform", "translate(40, 10)")
            .attr("fill", "steelblue");

        // Create x-axis
        const xAxis = d3.axisBottom(xScale);
        svg.append("g")
            .attr("class", "x-axis")
            .attr("transform", `translate(40,${height + 10})`)
            .call(xAxis);

        // Create y-axis
        const yAxis = d3.axisLeft(yScale);
        svg.append("g")
            .attr("class", "y-axis")
            .attr("transform", "translate(40, 10)")
            .call(yAxis);
    }, []);

    return (
        <div className="bar-chart-wrapper container">
            <svg className="bar-chart" ref={svgRef} height={height} width={width} viewBox={`0 0 ${width} ${height}`}>

            </svg>
        </div>
    )
}