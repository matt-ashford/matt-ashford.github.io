import Paper from "@mui/material/Paper";
import styles from "./ProductPage.module.css";

import LineGraphProduct from "../../DashComponents/LineGraphProduct/LineGraphProduct";
import ProductInfo from "./ProductInfo";
import DownloadButton from "../../DashComponents/UIBits/DownloadButton/DownloadButton";

export const ProductPageFull = (props) => {
  const { selectedProductId, joinedDataAnnual, joinedDataQtr } = props;

  const annualDataWithQtrValue = joinedDataAnnual.map((row) => {
    row.quarter = "annual";
    return row;
  });

  const fullDataset = [...annualDataWithQtrValue, ...joinedDataQtr];
  const filteredData = fullDataset.filter(
    (row) => row.product_id === selectedProductId
  );

  // console.log(joinedDataAnnual);
  // console.log(filteredData);

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
              <ProductInfo filteredData={filteredData} />
            </div>
            <div className={styles.downloadBtnContainer}>
              {" "}
              <DownloadButton
                propData={filteredData}
                dataName="Historical Product Data"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductPageFull;
