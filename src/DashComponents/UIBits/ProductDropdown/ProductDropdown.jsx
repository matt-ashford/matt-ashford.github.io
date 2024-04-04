import { useRef, useEffect, useState } from "react";

import {
  createUniqueProdsList,
  createFormattedProductList,
} from "./CreateDropdownData";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import { Typography, Grid } from "@material-ui/core";
import styles from "./ProductDropdown.module.css";

export const ProductDropdown = (props) => {
  const { propData, selectedProductId, changeProductSelected, mailClass } =
    props;

  // const [selectedClass, setSelectedClass] = useState(mailClass);

  const [dropdownData, setDropdownData] = useState(
    createUniqueProdsList(propData, mailClass)
  );
  const [formattedProductNames, setFormattedProductNames] = useState(
    createFormattedProductList(dropdownData, mailClass)
  );

  useEffect(() => {
    setDropdownData(createUniqueProdsList(propData, mailClass));
    setFormattedProductNames(
      createFormattedProductList(dropdownData, mailClass)
    );
    console.log(formattedProductNames);
  }, [propData, mailClass, selectedProductId]);

  useEffect(() => {
    setFormattedProductNames(
      createFormattedProductList(dropdownData, mailClass)
    );
  }, [dropdownData]);

  const inputRef = useRef();

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
        <div className={styles.dropdownContainerFull}>
          <Grid item xs={6} className={styles.productDropdownLableContainer}>
            <Typography className={styles.dropdownLabel}>
              View Product-Level Data:
            </Typography>
          </Grid>
          <Grid item xs={5}>
            <FormControl>
              <Select
                className={styles.productSelect}
                value={`dropdown_product${selectedProductId}`}
                onChange={changeProductSelected}
              >
                {menuItems}
              </Select>
            </FormControl>
          </Grid>
        </div>
      );
    }
  }

  return <>{returnDropdown(propData)}</>;
};

export default ProductDropdown;
