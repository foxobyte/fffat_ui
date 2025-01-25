import React, { useEffect } from 'react';
import './theme.css';
import './style.css';
import './App.css';
import SingleValueContainer from './components/containers/SingleValueContainer.tsx';
import BarChart from './components/graphs/BarChart.tsx';
import StackedBarChart from './components/graphs/StackedBarChart.tsx';
import * as d3 from 'd3';
import getDeviceType from './util/getDeviceType.ts';
import NavIcon from './components/nav_icon/NavIcon.tsx';

const App = () => {
    // console.log(navigator.userAgent)
    useEffect(() => {
        // Initialize App
    }, [])

    const scheme = d3.schemeSet1;
    const device = getDeviceType();

    // useEffect(() => {
    //     if (device === "Mobile") {
    //         const content = document.getElementById('content');
    //         content!.style.height = "calc(100% - (var(--nav-height) * 2))";
    //     }
    // })

    return (
        <>
            <nav className="nav-top flexc">
                <div className="nav-icon-link flexc">
                    <svg className="nav-icon flexc" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                        {/* <!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--> */}
                        <path d="M304 128a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zM96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM49.3 464l349.5 0c-8.9-63.3-63.3-112-129-112l-91.4 0c-65.7 0-120.1 48.7-129 112zM0 482.3C0 383.8 79.8 304 178.3 304l91.4 0C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7L29.7 512C13.3 512 0 498.7 0 482.3z" />
                    </svg>
                </div>
            </nav>
            <div id="content" className="content vapor-wave-theme">
                <div className="single-value-containers flexc">
                    <SingleValueContainer label="Balance" value="$2,350" />
                    <SingleValueContainer label="Credit" value="$2,350" />
                    <SingleValueContainer label="Balance" value="$2,350" />
                </div>
                <BarChart
                    label={"test"}
                    xLabel={"x axis"}
                    yLabel={"y axis"}
                    svgWidth={480}
                    svgHeight={270}
                    margin={{
                        top: 20,
                        bottom: 60,
                        left: 100,
                        right: 100
                    }}
                    padding={{
                        top: 10,
                        bottom: 10,
                        left: 10,
                        right: 10
                    }}
                    data={[
                        { key: "Thu Jan 16 2025", value: 3000, color: "orange" },
                        { key: "Thu Feb 16 2025", value: 3500, color: "orange" },
                        { key: "Thu Jun 16 2025", value: 5988, color: "orange" },
                        { key: "Thu Mar 16 2025", value: 3566, color: "orange" },
                        { key: "Thu Apr 16 2025", value: 5988, color: "orange" },
                    ]}
                />
                <StackedBarChart
                    title={"spending"}
                    svgWidth={480}
                    svgHeight={270}
                    margin={{
                        top: 20,
                        bottom: 60,
                        left: 100,
                        right: 100
                    }}
                    data={[
                        { name: "Feb, 2025", value: 3000, color: "red", category: "groceries" },
                        { name: "Feb, 2025", value: 3500, color: "orange", category: "rent" },
                        { name: "Feb, 2025", value: 3566, color: "yellow", category: "hobbies" },
                        { name: "Feb, 2025", value: 5988, color: "green", category: "extra" },
                        { name: "Mar, 2025", value: 2000, color: "red", category: "groceries" },
                        { name: "Mar, 2025", value: 3400, color: "orange", category: "rent" },
                        { name: "Mar, 2025", value: 1566, color: "yellow", category: "hobbies" },
                        { name: "Mar, 2025", value: 6988, color: "green", category: "extra" },
                        { name: "Apr, 2025", value: 2000, color: "red", category: "groceries" },
                        { name: "Apr, 2025", value: 5500, color: "orange", category: "rent" },
                        { name: "Apr, 2025", value: 3566, color: "yellow", category: "hobbies" },
                        { name: "Apr, 2025", value: 1988, color: "green", category: "extra" },
                    ]}
                />
            </div>
            {device === 'Mobile' ?
                <nav className="nav-bottom flexc">
                    <NavIcon icon="money-bill-trend-up" text="assets" />
                    <div className="nav-icon-break"></div>
                    <NavIcon icon="credit-card" text="credit" />
                </nav> : ""
            }
        </>
    );
}

export default App;
