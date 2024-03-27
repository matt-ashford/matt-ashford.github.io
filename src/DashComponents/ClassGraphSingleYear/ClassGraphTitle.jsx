import { useEffect, useState } from "react";

export const ClassGraphTitle = (props) => {
  const { mailClass, selectedYear } = props;
  console.log(mailClass);

  function classAndProds(mailClass) {
    if (mailClass === "First Class") {
      return "First-Class Product Components";
    } else {
      return `${mailClass} Products`;
    }
  }

  function displayedYears(selectedYear) {
    return `${selectedYear - 1} and ${selectedYear}`;
  }

  function titleText(mailClass, selectedYear) {
    return `${classAndProds(mailClass)} ${displayedYears(selectedYear)}`;
  }
  return <h3>{titleText(mailClass, selectedYear)}</h3>;
};

export default ClassGraphTitle;
