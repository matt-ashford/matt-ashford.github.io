import { useRef, useEffect, useState } from "react";

import {
  createUniqueProdsList,
  createFormattedProductList,
  formatProductNameSingleRow,
} from "./CreateDropdownData";
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

  const [dropdownData, setDropdownData] = useState(
    createUniqueProdsList(propData, mailClass)
  );
  const [formattedProductNames, setFormattedProductNames] = useState(
    createFormattedProductList(dropdownData, mailClass)
  );
  const [mailClassState, setMailClassState] = useState("");

  useEffect(() => {
    setDropdownData(createUniqueProdsList(propData, mailClass));
    setMailClassState(mailClass);
  }, [propData, mailClassState, selectedProductId]);

  const classes = useStyles();

  const defaultValue = dropdownData.length > 0 ? "" : "none";
  // const defaultValue = "none";

  // console.log(formattedProductNames);
  console.log(dropdownData);

  // for (let i = 0; i < dropdownData.length; i++) {
  //   console.log(
  //     "formatted name",
  //     formattedProductNames[i],
  //     "dropdown row",
  //     dropdownData[i]
  //   );
  // }

  const menuItems = dropdownData.map((el, ind) => {
    return (
      <MenuItem
        key={`dropdown${ind}`}
        id={el.product_id}
        value={formattedProductNames[ind]}
        // value={formatProductNameSingleRow(el, mailClass)}
        // value={el.product_id}
        // value="1"
      >
        {formattedProductNames[ind]}
      </MenuItem>
    );
  });

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
