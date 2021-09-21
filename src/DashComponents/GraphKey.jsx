import * as d3 from "d3";

import {
  primaryColor,
  secondaryColor,
  highlightColor,
  pinkHighlight,
  textNodeFont,
} from "../Design/MyTheme";

export const GraphKey = (props) => {
  const { bar2019, bar2020, level } = props;

  const id2019 = `key2019${level}`;
  const id2020 = `key2020${level}`;

  d3.select(`#${id2019}`)
    .on("mouseover", function () {
      d3.selectAll(bar2020).transition().duration(200).style("opacity", 0.2);
    })
    .on("mouseout", function () {
      d3.selectAll(bar2020).transition().duration(200).style("opacity", 1);
    })
    .on("click", () => console.log("clicked"));

  d3.select(`#${id2020}`)
    .on("mouseover", function () {
      d3.selectAll(bar2019).transition().duration(200).style("opacity", 0.2);
    })
    .on("mouseout", function () {
      d3.selectAll(bar2019).transition().duration(200).style("opacity", 1);
    });

  return (
    <svg height={35}>
      <rect
        fill={secondaryColor}
        x={20}
        y={20}
        width={15}
        height={15}
        id={id2019}
      ></rect>
      <text x={39} y={30} fontFamily={textNodeFont}>
        FY2019
      </text>

      <rect
        fill={primaryColor}
        x={100}
        y={20}
        width={15}
        height={15}
        id={id2020}
      ></rect>
      <text x={120} y={30} fontFamily={textNodeFont}>
        {" "}
        FY2020
      </text>
      <line
        x1={190}
        y1={25}
        x2={215}
        y2={25}
        strokeWidth={2}
        // stroke={highlightColor}
        stroke={pinkHighlight}
        className="targetLines"
      />

      <text x={220} y={30} fontFamily={textNodeFont}>
        Target
      </text>
    </svg>
  );
};

export default GraphKey;
