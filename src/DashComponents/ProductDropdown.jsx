import { useRef, useEffect, useState } from "react";

import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";

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

  if (isFirstClass)
    productList = productList.filter((row) => row.productAbbrev !== "missing");
  else {
    productList = productList

      .filter((row) => row.productId !== 61) //sp flats overnight
      .filter((row) => row.productId !== 1) //sp letters overnight
      .filter((row) => ![10, 11, 12, 14, 15, 16].includes(row.productId)) //inbound/outbound deliv speeds
      .filter((row) => ![7, 8, 9].includes(row.productId)) // flats product
      .filter(
        (row) => ![44, 45, 46, 48, 60, 50, 51, 52, 53].includes(row.productId)
      ); // special services nonsense
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

    if (isFirstClass & (productName === "none")) {
      return productName;
    }

    if (isFirstClass & (productName === "Flats")) {
      return `${productName} (${deliverySpeed})`;
    } else if (isFirstClass) {
      return `${productName} (${deliverySpeed})`;
    } else {
      return `${productName}`;
    }
  }

  // function getNameFromId(selectedProductId) {
  //   selectedProductId = parseInt(selectedProductId);

  //   if (selectedProductId === 0) {
  //     return "none";
  //   }

  //   const currentRow = dropdownData.filter(
  //     (row) => row.productId === selectedProductId
  //   )[0];

  //   if (isFirstClass) {
  //     return currentRow.product;
  //   } else {
  //     if (currentRow.product === "Flats") {
  //       return `${currentRow.subProductName} (${currentRow.deliverySpeed})`;
  //     } else {
  //       return `${currentRow.product} (${currentRow.deliverySpeed})`;
  //     }
  //   }
  // }

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
              // value={getNameFromId(selectedProductId)}
              // value="hello"
              className={classes.selectDropdown}
            >
              {menuItems}
            </Select>
          </Grid>
        </Grid>
      </FormControl>
      {/* <div>{getNameFromId(selectedProductId)}</div> */}
    </>
  );
};

export default ProductDropdown;
