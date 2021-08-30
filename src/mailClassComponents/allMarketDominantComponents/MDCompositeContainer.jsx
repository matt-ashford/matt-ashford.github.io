import BarGraphSide from "../../DashComponents/BarGraphSide";
import compositeData from "../../Data/compositeData.json";
import GraphKey from "../../DashComponents/GraphKey";
import AxisBottom from "../../DashComponents/AxisBottom";

export const MDCompositeContainer = () => {
  const fcData = compositeData.filter(
    (row) => row.ProductNameAbbrev === "First Class Composite"
  );

  const mmData = compositeData.filter(
    (row) => row.ProductNameAbbrev === "MM and Per Composite"
  );

  return (
    <div style={{}}>
      <h3>Composite Scores </h3>

      <h5>First Class Letters and Flats</h5>

      <BarGraphSide propData={fcData} />

      <h5>Marketing Mail and Periodicals</h5>

      <BarGraphSide propData={mmData} />

      <AxisBottom />

      <GraphKey level={"MDLevel"} bar2019={".MM2019"} bar2020={".MM2020"} />
    </div>
  );
};

export default MDCompositeContainer;
