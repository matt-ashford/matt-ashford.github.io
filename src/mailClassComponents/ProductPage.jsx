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
        <div style={{ marginTop: "2%" }}>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <div style={{ minWidth: 900 }}>
                <Paper className={classes.productGraphContainer}>
                  <ProductGraph propData={productData} />
                </Paper>
              </div>
            </Grid>

            {/* lg={9} md={12} */}

            {/* lg={3} md={12} */}
            <div style={{ width: "250px" }}></div>

            <Grid item xs={3}>
              {" "}
              <Paper className={classes.quarterlyContainer}>
                <QuarterlyVolume propData={productData} />
              </Paper>
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
