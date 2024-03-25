import { useRef, useEffect, useState } from "react";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

import { Typography, Grid } from "@material-ui/core";

import { extractYearsFromAnnual } from "../DataManipulation/extractYearsFromAnnual";

// const useStyles = makeStyles((theme) => ({
//   selectDropdown: {
//     marginRight: "5%",

//     width: "375px",
//   },
//   formControl: {
//     margin: theme.spacing(1),
//     minWidth: 120,
//   },
//   selectEmpty: {
//     marginTop: theme.spacing(2),
//   },
//   dropdownLabel: {
//     color: "black",
//   },
// }));

export const YearDropdown = (props) => {
  const { propData, selectedYear, changeYearSelected } = props;

  const [dropdownData, setDropdownData] = useState([]);

  const rez = extractYearsFromAnnual(props.propData);
  //   console.log(props.propData);
  //   console.log(propData.length);

  console.log(rez);

  useEffect(() => {
    const yearsArray = extractYearsFromAnnual(propData);
    setDropdownData(yearsArray);
  }, [propData, selectedYear]);

  useEffect(() => {
    console.log(selectedYear);
  }, [selectedYear]);

  // const classes = useStyles();

  const inputRef = useRef();

  const menuItems = dropdownData.map((el, ind) => (
    <MenuItem
      key={`dropdown${ind}`}
      id={el}
      onClick={changeYearSelected}
      value={el}
      ref={inputRef}
    >
      {el}
    </MenuItem>
  ));

  return (
    <Grid container>
      <Grid item xs={6}>
        <Typography>Years:</Typography>
      </Grid>
      <Grid item xs={5}>
        <FormControl>
          <Select
            className={""}
            value={2023}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            onChange={changeYearSelected}
          >
            {menuItems}
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  );
};

export default YearDropdown;
