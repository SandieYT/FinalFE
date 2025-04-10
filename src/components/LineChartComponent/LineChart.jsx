import React from "react";
import { Chart } from "react-google-charts";

export default function LineChart({ historicalData }) {
  const [priceData, setPriceData] = React.useState([["Date", "Price"]]);

  React.useEffect(() => {
    let dataCopy = [["Date", "Price"]];
    if (historicalData?.prices) {
      historicalData.prices.forEach((item) => {
        dataCopy.push([
          `${new Date(item[0]).toLocaleDateString().slice(0, -5)}`,
          item[1],
        ]);
      });
      setPriceData(dataCopy);
    }
  }, [historicalData]);

  return <Chart chartType="Line" data={priceData} height="100%" />;
}
