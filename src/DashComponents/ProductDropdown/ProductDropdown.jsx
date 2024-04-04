import { useRef, useEffect, useState } from "react";

import {
  createUniqueProdsList,
  createFormattedProductList,
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

  const inputRef = useRef();

  const defaultValue = dropdownData.length > 0 ? "" : "none";

  const menuItems = dropdownData.map((el, ind) => {
    return (
      <MenuItem
        ref={inputRef}
        key={`dropdown${ind}`}
        id={el.product_id}
        value={`dropdown_product${el.product_id}`}
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
        <Grid container>
          <Grid item xs={6}>
            <Typography className={classes.dropdownLabel}>
              View Product-Level Data:
            </Typography>
          </Grid>
          <Grid item xs={5}>
            <FormControl>
              <Select
                className={classes.selectDropdown}
                // value={`${defaultValue}`}
                // value={selectedProductId}
                value={`dropdown_product${selectedProductId}`}
                onChange={changeProductSelected}
              >
                {menuItems}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      );
    }
  }

  return <>{returnDropdown(propData)}</>;
};

export default ProductDropdown;
