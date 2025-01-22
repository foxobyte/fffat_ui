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
            .attr("style", "max-width: 100%; height: auto;");

        const chart = svg
            .append('g')
            .attr('width', chartWidth)
            .attr('height', chartHeight)
            .attr('transform', `translate(${margin.left}, ${margin.top})`);

        const xAxisGroup = chart.append('g').attr('transform', `translate(0, ${chartHeight})`);
        const yAxisGroup = chart.append('g');

        const xScale = d3.scaleBand()
            .domain(d3.groupSort(data, D => -d3.sum(D, d => d.category), d => d.name))
            .range([0, chartWidth]).paddingInner(0.1).paddingOuter(0);

        const yScale = d3.scaleLinear()
            .domain([0, d3.max(series, d => d3.max(d, d => d[1]))])
            .rangeRound([chartHeight - margin.bottom, margin.top]);

        const xAxis = d3.axisBottom(xScale);
        const yAxis = d3
            .axisLeft(yScale)
            .tickFormat((d) => `$${d}`);

        // xScale.domain(data.map((item) => item.name));
        // yScale.domain([0, d3.max(data, (d) => d.value)]);

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
                .attr("height", d => yScale(d[0]) - yScale(d[1]))
                .attr("width", xScale.bandwidth())
        // .append("title")
        //   .text(d => `${d.data[0]} ${d.key}\n${formatValue(d.data[1].get(d.key).population)}`);

        // const rects = chart.selectAll('rect')
        //     .data(D => D.map(d => (d.key = D.key, d)))    
        //     .join("rect")
        //     .attr("x", d => xScale(d[0]))
        //     .attr("y", d => yScale(d.value))
        //     .attr("height", d => {
        //         console.log(d);
        //         console.log(yScale(d[0]), yScale(d.value));
        //         return yScale(d.category) - yScale(d.value);
        //     })
        //     .attr("width", xScale.bandwidth());

        // rects
        //     .attr('width', xScale.bandwidth)
        //     .attr('height', (d) => chartHeight - yScale(d.value))
        //     .attr('x', (d) => xScale(d.name))
        //     .attr('y', (d) => yScale(d.value))
        //     .style('fill', 'orange');

        // rects
        //     .enter()
        //     .append('rect')
        //     .attr('x', (d) => xScale(d.name))
        //     .attr('y', (d) => chartHeight)
        //     .attr('width', xScale.bandwidth)
        //     .transition()
        //     .duration(1000)
        //     .attr('height', (d) => chartHeight - yScale(d.value))
        //     .attr('transform', (d) => `translate(0, ${(yScale(d.value) - chartHeight)})`)
        //     .style('fill', 'orange')

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