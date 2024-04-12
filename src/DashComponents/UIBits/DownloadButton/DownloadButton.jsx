import { CSVLink } from "react-csv";

import Button from "@mui/material/Button";
import TocIcon from "@material-ui/icons/Toc";
import { colorPalleteMatt } from "../../../Design/MyTheme";

import { downloadBtnDataPrep } from "./DownloadBtnDataPrep";
import styles from "../UIBits.module.css";

export const DownloadButton = (props) => {
  const { propData, dataName } = props;

  const returnedData = downloadBtnDataPrep(propData);

  return (
    <>
      <div className={styles.btnOuterContainer}>
        <CSVLink data={returnedData}>
          <Button
            style={{
              textTransform: "none",
              // backgroundColor: colorPalleteMatt.lightGrey,
              backgroundColor: colorPalleteMatt.darkBlue,
              color: "white",
            }}
            className={styles.button}
            variant="contained"
            id="downloadButton"
          >
            <div className={styles.textAndIcon}>
              <div clasName={styles.iconContainer}>
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