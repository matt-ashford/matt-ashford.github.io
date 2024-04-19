import * as d3 from "d3";
import { pinkHighlight, greenGrey } from "../../Design/MyTheme";

export const drawCountBars = (countData, svgId) => {
  // console.log(JSON.stringify(countData));

  const margin = { top: 20, right: 30, bottom: 30, left: 40 };
  const width = 300 - margin.left - margin.right;
  const height = 200 - margin.top - margin.bottom;

  const rightPush = 17.5;

  const svg = d3
    .select(`#${svgId}`)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  const x = d3
    .scaleBand()
    .domain(countData.map((d) => d.fy))
    // .nice()
    .range([0, width]);

  // .padding(0.1);

  const y = d3
    .scaleLinear()
    .domain([0, d3.max(countData, (d) => d.missedCount + d.exceededCount)])
    .nice()
    .range([height, 0]);

  const color = d3
    .scaleOrdinal()
    .domain(["missedCount", "exceededCount"])
    // .range(["#ff6347", "#4682b4"]);
    .range([pinkHighlight, greenGrey]);

  svg
    .selectAll(".barCount")
    .data(countData)
    .join("g")
    .attr("class", "barCount")
    .attr("transform", (d) => `translate(${x(d.fy) + rightPush},0)`)
    .selectAll("rect")
    .data((d) => [
      { type: "missedCount", count: d.missedCount },
      { type: "exceededCount", count: d.exceededCount },
    ])
    .join("rect")
    .attr("fill", (d) => color(d.type))
    .attr("x", (d, i) => 0)
    .attr("y", (d, i, nodes) => {
      if (d.type === "missedCount") {
        return y(d.count);
      }
      const matchingMissedCount = nodes[i - 1];
      return y(matchingMissedCount.__data__.count) + y(d.count) - height;
    })
    .attr("width", 0)
    .attr("id", (d, i) => `countIs_${d.count}_${i}`)
    .attr("height", (d) => y(0) - y(d.count))
    .transition()
    .duration(500)
    .attr("width", 10);

  // Add y-axis
  svg
    .append("g")
    .attr("class", "y-axisCountBar")
    .call(d3.axisLeft(y).ticks(3).tickSize(6));

  d3.select(".y-axisCountBar")
    .style("opacity", 0.8)
    .style("font-size", "0.6rem");
  // d3.selectAll(".tick").style("opacity", 0.5);

  d3.select(".domain").remove();

  // Add x-axis
  svg
    .append("g")
    .attr("class", "x-axisCountBar")
    .attr("transform", `translate(0,${height + 6})`)
    .call(d3.axisBottom(x).tickSize(3))
    .style("opacity", 0.8);

  // d3.select(".domain").remove();
};

export default drawCountBars;
