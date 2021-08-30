import * as d3 from "d3";
import { useEffect } from "react";
import PieGraphKey from "./PieGraphKey";

import { primaryColor, highlightColor, lightGrey } from "../Design/MyTheme";

export const PieGraph = (props) => {
  const { propData } = props;

  // const [data, setData] = useState(propData);

  useEffect(() => {
    drawPie();
  });

  const dataSet = propData[0].dataSet;

  const svgId = `${dataSet}svg`;

  const svg = d3.select(`#${svgId}`);

  const svgHeight = 300;
  const svgWidth = 300;

  function drawPie() {
    const svg = d3.select(`#${svgId}`);

    const dataset = propData.map((row) => row.value);

    const outerRadius = svgWidth / 2;
    const innerRadius = svgWidth / 3;
    const arc = d3.arc().innerRadius(innerRadius).outerRadius(outerRadius);

    const pie = d3.pie();

    const colorList = [primaryColor, highlightColor, lightGrey];

    //Set up groups
    const arcs = svg
      .selectAll("g.arc")
      .data(pie(dataset))
      .enter()
      .append("g")
      .attr("class", "arc")
      .attr("transform", "translate(" + outerRadius + "," + outerRadius + ")");

    //Draw arc paths
    arcs
      .append("path")
      .attr("fill", function (d, i) {
        return colorList[i];
      })
      .attr("d", arc);

    //Labels
    arcs
      .append("text")
      .attr("transform", function (d) {
        return "translate(" + arc.centroid(d) + ")";
      })
      .attr("text-anchor", "middle")
      .text(function (d) {
        return d.value;
      });
  }
  const colorObj = {
    primaryColor: primaryColor,
    highlightColor: highlightColor,
    lightGrey: lightGrey,
  };
  return (
    <>
      <div style={{ paddingRight: "28%" }}>
        <h4 style={{ marginBottom: "1rem", marginTop: "-1%" }}>
          FY2020 Mail Product Count
        </h4>
        <svg width={svgWidth} height={svgHeight} id={svgId}></svg>
        <PieGraphKey colorObj={colorObj} />
      </div>
    </>
  );
};
export default PieGraph;
