import { CSVLink } from "react-csv";

import Button from "@mui/material/Button";
import TocIcon from "@material-ui/icons/Toc";
import { colorPalleteMatt } from "../../../Design/MyTheme";

import { downloadBtnDataPrep } from "./DownloadBtnDataPrep";
import { FCWeeklyPrep } from "./FCWeeklyPrep";
import styles from "../UIBits.module.css";

export const DownloadButton = (props) => {
  const { propData, dataName, dataType } = props;

  const functionDataTypeMap = {
    FCWeekly: FCWeeklyPrep,
    libRef: downloadBtnDataPrep,
  };
  let selectedFunction = functionDataTypeMap[dataType];

  let returnedData;
  if (!selectedFunction) {
    returnedData = downloadBtnDataPrep(propData);
  } else {
    returnedData = selectedFunction(propData);
  }

  return (
    <>
      <div className={styles.btnOuterContainer}>
        <CSVLink data={returnedData}>
          <Button
            style={{
              textTransform: "none",
              backgroundColor: colorPalleteMatt.darkBlue,
              color: "white",
            }}
            className={styles.button}
            variant="contained"
            id="downloadButton"
          >
            <div className={styles.textAndIcon}>
              <div className={styles.iconContainer}>
                <TocIcon className={styles.icon} />
              </div>
              <div className={styles.textContainer}>
                <div className={styles.downloadContainer}>
                  <p> DOWNLOAD CSV</p>
                </div>
                <div className={styles.dataNameContainer}>
                  <p className={styles.dataName}>{dataName}</p>
                </div>
              </div>
            </div>
          </Button>
        </CSVLink>
      </div>
    </>
  );
};

export default DownloadButton;
