import data from "../../Data/quarterlyData.json";

import ProductGraph from "../../DashComponents/ProductGraph";
import QuarterlyVolume from "../../DashComponents/QuarterlyVolume";
import { Grid, Paper, Divider } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import DownloadButton from "../../DashComponents/DownloadButton";

import ProductDef from "../../DashComponents/ProductDef";
import ProductPageFull from "./ProductPageFull";
import EmptyProductPage from "./EmptyProductPage";
import { useEffect, useState } from "react";

export const ProductPage = (props) => {
  const { selectedProductId } = props;

  let productId = parseInt(selectedProductId);

  const productData = data.filter((row) => row.productId === productId);

  let renderedSection;
  let dynamicMarginBottom = 5;

  if (productId && productId !== 0) {
    renderedSection = (
      <ProductPageFull productId={productId} productData={productData} />
    );
    dynamicMarginBottom = 0;
  } else {
    renderedSection = <EmptyProductPage />;
  }

  return (
    <div
      style={{
        marginBottom: `${dynamicMarginBottom}rem`,
      }}
    >
      {renderedSection}
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  fullProductContainer: {
    marginTop: "3%",
    backgroundColor: "black",
  },
  quarterlyContainer: {
    minWidth: 315,
  },
  productGraphContainer: {
    minwidth: 700,
    maxWidth: 775,
    paddingTop: "1%",
  },
}));

export default ProductPage;
