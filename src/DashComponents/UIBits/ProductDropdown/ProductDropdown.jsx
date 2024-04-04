import { useRef, useEffect, useState } from "react";

import {
  createUniqueProdsList,
  createFormattedProductList,
} from "./CreateDropdownData";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import styles from "./ProductDropdown.module.css";

export const ProductDropdown = (props) => {
  const { propData, selectedProductId, changeProductSelected, mailClass } =
    props;

  const [dropdownData, setDropdownData] = useState(
    createUniqueProdsList(propData, mailClass)
  );
  const [formattedProductNames, setFormattedProductNames] = useState(
    createFormattedProductList(dropdownData, mailClass)
  );

  const [isMouseEnter, setIsMouseEnter] = useState(false);

  useEffect(() => {
    setDropdownData(createUniqueProdsList(propData, mailClass));
    setFormattedProductNames(
      createFormattedProductList(dropdownData, mailClass)
    );
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
  const handleMouseEnter = () => {
    setIsMouseEnter(true);
  };

  const handleMouseLeave = () => {
    setIsMouseEnter(false);
  };

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
        <div
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className={`${styles.dropdownContainerFull} ${
            isMouseEnter ? styles.isMouse : styles.isNotMouse
          }`}
        >
          <div className={styles.productDropdownLableContainer}>
            {/* <Typography className={styles.dropdownLabel}> */}
            View Product-Level Data:
            {/* </Typography> */}
          </div>

          <div>
            <FormControl onMouseLeave={handleMouseLeave}>
              <Select
                onMouseLeave={handleMouseLeave}
                className={styles.productSelect}
                value={`dropdown_product${selectedProductId}`}
                onChange={(e) => {
                  changeProductSelected(e);
                  handleMouseLeave();
                }}
              >
                {menuItems}
              </Select>
            </FormControl>
          </div>
        </div>
      );
    }
  }

  return <>{returnDropdown(propData)}</>;
};

export default ProductDropdown;
