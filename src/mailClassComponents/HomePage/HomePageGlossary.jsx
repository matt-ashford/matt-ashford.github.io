import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

export const HomePageGlossary = () => {
  return (
    <Grid>
      <Typography variant="h4" className="homePageHeader">
        {" "}
        Glossary{" "}
      </Typography>
      <Typography variant="h6">
        {/* <p className="homePageTextIdentifier">TextID: Glossary</p> */}
        <ul className="aboutDashPara">
          <li>
            <span className="undelineMe">Service performance score:</span> The
            percentage of measured mailpieces within each product or product
            component that met their applicable service standard.
          </li>

          <li>
            <span className="undelineMe">Service performance target:</span> A
            goal set by the Postal Service for the percentage of measured
            mailpieces within a particular product or product component to be
            delivered within their applicable service standard.
          </li>
          <li>
            <span className="undelineMe">Product:</span>
            “[A] postal service with a distinct cost or market characteristic
            for which a rate or rates are, or may reasonably be, applied.” 39
            U.S.C. § 102(6). Each Market Dominant class consists of multiple
            products.
          </li>

          <li>
            <span className="undelineMe"> Product component:</span> A term
            created for purposes of this dashboard only to refer to reporting by
            the Postal Service below the product level. For most products, USPS
            sets aggregate service performance targets, i.e., the percentage of
            all measured mailpieces within that product that should meet their
            applicable service standard, whatever that service standard happened
            to be. Within First-Class Mail, however, data for certain products
            are reported broken out by individual service standard. For example,
            for the Flats product within First-Class Mail in FY 2019 and FY
            2020, the Postal Service set three separate service standards with
            applicable on-time percent targets: (1) First-Class Mail Flats
            Overnight, (2) First-Class Mail Flats 2-Day, and (3) First-Class
            Mail Flats 3-5-Day. These are three distinct product components. For
            any visualization that includes mailpieces within First-Class Mail
            (including comparisons of First-Class Mail with other mail classes),
            the disaggregated reporting levels are referred to as “product
            components.”
          </li>

          <li>
            <span className="undelineMe">Market Dominant product:</span> A
            product “in the sale of which the Postal Service exercises
            sufficient market power that it can effectively set the price of
            such product substantially above costs, raise prices significantly,
            decrease quality, or decrease output, without risk of losing a
            significant level of business to other firms offering similar
            products.” See 39 U.S.C. § 3642(b)(1). Any product not classified as
            “Market Dominant” is classified as “Competitive.” Id. his dashboard
            pertains only to Market Dominant products and does not contain
            information on any Competitive products’ service performance.
          </li>
          {/* 
          <li>
            <span className="undelineMe"> </span>
          </li> */}
        </ul>
      </Typography>
    </Grid>
  );
};

export default HomePageGlossary;
