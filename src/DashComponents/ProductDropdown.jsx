import { useRef } from "react";

import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";

import MenuItem from "@material-ui/core/MenuItem";

import { makeStyles } from "@material-ui/core/styles";
import { Typography, Grid } from "@material-ui/core";

import quarterlyData from "../Data/quarterlyData.json";

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

  const classes = useStyles();

  const inputRef = useRef();

  let productList = propData
    .filter((row) => row.fy === 2020)
    .filter((row) => !row.product.includes("Mixed"));

  if (mailClass !== "First Class")
    productList = productList.filter((row) => row.productAbbrev !== "missing");
  else {
    productList = productList

      .filter((row) => row.productId !== 61) //sp flats overnight
      .filter((row) => row.productId !== 1) //sp letters overnight
      .filter((row) => ![10, 11, 12, 14, 15, 16].includes(row.productId)) //inbound/outbound deliv speeds
      .filter((row) => ![7, 8, 9].includes(row.productId)); // flats product
  }

  productList.push({
    class: mailClass,
    fy: 2019,
    product: "none",
    productId: 0,
  });

  function returnFullProductName(element) {
    const productName = element.product;
    const deliverySpeed = element.deliverySpeed;

    if ((mailClass !== "First Class") | (productName === "none")) {
      return productName;
    }
    if ((mailClass === "First Class") & (productName === "Flats")) {
      return `${element.subProductName} (${deliverySpeed})`;
    } else {
      return `${productName} (${deliverySpeed})`;
    }
  }

  function getNameFromId(selectedProductId) {
    selectedProductId = parseInt(selectedProductId);

    if (selectedProductId === 0) {
      return "none";
    }

    const currentRow = propData.filter(
      (row) => row.productId === selectedProductId
    )[0];

    if (mailClass !== "First Class") {
      return currentRow.product;
    } else {
      if (currentRow.product === "Flats") {
        return `${currentRow.subProductName} (${currentRow.deliverySpeed})`;
      } else {
        return `${currentRow.product} (${currentRow.deliverySpeed})`;
      }
    }
  }

  const menuItems = productList.map((el, ind) => (
    <MenuItem
      key={`dropdown${ind}`}
      id={el.productId}
      onClick={changeProductSelected}
      value={returnFullProductName(el)}
      ref={inputRef}
    >
      {returnFullProductName(el)}
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
              value={getNameFromId(selectedProductId)}
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
