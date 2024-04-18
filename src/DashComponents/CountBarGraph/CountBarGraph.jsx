import { useEffect, useState } from "react";
import { countBarDataPrep } from "./countBarDataPrep";
import { drawCountBars } from "./DrawCountBars";
import * as d3 from "d3";

export const CountBarGraph = (props) => {
  const { propData } = props;

  useEffect(() => {
    removeBars();
    // drawCountBars(countData, svgId);
  }, []);

  useEffect(() => {
    removeBars();
    drawCountBars(countData, svgId);
  }, [propData]);

  const svgId = "countBarsSvg";

  function removeBars() {
    d3.selectAll(".barCount").remove();
    d3.selectAll(".x-axisCountBar").remove();
    d3.selectAll(".y-axisCountBar").remove();
  }

  let countData = countBarDataPrep(propData);

  return (
    <>
      <div>
        <svg id={`${svgId}`} height="500"></svg>
        {/* {JSON.stringify(countData)} */}
      </div>
    </>
  );
};

export default CountBarGraph;

//   d3.select(`#${svgId}`)
//     .selectAll(".countBars")
//     .data(countData)
//     .enter()
//     .append("rect")
//     .attr("x", (d, i) => i * 20)
//     .attr("width", 10)
//     .attr("height", 50)
//     .attr("class", "countBars");
