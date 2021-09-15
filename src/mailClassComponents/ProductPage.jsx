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

  if (productId && productId !== 0) {
    renderedSection = (
      <ProductPageFull productId={productId} productData={productData} />
    );
  } else {
    renderedSection = <EmptyProductPage />;
  }

  return <div>{renderedSection}</div>;
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
      <div style={{ marginTop: "2%", marginBottom: "20%" }}>
        <Divider />
        <div style={{ marginTop: "2%", marginLeft: "2%" }}>
          <Grid container spacing={0}>
            {/* <Grid item xl={7} lg={12}> */}
            <Grid item lg={7} md={12}>
              <div style={{ width: 875 }}>
                <Paper className={classes.productGraphContainer}>
                  <ProductGraph propData={productData} />
                </Paper>
              </div>
            </Grid>

            {/* <Grid
              item
              xs={1}
            ></Grid> */}

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
