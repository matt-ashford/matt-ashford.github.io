import Typography from "@material-ui/core/Typography";
import * as d3 from "d3";
import { useEffect } from "react";

export const HomePage = () => {
  const svg = d3.select("#envelopeSvg");

  const lineStyles = {
    stroke: "black",
    strokeWidth: "3",
  };

  const envelopeXStart = "100";

  const envelopeWidth = `${parseInt(envelopeXStart) + 250}`;
  const envelopeHeight = "150";

  const midWayWidth = `${
    (parseInt(envelopeXStart) + parseInt(envelopeWidth)) / 2
  }`;

  //   useEffect(() => {
  //   infiniteAnimation();
  //   }, []);

  //   function infiniteAnimation() {
  //     while (true) {
  //       expandSpeedLine("speedLine1");
  //       setTimeout(() => {
  //         expandSpeedLine("speedLine2");
  //       }, 500);
  //     }
  //   }

  function expandSpeedLine(selectionId) {
    const startPoint = parseInt(envelopeXStart) - 10;
    d3.select(`#${selectionId}`)
      .attr("x2", startPoint)
      .attr("x1", startPoint)
      .transition()
      .duration(500)
      .attr("x2", startPoint)
      .attr("x1", 0);
  }

  return (
    <>
      <Typography variant="h2">Welcome</Typography>
      <Typography variant="h5">
        To the Postal Regulatory Commission's Service Performance Dashboard
      </Typography>
      <br />
      <br />
      <Typography variant="h6">What is Service Performance?</Typography>
      <Typography variant="body1">
        The Percentage of mailpieces that are delivered on time.
      </Typography>
      <br />
      <br />
      <div id="envelopeSvgContainer">
        {/* <svg id="envelopeSvg" width={500}>
          <line
            x1={envelopeXStart}
            y1="0"
            x2={envelopeXStart}
            y2={envelopeHeight}
            style={lineStyles}
            shapeRendering="crispEdges"
          />
          <line
            x1={envelopeXStart}
            y1={envelopeHeight}
            x2={envelopeWidth}
            y2={envelopeHeight}
            style={lineStyles}
            shapeRendering="crispEdges"
          />
          <line
            x1={envelopeXStart}
            y1="0"
            x2={envelopeWidth}
            y2="0"
            style={lineStyles}
            shapeRendering="crispEdges"
          />
          <line
            x1={envelopeWidth}
            y1="0"
            x2={envelopeWidth}
            y2={envelopeHeight}
            style={lineStyles}
            shapeRendering="crispEdges"
          />
          <line
            x1={envelopeXStart}
            y1="0"
            x2={midWayWidth}
            y2={envelopeHeight / 2}
            style={lineStyles}
            shapeRendering="crispEdges"
          />
          <line
            x1={envelopeWidth}
            y1="0"
            x2={midWayWidth}
            y2={envelopeHeight / 2}
            style={lineStyles}
            shapeRendering="crispEdges"
          />

          <line style={lineStyles} id="speedLine1"></line>
          <line id="speedLine2"></line>
        </svg> */}
      </div>
    </>
  );
};

export default HomePage;
