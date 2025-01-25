import React, { useRef, useEffect } from "react";
import * as d3 from "d3";
import './barChart.css';

interface BarChartProps {
    label: string,
    xLabel: string,
    yLabel: string,
    scheme: string[],
    svgWidth: number,
    svgHeight: number,
    margin: {
        top: number,
        bottom: number,
        left: number,
        right: number
    },
    padding: {
        top: number,
        bottom: number,
        left: number,
        right: number
    },
    data: {
        key: string,
        value: number,
        color: string
    }[]
}

export default function BarChart(props: BarChartProps) {
    const { label, xLabel, yLabel, scheme, svgWidth, svgHeight, margin, padding, data } = props;
    const chartWidth = svgWidth - margin.left - margin.right - padding.left;
    const chartHeight = svgHeight - margin.top - margin.bottom - padding.top - padding.bottom;
    const titleSize = 20;
    const fontSize = 16;
    const svgRef = useRef();

    useEffect(() => {
        document.getElementById(label + "svg")?.remove()
        const svg = d3
            .select(svgRef.current)
            .append('svg')
            .attr('id', label + "svg")
            .attr('width', svgWidth)
            .attr('height', svgHeight)
            .attr("viewBox", [0, 0, svgWidth, svgHeight]);

        const title = svg
            .append('text')
            .attr('x', svgWidth / 2)
            .attr('y', (padding.top / 2) + (titleSize / 2))
            .attr('text-anchor', 'middle')
            .attr('font-size', titleSize)
            .attr('fill', 'currentColor')
            .text(label)

        const xTitle = svg
            .append('text')
            .attr('x', svgWidth / 2)
            .attr('y', svgHeight - (padding.bottom / 2))
            .attr('text-anchor', 'middle')
            .attr('fill', 'currentColor')
            .text(xLabel)

        const yTitle = svg
            .append('text')
            .attr('x', padding.left + (fontSize / 2))
            .attr('y', svgHeight / 2)
            .attr('text-anchor', 'middle')
            .attr('font-size', fontSize)
            .attr('fill', 'currentColor')
            .attr('writing-mode', 'tb-rl')
            .text(yLabel)

        const legend = svg
            .selectAll('dots')
            .data(data)
            .enter()
            .append('circle')
                .attr('cx', '25')
                .attr('cy', '25')
                .attr('r', '7')
                .attr('fill', d => console.log(d))

        const chart = svg
            .append('g')
            .attr('width', chartWidth)
            .attr('height', chartHeight)
            .attr('transform', `translate(${margin.left + padding.left}, ${margin.top + padding.top})`);

        const xAxisGroup = chart.append('g').attr('transform', `translate(0, ${chartHeight})`);
        const yAxisGroup = chart.append('g');

        const xScale = d3.scaleBand()
            .domain(data.map((item) => item.key))
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

        const rects = chart.selectAll('rect').data(data);
        rects.exit().remove();

        rects
            .attr('width', xScale.bandwidth)
            .attr('height', (d) => chartHeight - yScale(d.value))
            .attr('x', (d) => xScale(d.key))
            .attr('y', (d) => yScale(d.value))
            .style('fill', (d) => d.color);

        rects
            .enter()
            .append('rect')
            .attr('x', (d) => xScale(d.key))
            .attr('y', chartHeight)
            .attr('width', xScale.bandwidth)
            .style('fill', (d) => d.color)
            .transition()
            .duration(1000)
            .attr('height', (d) => chartHeight - yScale(d.value))
            .attr('transform', (d) => `translate(0, ${(yScale(d.value) - chartHeight)})`)
            .style('fill', (d) => d.color);

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