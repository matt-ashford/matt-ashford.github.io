import * as d3 from "d3";
import { useEffect } from "react";

import {
  primaryColor,
  secondaryColor,
  highlightColor,
} from "../Design/MyTheme";

import {
  svgWidth,
  svgHeight,
  marginLeft,
  marginRight,
} from "../Design/graphDimensionsSide";

export const BarGraphSide = (props) => {
  const { propData } = props;

  useEffect(() => {
    drawBars();
    raiseTargets();
  });

  let rawData = propData[0];

  let mailClass = rawData.ProductNameAbbrev.split(" ")[0];

  if (mailClass === "First") {
    mailClass = "FC";
  }

  const svgId = `barSide${mailClass}svg`;

  function raiseTargets() {
    d3.selectAll(`.${mailClass}target`).raise();
  }

  const barMarginTop = 10;
  const interBarMargin = 15;
  const barHeight = 25;

  const colorSeq = [primaryColor, secondaryColor];

  const xScale = d3
    .scaleLinear()
    .domain([0, 100])
    .range([marginLeft, svgWidth - marginRight]);

  function drawBars() {
    const svg = d3.select(`#${svgId}`);

    const barData = [
      { year: 2019, value: rawData.Result2019 },

      { year: 2020, value: rawData.Result2020 },
    ];

    svg
      .selectAll(`.${mailClass}bars`)
      .data(barData)
      .enter()
      .append("rect")
      .attr("x", marginLeft)
      .attr("y", (d, i) => i * interBarMargin)
      .attr("height", barHeight)
      .attr("width", (d) => xScale(d.value))
      .attr("class", `${mailClass}bars`)
      .attr("fill", (d, i) => colorSeq[i])
      .attr("id", (d) => `${mailClass}${d.year}`);

    // const lineData = [{ value: rawData.Target }];
    const lineData = [rawData.Target];

    svg
      .selectAll(`.${mailClass}target`)
      // .data(barData)
      .data(lineData)
      .enter()
      .append("line")
      // .attr("x1", (d) => xScale(lineData.value))
      .attr("x1", (d) => xScale(d))
      .attr("y1", barMarginTop - barHeight)
      // .attr("x2", (d) => xScale(lineData.value))
      .attr("x2", (d) => xScale(d))
      .attr("y2", barMarginTop + barHeight + 10)
      .style("stroke", highlightColor)
      .style("stroke-width", 2)
      .attr("class", `${mailClass}target`);
  }

  return (
    <div>
      <svg id={svgId} height={svgHeight} width={svgWidth}></svg>
    </div>
  );
};

export default BarGraphSide;
