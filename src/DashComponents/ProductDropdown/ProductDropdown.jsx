import { useRef, useEffect, useState } from "react";

import { createDropDownData } from "./CreateDropdownData";

import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import { Typography, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  selectDropdown: {
    marginRight: "5%",

    width: "375px",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  dropdownLabel: {
    color: "black",
  },
}));

export const ProductDropdown = (props) => {
  const { propData, selectedProductId, changeProductSelected, mailClass } =
    props;

  const [dropdownData, setDropdownData] = useState([]);
  const [mailClassState, setMailClassState] = useState("");

  // useEffect(() => {
  //   setDropdownData(propData);
  //   setMailClassState(mailClass);
  // }, []);

  useEffect(() => {
    const finalDropdownData = createDropDownData(propData, mailClass);
    console.log(finalDropdownData);
    setDropdownData(finalDropdownData);
    setMailClassState(mailClass);
  }, [propData, mailClassState, selectedProductId]);

  const classes = useStyles();

  const inputRef = useRef();

  // let defaultValue = dropdownData[0];
  // if (!defaultValue) {
  //   defaultValue = "none";
  // }

  let defaultValue = dropdownData.length > 0 ? dropdownData[0] : "";

  const menuItems = dropdownData.map((el, ind) => (
    <MenuItem
      key={`dropdown${ind}`}
      id={`dropdown${el}`}
      value={el}
      ref={inputRef}
    >
      {el}
    </MenuItem>
  ));

  function returnDropdown(propData) {
    const mailClass = propData[0].class;

    if (mailClass === "Special Services") {
      return (
        <div>
          Quarterly Product-level data is not available for products within the
          Special Services mail class
        </div>
      );
    } else {
      return (
        <FormControl>
          <Grid container>
            <Grid item xs={6}>
              <Typography className={classes.dropdownLabel}>
                View Product-Level Data:
              </Typography>
            </Grid>
            <Grid item xs={5}>
              <Select
                className={classes.selectDropdown}
                value={`${defaultValue}`}
                onChange={changeProductSelected}
              >
                {menuItems}
              </Select>
            </Grid>
          </Grid>
        </FormControl>
      );
    }
  }

  return <>{returnDropdown(propData)}</>;
};

export default ProductDropdown;
