import { useEffect, useState } from "react";
import * as d3 from "d3";

export const ProductCountBar = (props) => {
  const { totalProductCount, thisCount, dataType } = props;

  const [countPctState, setCountPctState] = useState(0);

  useEffect(() => {
    setCountPctState(thisCount / totalProductCount);
    removeBars();
    drawBar();
  }, [thisCount, totalProductCount, countPctState]);

  useEffect(() => {
    removeBars();
    drawBar();
  }, []);

  useEffect(() => {
    removeBars();
    drawBar();
  });

  const svgId = `${dataType}_svg`;
  const barId = `${dataType}_bar`;
  const otherBarId = `${dataType}_otherBar`;

  const svgSelection = d3.select(`#${svgId}`);

  const barHeight = 10;

  const svgWidth = 300;
  const svgHeight = barHeight + 20;

  // const countPctState = thisCount / totalProductCount;

  const countPercentageDiff = 1 - countPctState;

  const xScale = d3.scaleLinear().domain([0, 1]).range([0, svgWidth]);

  const fakeData = [{ value: countPctState }];

  drawBar();

  function drawBar() {
    svgSelection
      .selectAll(`#${otherBarId}`)
      .data(fakeData)
      .enter()
      .append("rect")
      .attr("x", xScale(countPctState))
      .attr("y", 15)
      .attr("height", 15)
      .attr("width", (d) => xScale(countPercentageDiff))
      .attr("fill", "hsla(239, 100%, 100%, 0.55)")
      .attr("class", "countTableBar")
      .attr("id", otherBarId);

    svgSelection
      .selectAll(`#${barId}`)
      .data(fakeData)
      .enter()
      .append("rect")
      .attr("x", 0)
      .attr("y", 15)
      .attr("height", 15)
      .attr("width", (d) => xScale(countPctState))
      .attr("fill", "white")
      .attr("class", "countTableBar")
      .attr("id", barId);
  }

  function removeBars() {
    svgSelection.selectAll(".countTableBar").remove();
  }
  return (
    <div
      style={{
        paddingBottom: "5px",
      }}
    >
      <svg fill="black" id={svgId} height={svgHeight} width={svgWidth}></svg>
    </div>
  );
};

export default ProductCountBar;
