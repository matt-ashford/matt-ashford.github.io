import * as d3 from "d3";

export const drawAxisLabels = (countData, svgId) => {
  const axisTextSize = "0.8rem";
  d3.select(`#${svgId}`)
    .append("text")
    .text("count")
    .attr("x", 230)
    .attr("y", 16)
    .style("text-anchor", "middle")
    .attr("transform", "translate(-5,315) rotate(270)")
    .attr("font-size", axisTextSize)
    .attr("class", "axisLabel");

  d3.select(`#${svgId}`)
    .append("text")
    .text("Fiscal Year")
    .attr("x", 150)
    .attr("y", 205)
    .style("text-anchor", "middle")
    .attr("font-size", axisTextSize)
    .attr("class", "axisLabel");

  return "asdfs";
};
export default drawAxisLabels;
