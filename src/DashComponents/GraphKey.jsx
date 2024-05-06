import * as d3 from "d3";

import {
  primaryColor,
  secondaryColor,
  pinkHighlight,
  textNodeFont,
} from "../Design/MyTheme";

export const GraphKey = (props) => {
  const { oldBars, newBars, level, selectedYear } = props;

  const oldSelector = `keyOld${level}`;
  const newSelector = `keyNew${level}`;

  // console.log(newBars);

  d3.select(`.${oldSelector}`)
    .on("mouseover", function () {
      d3.selectAll(newBars).transition().duration(200).style("opacity", 0.2);
    })
    .on("mouseout", function () {
      d3.selectAll(newBars).transition().duration(200).style("opacity", 1);
    })
    .on("click", () => console.log("clicked"));

  d3.select(`.${newSelector}`)
    .on("mouseover", function () {
      d3.selectAll(oldBars).transition().duration(200).style("opacity", 0.2);
    })
    .on("mouseout", function () {
      d3.selectAll(oldBars).transition().duration(200).style("opacity", 1);
    });

  const newYearText = `FY ${selectedYear} Score`;
  const oldYearText = `FY ${selectedYear - 1} Score`;
  const targetText = `Target FY ${selectedYear}`;

  const marginTopText = 20;
  const marginTopSquare = 17;

  const oldYearStartX = 1;
  const yearTextMargin = 140;
  const squareMargin = 20;
  const squareWidth = 17;

  const oldYearTextStart = oldYearStartX + squareMargin;
  const newSquareStartX = oldYearStartX + yearTextMargin;
  const newTextStartX = newSquareStartX + squareMargin;
  const targetMargin = 120;
  const targetLineStart = newTextStartX + targetMargin;
  const lineWidth = 25;
  const lineMargin = 5;
  const targetLineEnd = targetLineStart + lineWidth;
  const targetTextStart = targetLineEnd + lineMargin;
  // const targetTextStart = targetLineEnd;

  return (
    <div
      style={{
        "margin-left": "12rem",
      }}
    >
      <svg height={35} width={450}>
        <rect
          fill={secondaryColor}
          x={oldYearStartX}
          y={marginTopSquare}
          width={squareWidth}
          height={squareWidth}
          className={oldSelector}
        ></rect>
        <text
          className={oldSelector}
          x={oldYearTextStart}
          y={30}
          fontFamily={textNodeFont}
        >
          {oldYearText}
        </text>

        <rect
          fill={primaryColor}
          x={newSquareStartX}
          y={marginTopSquare}
          width={squareWidth}
          height={squareWidth}
          className={newSelector}
        ></rect>
        <text
          x={newTextStartX}
          y={30}
          fontFamily={textNodeFont}
          className={newSelector}
        >
          {newYearText}
        </text>
        <line
          x1={targetLineStart}
          y1={25}
          x2={targetLineEnd}
          y2={25}
          strokeWidth={2}
          // stroke={highlightColor}
          stroke={pinkHighlight}
          className="targetLines"
        />

        <text x={targetTextStart} y={30} fontFamily={textNodeFont}>
          {targetText}
        </text>
      </svg>
    </div>
  );
};

export default GraphKey;
