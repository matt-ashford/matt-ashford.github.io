import data from "../Data/quarterlyData.json";

import ProductGraph from "../DashComponents/ProductGraph";
import QuarterlyVolume from "../DashComponents/QuarterlyVolume";
import { Grid, Paper, Divider } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import DownloadButton from "../DashComponents/DownloadButton";

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
        //  marginBottom: "15rem"
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
  },
}));

const ProductPageFull = (props) => {
  const classes = useStyles();

  const { productId, productData } = props;

  return (
    <>
      <div
        style={{
          marginTop: "2%",
          //  marginBottom: "15rem"
          // marginBottom: `${dynamicMarginBottom}rem`,
        }}
      >
        <Divider />
        <div style={{ marginTop: "2%", marginLeft: "2%" }}>
          <Grid container spacing={0}>
            <Grid item lg={7} md={12}>
              <div style={{ width: 825 }}>
                <Paper elevation={3} className={classes.productGraphContainer}>
                  <ProductGraph propData={productData} />
                </Paper>
              </div>
            </Grid>

            <Grid item xs={3}>
              <QuarterlyVolume propData={productData} />
              <div style={{ marginTop: "10%" }}></div>
              <DownloadButton
                propData={productData}
                dataName={"Quarterly Data"}
              />
            </Grid>
          </Grid>
        </div>
      </div>
    </>
  );
};

const EmptyProductPage = () => {
  return <></>;
};

export default ProductPage;
