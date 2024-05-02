import { makeStyles } from "@material-ui/core/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import styles from "./allMD.module.css";

export const ProductCountTableMD = (props) => {
  const { countData, selectedYear } = props;

  return (
    <>
      <h3 className={styles.countTableTitle}>
        Product Component Count by Class
      </h3>
      <TableContainer component={Paper}>
        <Table className={styles.table} aria-label="simple table">
          <TableHead className={styles.tableHead}>
            <TableRow>
              <TableCell
                sx={{ minWidth: 150 }}
                className={styles.firstTableHead}
                style={{ fontWeight: "bolder" }}
              >
                Mail Class
              </TableCell>
              <TableCell
                align="center"
                style={{ fontWeight: "bolder" }}
                className={styles.allMdTableHeader}
              >
                Total Product Components
              </TableCell>
              <TableCell
                align="center"
                style={{ fontWeight: "bolder" }}
                className={styles.allMdTableHeader}
              >
                Product Components that missed Target in FY{selectedYear}
              </TableCell>
              <TableCell
                align="center"
                style={{ fontWeight: "bolder" }}
                className={styles.allMdTableHeader}
              >
                Product Components that Decreased in FY{selectedYear}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {countData.map((row, ind) => (
              <TableRow key={`row${ind}`} className={styles.tableRow}>
                <TableCell
                  //  component="th"
                  scope="row"
                  key={`row${ind}1`}
                  sx={{ maxHeight: 10 }}
                >
                  {row.mailClass}
                </TableCell>
                <TableCell key={`row${ind}2`} align="center">
                  {row.totalProducts}
                </TableCell>
                <TableCell key={`row${ind}3`} align="center">
                  {row.productsMissedTarget}
                </TableCell>
                <TableCell key={`row${ind}4`} align="center">
                  {row.negativeChange}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default ProductCountTableMD;
