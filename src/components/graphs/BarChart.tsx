import React, { useRef, useEffect } from "react";
import * as d3 from "d3";
import './barChart.css';

interface BarChartProps {
    title: string,
    svgWidth: number,
    svgHeight: number,
    margin: {
        top: number,
        bottom: number,
        left: number,
        right: number
    },
    data: {
        name: string,
        value: number
    }[]
}

export default function BarChart(props: BarChartProps) {
    const { title, data, svgWidth, svgHeight, margin } = props;
    const chartWidth = svgWidth - margin.left - margin.right;
    const chartHeight = svgHeight - margin.top - margin.bottom;
    const svgRef = useRef();

    useEffect(() => {
        document.getElementById(title + "svg")?.remove()
        const svg = d3
            .select(svgRef.current)
            .append('svg')
            .attr('id', title + "svg")
            .attr('width', svgWidth)
            .attr('height', svgHeight)
            .attr("viewBox", [0, 0, svgWidth, svgHeight]);

        const chart = svg
            .append('g')
            .attr('width', chartWidth)
            .attr('height', chartHeight)
            .attr('transform', `translate(${margin.left}, ${margin.top})`);

        const xAxisGroup = chart.append('g').attr('transform', `translate(0, ${chartHeight})`);
        const yAxisGroup = chart.append('g');

        const xScale = d3.scaleBand()
            .domain(data.map((item) => item.name))
            .range([0, chartWidth])
            .paddingInner(0.1)
            .paddingOuter(0);
        const yScale = d3
            .scaleLinear()
            .domain([0, d3.max(data, (d) => d.value)])
            .range([chartHeight, 0]);

        const xAxis = d3.axisBottom(xScale);
        const yAxis = d3
            .axisLeft(yScale)
            .ticks(5)
            .tickFormat((d) => `$${d}`);

        // xScale.domain(data.map((item) => item.name));
        // yScale.domain([0, d3.max(data, (d) => d.value)]);

        const rects = chart.selectAll('rect').data(data);
        rects.exit().remove();

        rects
            .attr('width', xScale.bandwidth)
            .attr('height', (d) => chartHeight - yScale(d.value))
            .attr('x', (d) => xScale(d.name))
            .attr('y', (d) => yScale(d.value))
            .style('fill', 'orange');

        rects
            .enter()
            .append('rect')
            .attr('x', (d) => xScale(d.name))
            .attr('y', chartHeight)
            .attr('width', xScale.bandwidth)
            .style('fill', 'orange')
            .transition()
            .duration(1000)
            .attr('height', (d) => chartHeight - yScale(d.value))
            .attr('transform', (d) => `translate(0, ${(yScale(d.value) - chartHeight)})`)
            .style('fill', 'orange');

        xAxisGroup.call(xAxis);
        yAxisGroup.call(yAxis);

        xAxisGroup
            .selectAll('text')
            .attr('text-anchor', 'end')
            .attr('transform', 'rotate(-40)')
            .attr('font-size', '0.5rem');

        yAxisGroup
            .selectAll('text')
            .attr('text-anchor', 'end')
            .attr('font-size', '0.75rem');
    })

    return (
        <div ref={svgRef} className="bar-chart container flexc">

        </div>
    )
}