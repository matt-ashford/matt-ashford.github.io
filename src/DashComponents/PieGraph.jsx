import * as d3 from "d3";
import { useEffect } from "react";
import PieGraphKey from "./PieGraphKey";

import { pinkHighlight, greenGrey } from "../Design/MyTheme";

export const PieGraph = (props) => {
  const { countData, propData } = props;

  useEffect(() => {
    drawPie();
  });

  const dataName = "pieGraph";

  const svgId = `${dataName}svg`;

  const svg = d3.select(`#${svgId}`);

  const svgHeight = 300;
  const svgWidth = 300;

  function drawPie() {
    const svg = d3.select(`#${svgId}`);

    let grandTotalRow = countData.filter(
      (row) => row.mailClass === "Grand Total"
    );

    grandTotalRow = grandTotalRow[0];

    const missedCount = grandTotalRow.productsMissedTarget;

    const exceededCount = grandTotalRow.totalProducts - missedCount;

    const pieData = [missedCount, exceededCount];

    const outerRadius = svgWidth / 2;
    const innerRadius = svgWidth / 3;
    const arc = d3.arc().innerRadius(innerRadius).outerRadius(outerRadius);
    // const arc = d3.arc().innerRadius(20).outerRadius(100);

    const colorList = [pinkHighlight, greenGrey];

    let g = svg.append("g").attr("transform", "translate(150,150)");

    // Creating Pie generator
    const pie = d3.pie();

    // Creating arc
    // var arc = d3.arc().innerRadius(0).outerRadius(100);

    // Grouping different arcs
    var arcs = g.selectAll("arc").data(pie(pieData)).enter().append("g");

    // Appending path
    arcs
      .append("path")
      .attr("fill", (data, i) => {
        return colorList[i];
      })
      .attr("d", arc);
  }

  const colorObj = {
    pinkHighlight: pinkHighlight,
    greenGrey: greenGrey,
  };
  return (
    <>
      <div style={{ paddingRight: "28%" }}>
        <h3 style={{ marginBottom: "1rem", marginTop: "5%" }}>
          FY2020 Mail Product Component Count
        </h3>
        <svg width={svgWidth} height={svgHeight} id={svgId}></svg>
        <PieGraphKey colorObj={colorObj} />
      </div>
    </>
  );
};
export default PieGraph;

//   //Set up groups
//   const arcs = svg
//   .selectAll("g.arc")
//   .data(pie(propData))
//   // .data(pie(pieData))
//   .enter()
//   .append("g")
//   .attr("class", "arc")
//   .attr("transform", "translate(" + outerRadius + "," + outerRadius + ")");

// //Draw arc paths
// arcs
//   .append("path")
//   .attr("fill", function (d, i) {
//     return colorList[i];
//   })
//   .attr("d", arc);

// //Labels
// arcs
//   .append("text")
//   .attr("transform", function (d) {
//     return "translate(" + arc.centroid(d) + ")";
//   })
//   .attr("text-anchor", "middle")
//   .text(function (d) {
//     return d.value;
//   });
