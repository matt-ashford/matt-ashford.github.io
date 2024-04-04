import { useRef, useEffect, useState } from "react";
import styles from "./UIBits.module.css";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { Typography, Grid } from "@mui/material";
import { extractYearsFromAnnual } from "../../DataManipulation/extractYearsFromAnnual";
// import InputLabel from "@mui/material/InputLabel";

export const YearDropdown = (props) => {
  const { propData, selectedYear, changeYearSelected } = props;

  const [dropdownData, setDropdownData] = useState([2023]);
  const [defaultValue, setDefaultValue] = useState("");

  useEffect(() => {
    const yearsArray = extractYearsFromAnnual(propData);
    const yearsArray_dropMin = dropMin(yearsArray);
    setDropdownData(yearsArray_dropMin);
  }, [propData, selectedYear]);

  useEffect(() => {
    const yearsArray = extractYearsFromAnnual(propData);
    setDropdownData(yearsArray);
  }, []);

  const inputRef = useRef();

  function dropMin(list) {
    const min = Math.min(...list);
    const rez = list.filter((item) => item !== min);
    return rez;
  }

  const menuItems = dropdownData.map((el, ind) => (
    <MenuItem
      key={`dropdown${ind}`}
      id={`yearDropdown_${el}`}
      value={el}
      ref={inputRef}
      className={styles.yeardropdownvalue}
    >
      {el}
    </MenuItem>
  ));

  return (
    <>
      <Grid container className={styles.dropdownOuterContainer}>
        <Grid item xs={6}>
          <Typography className={styles.yearLabel}>Years:</Typography>
        </Grid>
        <Grid item xs={5}>
          <FormControl className={styles.formControl}>
            <Select
              className={styles.dropdownSelect}
              value={`${selectedYear}`}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              onChange={changeYearSelected}
            >
              {menuItems}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </>
  );
};

export default YearDropdown;
