import * as d3 from "d3";
import { useEffect, useState } from "react";
import annualData from "../Data/annualData.json";

import {
  marginBottom,
  barWidth,
  barMarginLeft,
} from "../Design/graphDimensions";

import {
  primaryColor,
  secondaryColor,
  pinkHighlight,
  textNodeFont,
} from "../Design/MyTheme";

export const HomePageLettersGraph = (props) => {
  const { propData } = props;
  const [letterData, setLetterData] = useState(propData);

  //   useEffect(() => {

  //   }, []);

  useEffect(() => {
    setLetterData(propData);
    drawBars();
  }, [propData]);

  function createLetterData() {
    return annualData.filter((row) => [3, 2].includes(row.productId));
  }

  const svg = d3.select("#homePageLetterSvg");

  const graphHeight = 300;
  const graphWidth = 500;

  const yScale = d3.scaleLinear().domain([0, 100]).range([0, graphHeight]);

  const data2020 = letterData.filter((row) => row.fy === 2020);
  const data2019 = letterData.filter((row) => row.fy === 2019);

  const topStart = graphHeight - marginBottom;

  const svgWidth = graphWidth;

  function getInterBarMargin(graphData) {
    const barCount = graphData.length;
    const interBarDist = svgWidth / barCount;

    return interBarDist;
  }

  const firstObs = data2019[1].pctOnTime;

  console.log("homePage ", yScale(firstObs));

  function drawBars() {
    const interBarMargin = getInterBarMargin(data2020);

    svg
      .selectAll(".bar2019Letter")
      .data(data2019)
      .enter()
      .append("rect")
      .attr("x", 100)
      .attr("y", 100)
      .attr("width", 50)
      .attr("height", firstObs)
      //   .attr("height", (d) => yScale(d.pctOnTime))
      .attr("fill", "black");

    //   .attr("x", (d, i) => i * interBarMargin + barMarginLeft)
    //   .attr("y", (d) => topStart - yScale(d.pctOnTime))
    //   .attr("width", barWidth)
    //   .attr("fill", secondaryColor)
    //   .attr("class", "graphicElementQuarter bar2019Quarter")
    //   .attr("height", (d) => yScale(d.pctOnTime))
    //   .attr("id", (d) => `homeLetter_${d.productId}_${d.fy}`);
  }

  function cleanBars() {
    d3.selectAll("rect").remove();
  }
  return (
    <div>
      i'm the graph container
      <svg id="homePageLetterSvg"></svg>
    </div>
  );
};

export default HomePageLettersGraph;
