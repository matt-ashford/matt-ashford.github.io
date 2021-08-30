import { useRef } from "react";

import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";

import MenuItem from "@material-ui/core/MenuItem";

import { makeStyles } from "@material-ui/core/styles";
import { Typography, Grid } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  selectDropdown: {
    marginRight: "5%",

    width: "350px",
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
  const { propData, selectedProductId, changeProductSelected } = props;

  const classes = useStyles();

  function nameFromId(selectedProductId) {
    selectedProductId = parseInt(selectedProductId);

    if (selectedProductId === 0) {
      return "none";
    } else {
      return propData.filter((row) => row.productId === selectedProductId)[0]
        .product;
    }
  }
  const inputRef = useRef();

  let productList = propData
    .filter((row) => row.fy === 2020)
    .filter((row) => !row.product.includes("Mixed"));

  productList.push({
    class: "Marketing Mail",
    fy: 2019,
    product: "none",
    productId: 0,
  });

  const menuItems = productList.map((el, ind) => (
    <MenuItem
      key={`dropdown${ind}`}
      id={el.productId}
      onClick={changeProductSelected}
      value={el.product}
      ref={inputRef}
    >
      {el.product}
    </MenuItem>
  ));

  return (
    <>
      <FormControl>
        <Grid container>
          <Grid item xs={6}>
            <Typography className={classes.dropdownLabel}>
              View Product-Level Data:
            </Typography>
          </Grid>
          <Grid item xs={5}>
            <Select
              value={nameFromId(selectedProductId)}
              className={classes.selectDropdown}
            >
              {menuItems}
            </Select>
          </Grid>
        </Grid>
      </FormControl>
    </>
  );
};

export default ProductDropdown;
