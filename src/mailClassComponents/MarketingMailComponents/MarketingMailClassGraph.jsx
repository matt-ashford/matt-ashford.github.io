import * as d3 from "d3";
import { useEffect, useState } from "react";
import GraphKey from "../../DashComponents/GraphKey";
import {
  primaryColor,
  secondaryColor,
  highlightColor,
  textNodeFont,
  lightGrey,
} from "../../Design/MyTheme";

import {
  marginBottom,
  graphHeight,
  barWidth,
  marginLeft,
  barMarginLeft,
  marginTop,
  yScale,
  yScaleRev,
} from "../../Design/graphDimensions";

export const MarketingMailClassGraph = (props) => {
  const { propData } = props;

  const [data, setData] = useState({});

  useEffect(() => {
    setData(propData);
    barFunctions();
  }, []);

  useEffect(() => {
    barFunctions();
  }, [data, propData]);

  const topStart = graphHeight - marginBottom;

  const svgWidth = 850;

  const svg = d3.select("#mmClassSvg");

  function barFunctions() {
    removeBars();
    if (data.length > 1) {
      removeBars();
      drawBars();
    }
  }

  function getInterBarMargin(graphData) {
    const barCount = graphData.length;
    const interBarDist = svgWidth / barCount;

    return interBarDist;
  }

  function drawBars() {
    const dataProducts = data.filter((row) => row.productAbbrev !== "missing");

    const data2020 = dataProducts.filter((row) => row.fy === 2020);
    const data2019 = dataProducts.filter((row) => row.fy === 2019);

    const interBarMargin = getInterBarMargin(data2020);

    svg
      .selectAll(".productNameText")
      .data(data2020)
      .enter()
      .append("text")
      .attr("x", (d, i) => i * interBarMargin + 75)
      .attr("y", topStart + 15)
      .text((d) => d.productAbbrev)
      .attr("text-anchor", "middle")
      .attr("class", "graphicElement nameBox nonBar")
      .attr("font-family", textNodeFont)
      .attr("id", (d, i) => `${i}`)
      .on("mouseover", function () {
        const idCount = this.id;
        const parentBox = `nameBox_${idCount}`;
        d3.select(`#${parentBox}`).attr("fill", lightGrey);
      });

    svg
      .append("g")
      .call(d3.axisLeft(yScaleRev).tickSize(-svgWidth).ticks(5))
      .attr("transform", `translate(${marginLeft},${marginTop})`)
      .attr("class", "graphicElement axisTicks nonBar");

    d3.select(".domain").remove();
    d3.selectAll(".axisTicks").selectAll("text").style("opacity", 1);
    d3.selectAll("line").style("opacity", 0.3);

    d3.selectAll(".targetLines").style("opacity", 1);

    svg
      .selectAll(".bar2019")
      .data(data2019)
      .enter()
      .append("rect")
      .attr("x", (d, i) => i * interBarMargin + barMarginLeft)
      .attr("y", (d) => topStart - yScale(d.pctOnTime))
      .attr("height", (d) => yScale(d.pctOnTime))
      .attr("width", barWidth)
      .attr("fill", primaryColor)
      .attr("class", "graphicElement bar2019")
      .attr("id", (d) => `${d.pctOnTime}% on Time`);

    svg
      .selectAll(".bar2020")
      .data(data2020)
      .enter()
      .append("rect")
      .attr("x", (d, i) => i * interBarMargin + barWidth + barMarginLeft - 7)
      .attr("y", (d) => topStart - yScale(d.pctOnTime))
      .attr("height", (d) => yScale(d.pctOnTime))
      .attr("width", barWidth)
      .attr("fill", secondaryColor)
      .attr("class", "graphicElement bar2020")
      .on("mouseover", function (event) {
        // const thisBar = d3.select(this)._groups[0][0].id;
        // const thisBar = d3.select(this)._groups[0][0];
        // const thisBar = d3.select(this);
        // toolTipMotion(event);
      });

    svg
      .selectAll(".targetLines")
      .data(data2020)
      .enter()
      .append("line")
      .attr("x1", (d, i) => i * interBarMargin + marginLeft)
      .attr("y1", (d) => topStart - yScale(d.target))
      .attr("x2", (d, i) => i * interBarMargin + barWidth * 2 + barMarginLeft)
      .attr("y2", (d) => topStart - yScale(d.target))
      .style("stroke", highlightColor)
      .style("stroke-width", 2)
      .attr("class", "graphicElement targetLines nonBar");

    svg
      .append("text")
      .text("On-Time (%)")
      .attr("x", 190)
      .attr("y", 20)
      .style("text-anchor", "middle")
      .attr("transform", "translate(-5,315) rotate(270)")
      .attr("font-family", textNodeFont)
      .attr("class", "graphicElement");
  }

  function removeBars() {
    d3.selectAll(".graphicElement").remove();
  }

  return (
    <div>
      <h3 fontFamily={textNodeFont}>Marketing Mail Products</h3>
      <svg
        shapeRendering="crispEdges"
        id="mmClassSvg"
        height={300}
        width={850}
      ></svg>
      <GraphKey
        level={"classLevel"}
        bar2019={".bar2019"}
        bar2020={".bar2020"}
      />
      {/* <Tooltip toolTipData={toolTipData} /> */}
    </div>
  );
};

export default MarketingMailClassGraph;
