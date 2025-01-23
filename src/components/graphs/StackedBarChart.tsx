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
        value: number,
        category: string
    }[]
}

export default function StackedBarChart(props: BarChartProps) {
    const { title, data, svgWidth, svgHeight, margin } = props;
    const chartWidth = svgWidth - margin.left - margin.right;
    const chartHeight = svgHeight - margin.top - margin.bottom;
    const svgRef = useRef();

    useEffect(() => {
        document.getElementById(title + "svg")?.remove()
        const series = d3.stack()
            .keys(d3.union(data.map(d => d.category)))
            .value(([, D], key) => D.get(key).value) // get value for each series key and stack
            (d3.index(data, d => d.name, d => d.category));

        const color = d3.scaleOrdinal()
            .domain(series.map(d => d.key))
            .range(d3.schemeSpectral[series.length])
            .unknown("#ccc");

        const svg = d3
            .select(svgRef.current)
            .append('svg')
            .attr('id', title + "svg")
            .attr("viewBox", [0, 0, svgWidth, svgHeight])
            .attr('width', svgWidth)
            .attr('height', svgHeight);

        const chart = svg
            .append('g')
            .attr('width', chartWidth)
            .attr('height', chartHeight)
            .attr('transform', `translate(${margin.left}, ${margin.top})`);

        const xAxisGroup = chart.append('g').attr('transform', `translate(0, ${chartHeight})`);
        const yAxisGroup = chart.append('g');

        const xScale = d3.scaleBand()
            .domain(d3.groupSort(data, D => -d3.sum(D, d => d.category), d => d.name))
            .range([0, chartWidth])
            .paddingInner(0.1)
            .paddingOuter(0);

        const yScale = d3.scaleLinear()
            .domain([0, d3.max(series, d => d3.max(d, d => d[1]))])
            .rangeRound([chartHeight, margin.top]);

        const xAxis = d3.axisBottom(xScale);
        const yAxis = d3
            .axisLeft(yScale)
            .ticks(5)
            .tickFormat((d) => `$${d}`);

        chart.append("g")
            .selectAll()
            .data(series)
            .join("g")
                .attr("fill", d => color(d.key))
            .selectAll("rect")
            .data(D => D.map(d => (d.key = D.key, d)))
            .join("rect")
                .attr("x", d => xScale(d.data[0]))
                .attr("y", d => yScale(d[1]))
                .attr("height", d => {
                    console.log();
                    return chartHeight - (chartHeight - (yScale(d[0]) + yScale(d[1])))
                })
                .attr("width", xScale.bandwidth())
            .append("title")
            .text(d => `${d.data[1].get(d.key).category}\n${d.data[1].get(d.key).value}`);

        chart.selectAll('rect')
            .transition()
            .duration(1000)
            .attr("height", d => yScale(d[0]) - yScale(d[1]))

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