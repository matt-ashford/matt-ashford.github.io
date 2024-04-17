import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

// import countData from "../../Data/toLevelProductCounts.json";
// import annualData from "../../Data/annualData.json";

const useStyles = makeStyles({
  table: {
    minWidth: 500,
    maxHeight: 400,
    padding: "4px 8px",
    borderTop: "1px solid rgba(0, 0, 0, 0.2)",
    boxShadow: "2px 2px 2px 2px rgba(0, 0, 0, 0.2)",
  },

  tableHead: {
    fontWeight: "bolder",
    color: "green",
  },
});

export const ProductCountTableMD = (props) => {
  const { countData } = props;

  // console.log("count table", countData);
  // console.table(countData);
  const classes = useStyles();

  return (
    <>
      <h3>Product Component Count by Class</h3>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead className={classes.tableHead}>
            <TableRow>
              <TableCell
                style={{
                  inlineSize: "100px",
                  textAlign: "left",
                  fontWeight: "bolder",
                }}
              >
                Mail Class
              </TableCell>
              <TableCell
                align="center"
                className="allMdTableHeader"
                style={{ fontWeight: "bolder" }}
              >
                Total Product Components
              </TableCell>
              <TableCell
                align="center"
                className="allMdTableHeader"
                style={{ fontWeight: "bolder" }}
              >
                Product Components that missed Target in FY2020
              </TableCell>
              <TableCell
                align="center"
                className="allMdTableHeader"
                style={{ fontWeight: "bolder" }}
              >
                Product Components that Decreased in FY2020
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {countData.map((row, ind) => (
              <TableRow key={`row${ind}`}>
                <TableCell
                  component="th"
                  scope="row"
                  key={`row${ind}1`}
                  // style={{ inlineSize: "150px", textAlign: "left" }}
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
