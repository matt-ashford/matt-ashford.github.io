import productDefs from "../Data/productDefinitions.json";
import annualData from "../Data/annualData.json";

export const ProductDef = (props) => {
  const { productId } = props;

  let productDefRow = productDefs.filter((row) => row.productId === productId);

  let annualProductRow = annualData.filter(
    (row) => row.productId === productId
  );
  annualProductRow = annualProductRow[0];

  const productName = annualProductRow.product;
  let mailClass = annualProductRow["class"];

  let exampleText = "";

  let defExists = false;

  if (productDefRow.length > 0) {
    defExists = true;
  }

  if (defExists) {
    productDefRow = productDefRow[0];
    exampleText = productDefRow.examples;
  }

  function generateFullText(exampleText) {
    let mailClassText = "";

    if (mailClass === "First Class Mail") {
      mailClass = "First-Class";
    }

    if (["First-Class", "Marketing Mail", "Periodicals"].includes(mailClass)) {
      mailClassText = mailClass + " ";
    }

    const defText = defExists ? (
      <p>
        Examples of {mailClassText}
        {productName} include {exampleText}
      </p>
    ) : (
      ""
    );

    const fullText = (
      <>
        {defText}
        <p>
          For a full product definition of {mailClassText}
          {productName} please see the{" "}
          <a
            href="https://www.prc.gov/mail-classification-schedule"
            target="_blank"
            rel="noreferrer"
            style={{ textDecoration: "underline" }}
          >
            Mail Classification Schedule
          </a>
        </p>
      </>
    );
    return fullText;
  }

  return <div id="productDefContainer"> {generateFullText(exampleText)}</div>;
};

export default ProductDef;
