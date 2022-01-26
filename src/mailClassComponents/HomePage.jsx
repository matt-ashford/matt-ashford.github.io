import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import { ReactComponent as Logo } from "../Design/prcIcon.svg";
import DashContents from "./HomePageContents";
import HomePageGlossary from "./HomePageGlossary";
// import HomePageLettersGraph from "./HomePageLettersGraph";
import HomePageLettersGraphCOPIED from "./HomePageLettersGraphCOPIED";
import Footer from "./Footer";
import annualData from "../Data/annualData.json";

export const HomePage = () => {
  const letterData = annualData.filter((row) => [3, 2].includes(row.productId));
  return (
    <>
      <Grid container spacing={4}>
        <Grid item xs={9} className="homePageTextContainerLeft">
          <Typography variant="h1" className="homePageHeader">
            Welcome
          </Typography>
          <Typography variant="h5">
            Postal Regulatory Commission Service Performance Dashboard BETA
          </Typography>
          <div id="topLogoContainer">
            <Logo />
          </div>
        </Grid>
        <Grid item xs={3}></Grid>
      </Grid>

      <Grid container spacing={4} className="homePageTextContainerLeft ">
        <Grid item xs={7}>
          <Typography variant="h6">
            {/* <p className="homePageTextIdentifier">TextID: Dashboard Intro</p> */}
            <p className="dashIntroPara">
              The Postal Regulatory Commission has launched an interactive
              dashboard that provides visual data and interactive tools to allow
              the public to view the service performance results for many Market
              Dominant mail products (and product components) delivered by the
              United States Postal Service (USPS).
            </p>

            <p className="dashIntroPara">
              The Commission is soliciting public comment on this dashboard via
              PI2022-^ [fill in that TBD docket number and provide a link].
              Comments are due ^[INSERT TBD DATE] and reply comments are due
              ^[INSERT TBD DATE]. Please refer to Order No. ^[ fill in that TBD
              Order number and provide a link]. A guide to using the Filing
              Online system, including how to create an account, is available
              at: https://www.prc.gov/how-to-participate. If you have questions
              about how to use the Filing Online system, please contact the
              dockets clerk by email at dockets@prc.gov or telephone at (202)
              789-6847.
            </p>
          </Typography>
        </Grid>
      </Grid>

      <Grid container spacing={4} className="homePageTextContainerLeft">
        <Grid item xs={7}>
          <Typography variant="h3" className="homePageHeader">
            About this Dashboard
          </Typography>
          <br />
          <Typography variant="h6">
            {/* <p className="homePageTextIdentifier">
              TextID: Dashboard Description
            </p> */}
            <p className="aboutDashPara">
              The Postal Service sets service standards for products and product
              components, which identify the amount of time within which a
              customer can ordinarily expect a mailpiece to be delivered
              (expected days-to-delivery). The Postal Service also sets service
              performance targets for products and product components, which
              impose a goal for the percentage of measured mailpieces that
              should be delivered within their applicable service standard
              (on-time percent target). This dashboard provides a visual
              comparison of the actual percentage of measured Market Dominant
              mailpieces delivered on-time, which means within their applicable
              service standard (the service performance score), with the service
              performance targets established by USPS.
            </p>
            <p className="aboutDashPara">
              The public data contained in the dashboard are obtained from the
              Commission’s Annual Compliance Review dockets and will change
              throughout time as data are updated.
            </p>
            <p className="aboutDashPara">
              The Commission’s dashboard is interactive, allowing users to
              explore and reveal service performance information by hovering
              over data points. When hovering over an element of visual data, a
              pop-up will provide additional information.{" "}
            </p>
          </Typography>

          <br />
          <br />
          <div id="homePageGraphContainer">
            <HomePageLettersGraphCOPIED
              propData={letterData}
              mailClass="First Class Mail"
            />
          </div>

          <br />
          <br />
          <Typography variant="h4" className="homePageHeader">
            Dashboard Contents
          </Typography>

          <DashContents />
        </Grid>
      </Grid>

      <Grid container spacing={4} className="homePageTextContainerLeft">
        <Grid item xs={5}>
          <Paper elevation={3} id="linksContainer">
            <Typography variant="h5" className="homePageHeader">
              Additional Resources
            </Typography>
            <br />
            <Typography variant="h6">
              {/* <p className="homePageTextIdentifier">TextID: Links</p> */}
              <Link
                href="https://www.prc.gov/dockets/document/116399"
                className="homePageLink"
              >
                Annual Compliance Determination FY2020
              </Link>
              <br />
              <br />
              <Divider />
              <br />
              <Link
                href="https://www.prc.gov/dockets/document/112730"
                className="homePageLink"
              >
                Annual Compliance Determination FY2019
              </Link>
              <br />
              <br />
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      <Grid container spacing={4} className="homePageTextContainerLeft">
        <HomePageGlossary />
      </Grid>

      <br />
      <br />
      <Footer />
    </>
  );
};

const HomePageContactInfo = () => {
  return (
    <Grid container direction="column" id="contactInfoContainer">
      <Grid item>
        <Typography variant="h6">Contact Us</Typography>
        <Divider />

        <Typography variant="subtitle1">
          901 New York Ave NW #200, Washington, DC 20268
        </Typography>
      </Grid>
      <br />
      <Grid item>
        <Typography>(202)789-6800</Typography>
      </Grid>
    </Grid>
  );
};

export default HomePage;
