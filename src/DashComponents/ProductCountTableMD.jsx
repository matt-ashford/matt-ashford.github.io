import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import countData from "../Data/toLevelProductCounts.json";

const useStyles = makeStyles({
  table: {
    minWidth: 500,
    maxHeight: 400,
    padding: "4px 8px",
    // border: "1px solid black",
    borderTop: "1px solid rgba(0, 0, 0, 0.2)",
    boxShadow: "2px 2px 2px 2px rgba(0, 0, 0, 0.2)",
  },
});

export const ProductCountTableMD = () => {
  const classes = useStyles();

  console.log(countData);

  return (
    <>
      <h3>Product Count by Class</h3>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Mail Class</TableCell>
              <TableCell align="right">Total Products</TableCell>
              <TableCell align="right">Negative Change</TableCell>
              <TableCell align="right">Positive Change</TableCell>
              <TableCell align="right">Missing Data</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {countData.map((row, ind) => (
              <TableRow key={`row${ind}`}>
                <TableCell component="th" scope="row" key={`row${ind}1`}>
                  {row.mailClass}
                </TableCell>
                <TableCell align="right" key={`row${ind}2`}>
                  {row.totalProducts}
                </TableCell>
                <TableCell align="right" key={`row${ind}3`}>
                  {row.negativeChange}
                </TableCell>
                <TableCell align="right" key={`row${ind}4`}>
                  {row.positiveChange}
                </TableCell>
                <TableCell align="right" key={`row${ind}5`}>
                  {row.missing}
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
