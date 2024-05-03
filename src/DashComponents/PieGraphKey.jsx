import { textNodeFont } from "../Design/MyTheme";

const PieGraphKey = (props) => {
  const { colorObj } = props;

  // const { primaryColor, highlightColor, lightGrey } = colorObj;

  const { pinkHighlight, greenGrey } = colorObj;

  const gridMargin = 20;
  const gridStart = 20;

  function cellLocation(cell) {
    return gridMargin * cell;
  }
  const textMargin = 12;

  return (
    <div
      style={{ paddingLeft: "25%", marginBottom: "10%", marginLeft: "-25%" }}
    >
      <svg height={100} width={400}>
        <rect
          fill={pinkHighlight}
          x={gridStart}
          y={cellLocation(2)}
          width={15}
          height={15}
          id="key2020"
        ></rect>
        <text
          x={cellLocation(1) + gridMargin}
          y={cellLocation(2) + textMargin}
          fontFamily={textNodeFont}
        >
          Products Components that Missed Target
        </text>

        <rect
          fill={greenGrey}
          x={gridStart}
          y={gridStart}
          width={15}
          height={15}
          id="keyMissed"
        ></rect>
        <text
          x={cellLocation(1) + gridMargin}
          y={gridStart + textMargin}
          fontFamily={textNodeFont}
        >
          Products Components that Exceeded Target
        </text>
      </svg>
    </div>
  );
};

export default PieGraphKey;
