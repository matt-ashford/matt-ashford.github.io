import * as d3 from "d3";
import { useEffect } from "react";
import PieGraphKey from "./PieGraphKey";

import { pinkHighlight, greenGrey } from "../Design/MyTheme";

export const PieGraph = (props) => {
  const { countData, selectedYear } = props;

  useEffect(() => {
    drawPie();
  }, []);
  useEffect(() => {
    drawPie();
  }, [countData]);

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

    const colorList = [pinkHighlight, greenGrey];

    let g = svg.append("g").attr("transform", "translate(150,150)");

    const pie = d3.pie();

    var arcs = g.selectAll("arc").data(pie(pieData)).enter().append("g");

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
        <div style={{ width: "30rem" }}>
          <h3 style={{ marginBottom: "1rem", marginTop: "5%" }}>
            FY{selectedYear} Mail Product Component Count
          </h3>
        </div>
        <svg width={svgWidth} height={svgHeight} id={svgId}></svg>
        <PieGraphKey colorObj={colorObj} />
      </div>
    </>
  );
};
export default PieGraph;
