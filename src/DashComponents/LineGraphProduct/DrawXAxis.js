import * as d3 from "d3";

import { yScaleRev, marginLeft, marginTop } from "./LineGraphDimensions";

export const drawXAxis = ({ svgId, graphData }) => {
  const xArray = createXAxisValuesArray(graphData);

  const xScale = d3.scaleOrdinal().domain(xArray).range([0, 600]);

  d3.select(`#${svgId}`)
    .append("g")
    .call(d3.axisBottom(xScale).tickSize(-5).ticks(5));

  //   d3.select(`#${svgId}`)
  //     .append("g")
  //     .call(d3.axisBottom(xScale).tickSize(-5).ticks(5))
  //     // .attr("transform", `translate(${marginLeft},${marginTop})`)
  //     .attr("transform", `translate(-50,200)`)
  //     .attr("class", "lineGraphYAxis");
  //   d3.select(".domain").remove();
  //   d3.selectAll(".lineGraphYAxis").selectAll("text").style("opacity", 1);
};

function createXAxisValuesArray(graphData) {
  console.log(graphData);
  const firstRow = graphData[0];
  let rezArray = [];
  if (!Object.keys(firstRow).includes("quarter")) {
    rezArray = graphData.map((row) => row.fy.toString());
  } else {
    rezArray = graphData.map((row) => {
      if (row.quarter == 1) {
        return `${row.fy}_Q${row.quarter}`;
      } else {
        return `Q${row.quarter}`;
      }
    });
  }

  console.log(rezArray);

  return rezArray;
}
