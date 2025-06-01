import React, { useState, useEffect } from "react";
import { Chart } from "react-google-charts";
import "./graph.css";

export default function Graph({ historicalData }) {
  const [chartData, setChartData] = useState([
    [
      "Date",
      "Low",
      "Open",
      "Close",
      "High",
      { type: "string", role: "tooltip", p: { html: true } },
    ],
  ]);

  useEffect(() => {
    if (historicalData) {
      const formattedData = historicalData.map((item) => [
        new Date(item[0]).toLocaleDateString(),
        item[3], // Low
        item[1], // Open
        item[4], // Close
        item[2], // High
        `
          <div class="custom-tooltip">
            <strong>Date:</strong> ${new Date(
              item[0]
            ).toLocaleDateString()}<br/>
            <strong>Open:</strong> ${item[1]}<br/>
            <strong>High:</strong> ${item[2]}<br/>
            <strong>Low:</strong> ${item[3]}<br/>
            <strong>Close:</strong> ${item[4]}
          </div>
        `,
      ]);
      setChartData([    [
      "Date",
      "Low",
      "Open",
      "Close",
      "High",
      { type: "string", role: "tooltip", p: { html: true } },
    ],
    ...formattedData]);
    }
  }, [historicalData]);

  const options = {
    legend: "none",
    tooltip: { isHtml: true },
    candlestick: {
      risingColor: { stroke: "#59ff88", fill: "#59ff88" },
      fallingColor: { stroke: "#ff1c46", fill: "#ff1c46" },
    },
    chartArea: { width: "90%", height: "70%" },
    bar: { groupWidth: "80%" },
    hAxis: {
      textStyle: { fontSize: 14 },
    },
    vAxis: {
      textStyle: { fontSize: 14 },
      gridlines: { color: "#eee", count: 10 },
      minorGridlines: { color: "#f0f0f0" },
    },
  };

  const handleMouseOver = ({ event }) => {
    const tooltip = document.querySelector(".google-visualization-tooltip");
    if (tooltip) {
      tooltip.style.top = `${event.clientY - 120}px`;
      tooltip.style.left = `${event.clientX - 10}px`;
    }
  };

  return (
    <Chart
      chartType="CandlestickChart"
      width="100%"
      height="400px"
      data={chartData}
      options={options}
      chartEvents={[
        {
          eventName: "onmouseover",
          callback: handleMouseOver,
        },
      ]}
    />
  );
}
