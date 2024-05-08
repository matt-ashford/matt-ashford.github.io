export const FCWeeklyPrep = (rawData) => {
  const externalLink = "https://spm.usps.com/#/main";
  const productName = "First-Class Mail Overall National";

  const rez = rawData.map((row) => {
    row.source = externalLink;
    row.product = productName;
    return row;
  });

  return rez;
};
