import React, { useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import FullscreenIcon from "../assets/fullscreen.png";
import CompareIcon from "../assets/compare.png";

type TimeRange = "1d" | "3d" | "1w" | "1m" | "6m" | "1y" | "max";

const CryptoChart = () => {
    // Mock data generation - in a real app, this would come from an API
    const generatePriceData = (days: number) => {
        let baseData = [
            35000, 36500, 38000, 40000, 41000, 39500, 42000, 47000, 51000, 56000, 53000, 58000, 64000, 62000, 60000, 65000, 61000, 59000, 57000, 56000, 58000, 59000, 58000, 57000, 58500, 60000, 59500, 58000, 56000, 54000, 35000, 36500, 38000, 40000,
            41000, 39500, 42000, 47000, 51000, 56000, 53000, 58000, 64000, 62000, 60000, 65000, 61000, 59000, 57000, 56000, 58000, 59000, 58000, 57000, 58500, 60000, 59500, 58000, 56000, 54000,
        ];
        // Take only the needed data points based on days (limit to 30)
        const slicedData = baseData.slice(-Math.min(days, 30));
        return slicedData.map((price, index) => [Date.now() - (days - index) * 86400000, price]);
    };

    // Generate 60 volume data points
    const generateVolumeData = (days: number) => {
        // Always generate 60 volume data points regardless of the days parameter
        const volumePoints = 60;
        return Array(volumePoints)
            .fill(0)
            .map((_, index) => {
                const volume = Math.floor(Math.random() * 5000) + 1000;
                // We use the full time range but with more points
                return [Date.now() - (days - (index * days) / volumePoints) * 86400000, volume];
            });
    };

    // Map time frames to number of days
    const timeFrameToDays = {
        "1d": 1,
        "3d": 3,
        "1w": 7,
        "1m": 30,
        "6m": 180,
        "1y": 365,
        max: 52,
    };

    const timeRanges: TimeRange[] = ["1d", "3d", "1w", "1m", "6m", "1y", "max"];
    const [selectedRange, setSelectedRange] = useState<TimeRange>("1m");

    const currentDays = timeFrameToDays[selectedRange];
    const [priceData, setPriceData] = useState(generatePriceData(currentDays));
    const [volumeData, setVolumeData] = useState(generateVolumeData(currentDays));

    const currentPrice = priceData[priceData.length - 1][1];
    const latestPrice = priceData[priceData.length - 1][1];

    // Custom events for Highcharts
    const chartCallback = (chart: Highcharts.Chart) => {
        // Save reference to the chart object if needed
    };

    // Options for Highcharts
    const options: Highcharts.Options = {
        chart: {
            backgroundColor: "transparent",
            style: {
                overflow: "visible",
                fontSize: "18px",
                fontFamily: "Circular Std Book, sans-serif",
            },
            height: 300,
            width: 820,
            spacingBottom: 0,
            spacingTop: 0,
            marginLeft: -10,
            marginRight: -10,
            events: {
                load: function () {
                    // Chart is loaded
                },
            },
        },
        title: {
            text: "Cryptocurrency Price Chart",
            style: { fontSize: "0px" },
        },
        accessibility: {
            enabled: true,
            description: "Chart showing cryptocurrency price and volume data over time",
        },
        tooltip: {
            shared: false,
            backgroundColor: "#222",
            borderColor: "#E6E6E6",
            borderRadius: 4,
            borderWidth: 1,
            padding: 8,
            shadow: false,
            useHTML: true,
            headerFormat: "",
            pointFormatter: function () {
                if (this.series.name === "Price") {
                    return `<div style="color:#fff;">${Number(this.y!.toFixed(2)).toLocaleString()}</div>`;
                } else {
                    return "";
                }
            },
            style: {
                fontSize: "16px",
                zIndex: 1001,
            },
            // Add these properties for fixed horizontal position
            positioner: function (labelWidth, labelHeight, point) {
                const chartWidth = this.chart.chartWidth;
                const x = chartWidth - labelWidth + 48; // 20px from right edge
                const y = point.plotY;
                return { x: x, y: y };
            },
            // Prevents tooltip from following the mouse horizontally
            followPointer: false,
            // Makes tooltip follow pointer vertically only
            followTouchMove: false,
            // Keep the tooltip visible while hovering
            hideDelay: 100,
        },
        xAxis: {
            type: "datetime",
            lineColor: "#e6e6e6",
            lineWidth: 0,
            tickColor: "#e6e6e6",
            tickWidth: 0,
            labels: {
                enabled: false,
                style: {
                    color: "#888",
                },
            },
            crosshair: {
                color: "#888",
                dashStyle: "LongDash",
                width: 1,
                label: {
                    enabled: false,
                    backgroundColor: "#000",
                    padding: 5,
                    borderRadius: 3,
                    borderWidth: 1,
                    borderColor: "#888",
                    style: {
                        color: "#fff",
                        fontSize: "10px",
                    },
                },
            },
            accessibility: {
                description: "Time period",
            },
        },
        yAxis: [
            {
                title: {
                    text: "Price",
                    style: { color: "#888", visibility: "hidden" },
                },
                labels: {
                    enabled: false,
                    style: {
                        color: "#888",
                    },
                    align: "right",
                    x: -8,
                },
                gridLineColor: "#e6e6e6",
                gridLineWidth: 0,
                plotLines: [
                    {
                        value: latestPrice,
                        color: "#e6e6e6",
                        dashStyle: "LongDash",
                        width: 1,
                        label: {
                            text: Number(latestPrice.toFixed(2)).toLocaleString(),
                            align: "right",
                            useHTML: true,
                            x: 40,
                            y: -5,
                            style: {
                                color: "#fff",
                                backgroundColor: "#4B40EE",
                                fontSize: "16px",
                                padding: "8px",
                                borderRadius: "4px" as any,
                                zIndex: 1002,
                                pointerEvents: "none",
                            },
                        },
                    },
                ],
                crosshair: {
                    color: "#888",
                    width: 1,
                    dashStyle: "LongDash",
                    label: {
                        enabled: false,
                        backgroundColor: "#000",
                        padding: 5,
                        borderRadius: 3,
                        borderWidth: 1,
                        borderColor: "#888",
                        style: {
                            color: "#fff",
                            fontSize: "10px",
                        },
                    },
                },
                accessibility: {
                    description: "Price in USD",
                },
            },
            {
                // Volume bars y-axis
                title: {
                    text: "Volume",
                    style: { color: "#888", visibility: "hidden" },
                },
                labels: {
                    enabled: false,
                    style: {
                        color: "#888",
                    },
                    align: "right",
                    x: -8,
                },
                gridLineWidth: 0,
                top: "78%",
                height: "20%",
                offset: 0,
                lineWidth: 0,
                margin: 0,
                min: 0,
                accessibility: {
                    description: "Trading volume",
                },
            },
        ],
        legend: {
            enabled: false,
            itemStyle: {
                color: "#888",
            },
        },
        plotOptions: {
            area: {
                fillColor: {
                    linearGradient: {
                        x1: 0,
                        y1: 0,
                        x2: 0,
                        y2: 1,
                    },
                    stops: [
                        [0, "rgba(88, 80, 236, 0.1)"],
                        [1, "rgba(88, 80, 236, 0.0)"],
                    ],
                },
                lineColor: "rgb(88, 80, 236)",
                lineWidth: 2,
                states: {
                    hover: {
                        lineWidth: 2,
                    },
                },
                marker: {
                    enabled: false,
                    radius: 2,
                    fillColor: "#5850EC",
                    lineColor: "#FFFFFF",
                    lineWidth: 1,
                    states: {
                        hover: {
                            enabled: true,
                        },
                    },
                },
                threshold: null,
            },
            column: {
                borderWidth: 0,
                color: "#e0e0e0",
                groupPadding: 0.1,
                pointPadding: 0.1,
                states: {
                    hover: {
                        color: "#c0c0c0",
                    },
                },
            },
        },
        series: [
            {
                type: "area",
                name: "Price",
                data: priceData,
                color: "#5850EC",
                tooltip: {
                    valueDecimals: 2,
                    valuePrefix: "$",
                },
                zIndex: 1,
            },
            {
                type: "column",
                name: "Volume",
                data: volumeData,
                yAxis: 1,
                color: "rgba(224, 224, 224, 0.5)",
                zIndex: 0,
                pointWidth: 6,
            },
        ],
        credits: {
            enabled: false,
        },
    };

    // Function to handle time frame selection
    const handleTimeFrameChange = (range: TimeRange) => {
        setSelectedRange(range);
        const days = timeFrameToDays[range];
        setPriceData(generatePriceData(days));
        setVolumeData(generateVolumeData(days));
    };

    return (
        <div className="w-full" role="region" aria-label="Cryptocurrency price chart">
            <div className="flex justify-between items-center mb-4">
                <div className="flex gap-8 my-auto">
                    <button className="flex gap-2.5 items-center focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-opacity-50" aria-label="View chart in fullscreen mode">
                        <img src={FullscreenIcon} className="object-contain shrink-0 w-6 aspect-square" alt="" />
                        <span>Fullscreen</span>
                    </button>
                    <button className="flex gap-2.5 items-center focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-opacity-50" aria-label="Compare with other cryptocurrencies">
                        <img src={CompareIcon} className="object-contain shrink-0 w-6 aspect-square" alt="" />
                        <span>Compare</span>
                    </button>
                </div>

                <div className="flex items-center gap-1.5" role="radiogroup" aria-label="Chart time range">
                    {timeRanges.map((range) => (
                        <button
                            key={range}
                            className={`self-stretch cursor-pointer px-3.5 py-1.5 rounded-md ${selectedRange === range ? "text-white bg-indigo-600" : "text-zinc-500"} focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-opacity-50`}
                            onClick={() => handleTimeFrameChange(range)}
                            aria-pressed={selectedRange === range}
                            role="radio"
                            aria-checked={selectedRange === range}
                        >
                            {range}
                        </button>
                    ))}
                </div>
            </div>

            <div className="bg-white border-l border-r border-b border-gray-200 w-full">
                <HighchartsReact
                    highcharts={Highcharts}
                    options={options}
                    callback={chartCallback}
                    containerProps={{
                        style: { overflow: "visible !important" },
                    }}
                />
            </div>
        </div>
    );
};

export default CryptoChart;
