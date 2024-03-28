import * as d3 from "d3";

import { yScale } from "../../Design/graphDimensions";
import { textNodeFont } from "../../Design/MyTheme";

export const drawProductNames = ({
  svgId,
  propData,
  rotateProductNames,
  selectedYear,
  getInterBarMargin,
  topStart,
  extraBarMargin,
  mouseOverTriggersProductText,
  mouseOutTriggersProductText,
}) => {
  const dataNew = propData.filter((row) => row.fy === selectedYear);
  const interBarMargin = getInterBarMargin(dataNew);

  const namesArray = propData.map((row) =>
    row.product_abbrev === null ? row.product : row.product_abbrev
  );

  console.log(namesArray);

  d3.select(`#${svgId}`)
    .selectAll(".productNameText")
    .data(namesArray)
    .enter()
    .append("text")
    .text((d) => d)
    .attr("text-anchor", () => {
      if (rotateProductNames) {
        return "start";
      }
      return "middle";
    })
    // .attr("class", "productNameText graphicElement nameBox nonBar")
    .attr("class", "productNameText")
    .attr("font-family", textNodeFont)
    .attr("id", (d, i) => `nameTextid_${d.productId}`)
    .attr("transform", function (d, i) {
      let rotationDeg = 0;

      if (rotateProductNames) {
        rotationDeg = 25;
      }

      return `translate(${
        i * interBarMargin + 85 + extraBarMargin
      },${topStart + 15})rotate(${rotationDeg})`;
    })
    .attr("dx", () => {
      if (rotateProductNames) {
        return "-.9em";
      } else {
        return ".3em";
      }
    })
    .attr("dy", () => {
      if (rotateProductNames) {
        return ".3em";
      } else {
        return ".2em";
      }
    })
    .on("mouseover", function () {
      const currentTextSelection = d3.select(this);
      mouseOverTriggersProductText(currentTextSelection);
    })
    .on("mouseout", function () {
      mouseOutTriggersProductText();
    });
};
