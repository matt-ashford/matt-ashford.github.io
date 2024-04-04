import Paper from "@mui/material/Paper";
import styles from "./ProductPage.module.css";

export const ProductPageFull = (props) => {
  const { productId, productData } = props;

  return (
    <>
      <div className={styles.productContainerOuter}>
        <div className={styles.graph_info_downloadBtn_container}>
          <div className={styles.graphContainer}>
            {/* <Paper> */} {/* grpah here */}
            {/* <ProductGraph propData={productData} /> */}
            {/* </Paper> */}
          </div>
          <div className={styles.info_download_container}>
            <div className={styles.productInfoContainer}>
              your selected id is {productId}{" "}
            </div>
            <div className={styles.downlodaBtnContainer}> download btn </div>
          </div>
        </div>

        {/* <QuarterlyVolume propData={productData} /> */}
        {/* <DownloadButton
                  propData={productData}
                  dataName={"Quarterly Data"}
                /> */}
      </div>
      {/* <ProductDef productId={productId} /> */}
    </>
  );
};

export default ProductPageFull;
