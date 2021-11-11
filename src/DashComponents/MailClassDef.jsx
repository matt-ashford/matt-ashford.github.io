import classDefs from "../Data/mailClassDefinitions.json";

export const MailClassDef = (props) => {
  const { mailClass } = props;

  let classDefText = "";

  let thisDefinitionRow = classDefs.filter(
    (row) => row.mailClass === mailClass
  );

  if (thisDefinitionRow) {
    thisDefinitionRow = thisDefinitionRow[0];
    classDefText = thisDefinitionRow.definition;
  }

  console.log(thisDefinitionRow);

  return <div id="mailClassDefContainer">{classDefText} </div>;
};

export default MailClassDef;
