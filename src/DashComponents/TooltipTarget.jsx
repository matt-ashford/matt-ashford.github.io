import * as d3 from "d3";
import { useEffect, useState } from "react";

export const TooltipTarget = (props) => {
  const { propData, isHoveringTarget, hoverTargetId, tooltipId } = props;

  if (!isHoveringTarget) {
    return <div></div>;
  }

  const hoveredProductId = parseInt(hoverTargetId.split("_")[1]);

  const hoveredProductTargetRow = propData
    .filter((row) => row.productId === hoveredProductId)
    .filter((row) => row.fy === 2020)[0];

  let hoveredTargetValue;

  if (hoveredProductTargetRow) {
    hoveredTargetValue = hoveredProductTargetRow.target;
  }

  //   const hoveredTargetValue = hoveredProductTargetRow[target];
  //   const hoveredTargetValue = hoveredProductTargetRow[`target`];
  //   const hoveredTargetValue = hoveredProductTargetRow[`target`];

  //   console.log("current id", hoveredProductId);
  console.log("current row", hoveredTargetValue);

  const tooltipText = `Target: ${hoveredTargetValue}`;

  return (
    <div
      //   style={tooltipStyles}
      id={tooltipId}
    >
      <span style={{}}>{tooltipText}</span>
    </div>
  );
};
