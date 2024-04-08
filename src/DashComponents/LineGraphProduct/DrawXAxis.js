import * as d3 from "d3";

import {
  yScaleRev,
  marginLeft,
  marginTop,
  graphHeight,
  getInterBarMargin,
  topStart,
} from "./LineGraphDimensions";

export const drawXAxis = ({ svgId, graphData, xPoz }) => {
  const xArray = createXAxisValuesArray(graphData);
  const interBarMargin = getInterBarMargin(xArray);

  console.log(xArray);

  let rotationDeg = 35;

  //   d3.select(`#${svgId}`)
  //     .append("g")
  //     .selectAll(".xAxisText")
  //     .data(xArray)
  //     .enter()
  //     .append("text")
  //     .attr("class", "xAxisText")
  //     .attr("x", (d, i) => xPoz(i, graphData))
  //     .attr("y", graphHeight - marginTop)
  //     .text((d) => d)
  //     .attr("font-size", "0.75em");
  const x = d3.scaleBand().domain(xArray).range([0, 500]);

  d3.select(".domain").remove();

  const svg = d3.select(`#${svgId}`);

  //   svg
  //     .append("g")
  //     .attr("class", "xAxisText")
  //     .attr("transform", "translate(50," + graphHeight - 50 + ")")
  //     .call(d3.axisBottom(x).ticks(10))
  //     // .selectAll(".xAxisText")
  //     .selectAll("text")
  //     .style("text-anchor", "start")
  //     .transform("rotate(20)");

  svg
    .append("g")
    .attr("class", "axis")
    // .attr("transform", "translate(0," + graphHeight - 400 + ")")
    .attr("transform", `translate(0, ${graphHeight}`)
    .call(d3.axisBottom(x))
    .selectAll("text")
    .style("text-anchor", "start")
    // .attr("dx", "-.8em")
    .attr("dy", "1em")
    .attr("transform", "rotate(35)");

  //     .data(xArray)
  //     .enter()
  //     .selectAll("text")
  //     .style("text-anchor", "end")
  //     .attr("dx", "-.8em")
  //     .attr("dy", ".15em")
  //     .attr("transform", "rotate(-65)")
  //     .append("text");

  // .attr("text-anchor", "start")
  // .attr("dx", "-.8em")
  // .attr("dy", ".15em")
  // .attr("transform", "rotate(35)");

  // .attr("transform", function (d, i) {
  //   const rotateString = `rotate(${rotationDeg})`;
  //   const yTransConstant = -50;
  //   const translateY = xPoz(i, graphData);
  //   const translateX = 0;

  //   const translateString = `translate(${translateX}, ${translateY})`;
  //   const finalStr = `${translateString}${rotateString}`;
  //   return finalStr;
  // });

  // const translateX = i * interBarMargin + 85;
  // const translateY = topStart + 15;
  // .attr("dy", (d, i) => i * -99);

  // .attr("transform", function (d, i) {

  //   let translateY = i * interBarMargin * -1.1;
  //   //   let translateY = i * xPoz(i, graphData);
  //   let translateX = 0;
  //   return `translate(${translateX},${translateY}) rotate(${rotationDeg})`;
  // })

  // .attr("dx", "-.8em")
  // .attr("transform", "rotate(-65)");

  // i * interBarMargin + 85
  // i * interBarMargin + 85
  //   },${topStart})rotate(${rotationDeg})`;
  // .attr("dx", () => {
  //   return "-.9em";
  // })
  // .attr("dy", () => {
  //   return ".3em";
  // });

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
      return `${row.fy}_Q${row.quarter}`;
    });
  }

  console.log(rezArray);

  return rezArray;
}
