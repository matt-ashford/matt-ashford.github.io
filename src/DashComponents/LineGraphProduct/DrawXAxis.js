import * as d3 from "d3";

import {
  yScaleRev,
  marginLeft,
  marginTop,
  graphHeight,
  getInterBarMargin,
  graphWidth,
  topStart,
  marginRight,
  marginBottom,
} from "./LineGraphDimensions";

export const drawXAxis = ({ svgId, graphData, xPoz }) => {
  const xArray = createXAxisValuesArray(graphData);
  const interBarMargin = getInterBarMargin(xArray);

  let rotationDeg = 35;

  const x = d3
    .scaleBand()
    .domain(xArray)
    .range([0, graphWidth - marginRight - marginLeft]);

  d3.select(".domain").remove();

  const svg = d3.select(`#${svgId}`);

  svg
    .append("g")
    .attr("class", "axis")
    .attr(
      "transform",
      `translate(${marginLeft}, ${graphHeight - marginBottom - 10})`
    )
    .call(d3.axisBottom(x).tickSize(5).ticks())
    .selectAll("text")
    .attr("class", "xAxisText")
    .style("text-anchor", "start")
    .attr("dy", "1em")
    .attr("transform", "rotate(35)");

  //   d3.selectAll(".tick").style("opacity", 0.2);

  d3.selectAll(".tick")
    .selectAll("line")
    .style({ stroke: "red", fill: "none", "stroke-width": "1px" });

  //   d3.select(".domain").style("opacity", 0.2);
  d3.selectAll(".xAxisText").style("opacity", 1);
};

function createXAxisValuesArray(graphData) {
  console.log(graphData);
  const firstRow = graphData[0];
  let rezArray = [];
  if (!Object.keys(firstRow).includes("quarter")) {
    rezArray = graphData.map((row) => row.fy.toString());
  } else {
    rezArray = graphData.map((row) => {
      return `${row.fy}_Q${row.quarter}`;
      //   if (row.quarter === 1) {
      //     return `${row.fy}_Q${row.quarter}`;
      //   }
      //   return `Q${row.quarter}`;
    });
  }

  console.log(rezArray);

  return rezArray;
}
