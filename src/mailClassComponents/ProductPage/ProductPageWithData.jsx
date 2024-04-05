import Paper from "@mui/material/Paper";
import styles from "./ProductPage.module.css";

import LineGraphProduct from "../../DashComponents/LineGraphProduct/LineGraphProduct";

export const ProductPageFull = (props) => {
  const { selectedProductId, joinedDataAnnual, joinedDataQtr } = props;

  return (
    <>
      <div className={styles.productContainerOuter}>
        <div className={styles.graph_info_downloadBtn_container}>
          <div className={styles.graphContainer}>
            <LineGraphProduct
              selectedProductId={selectedProductId}
              joinedDataAnnual={joinedDataAnnual}
              joinedDataQtr={joinedDataQtr}
            />
          </div>
          <div className={styles.info_download_container}>
            <div className={styles.productInfoContainer}>
              your selected id is {selectedProductId}{" "}
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
