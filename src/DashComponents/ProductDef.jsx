import productDefs from "../Data/productDefinitions.json";

export const ProductDef = (props) => {
  const { productId } = props;

  let productDefRow = productDefs.filter((row) => row.productId === productId);

  let exampleText = "";

  let defExists = false;

  if (productDefRow.length > 0) {
    defExists = true;
  }

  if (defExists) {
    productDefRow = productDefRow[0];
    exampleText = productDefRow.examples;
  }

  console.log("proddef", productDefRow);

  function generateFullText(exampleText) {
    const productName = productDefRow.productName;
    const mailClass = productDefRow.mailClass;
    let mailClassText = "";

    if (["Marketing Mail", "Periodicals"].includes(mailClass)) {
      mailClassText = mailClass + " ";
    }

    if (!defExists) {
      return "";
    }

    const fullText = `Examples of ${mailClassText}${productName} include ${exampleText}`;
    return fullText;
  }

  return <div id="productDefContainer"> {generateFullText(exampleText)} </div>;
};

export default ProductDef;
