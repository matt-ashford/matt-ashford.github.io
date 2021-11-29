import { useRef, useEffect, useState } from "react";

import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import Paper from "@material-ui/core/Paper";

import MenuItem from "@material-ui/core/MenuItem";

import { makeStyles } from "@material-ui/core/styles";
import { Typography, Grid } from "@material-ui/core";

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
    setDropdownData(propData);
    setMailClassState(mailClass);
  }, [propData, mailClassState, selectedProductId]);

  const classes = useStyles();

  const inputRef = useRef();

  let productList = dropdownData
    .filter((row) => row.fy === 2020)
    .filter((row) => !row.product.includes("Mixed"));

  const isFirstClass = mailClassState === "First Class Mail" ? true : false;

  if (isFirstClass) {
    productList = productList.filter((row) => row.productAbbrev !== "missing");

    productList = productList
      .filter((row) => ![7, 8, 9].includes(row.productId))
      .filter((row) => row.productId !== 61) //sp flats overnight
      .filter((row) => row.productId !== 1) //sp letters overnight
      .filter((row) => ![10, 11, 12, 14, 15, 16].includes(row.productId)); //inbound/outbound deliv speeds
  } else {
    productList = productList
      .filter(
        (row) => ![44, 45, 46, 48, 60, 50, 51, 52, 53].includes(row.productId)
      ) // special services nonsense
      .filter((row) => ![40].includes(row.productId)); //alaska bypass
  }

  productList.push({
    class: mailClassState,
    fy: 2019,
    product: "none",
    productId: 0,
  });

  function returnFullProductName(element) {
    const productName = element.product;
    const deliverySpeed = element.deliverySpeed;
    const subProductName = element.subProductName;

    if (isFirstClass & (productName === "none")) {
      return productName;
    }

    if (isFirstClass & (productName === "Flats")) {
      return `${subProductName} (${deliverySpeed})`;
    } else if (isFirstClass) {
      return `${productName} (${deliverySpeed})`;
    } else {
      return `${productName}`;
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

  console.log("dropdown", propData);

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
              <Select className={classes.selectDropdown}>{menuItems}</Select>
            </Grid>
          </Grid>
        </FormControl>
      );
    }
  }

  return <>{returnDropdown(propData)}</>;
};

export default ProductDropdown;
