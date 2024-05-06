import * as d3 from "d3";
import { textNodeFont } from "../../Design/MyTheme";

export const drawYaxisText = (svgId) => {
  d3.select(`#${svgId}`)
    .append("text")
    .text("% On-Time")
    .attr("x", 190)
    .attr("y", 20)
    .style("text-anchor", "middle")
    .attr("transform", "translate(-5,315) rotate(270)")
    // .attr("font-family", textNodeFont)
    .attr("font-size", "0.9rem")
    .attr("class", "graphicElement");
};
