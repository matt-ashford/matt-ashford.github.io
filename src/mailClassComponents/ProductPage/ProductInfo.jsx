import { useEffect, useState } from "react";
import productDefData from "../../Data/productDefinitions.json";
import styles from "./ProductPage.module.css";

export const ProductInfo = (props) => {
  const { selectedProductId, joinedDataAnnual, joinedDataQtr } = props;

  const fullDataset = [...joinedDataAnnual, ...joinedDataQtr];

  const matchingSeries = fullDataset.filter(
    (row) => row.product_id === selectedProductId
  );
  const firstMatch = matchingSeries[0];

  const productDefDataFiltered = productDefData.filter(
    (row) =>
      row.product === firstMatch.product &&
      row.mail_class === firstMatch.mail_class
  );

  const firstRowMailDef = productDefDataFiltered
    ? productDefDataFiltered[0]
    : {};

  const exampleText = firstRowMailDef
    ? `Examples of ${firstRowMailDef.product} include ${firstRowMailDef.examples} `
    : "";

  //   console.log(firstRowMailDef.product);
  const fullLinkText = `For a full product definition ${firstMatch.mail_class}  ${firstMatch.product} please see the please see the `;

  return (
    <>
      <div className={styles.exampleTextContainer}>
        <span className={styles.exampleText}>{`${exampleText}`}</span>
      </div>
      <div className={styles.mcsLinkTextContainer}>
        <span className={styles.mcsLinkText}>
          {`${fullLinkText}`}
          <a
            href="https://www.prc.gov/mail-classification-schedule"
            target="_blank"
          >
            Mail Classification Schedule
          </a>
        </span>
      </div>
    </>
  );
};

export default ProductInfo;
