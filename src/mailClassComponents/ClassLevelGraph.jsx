import * as d3 from "d3";
import { useEffect, useState } from "react";
// import data from "../../Data/compositeData.json";
// import yScale from "../../Data/graphDimensions";

export const ClassLevelGraph = (props) => {
  const { data } = props;

  console.log(data);
  //   console.log(props);

  return <div style={{ height: "300px" }}>im a class level graph</div>;
};

export default ClassLevelGraph;
