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
              Earlier this year, the Commission closed the period for public
              comments on the beta version of its service performance dashboard.
              The Commission is currently reviewing the submitted public
              comments on the beta dashboard as well as the Postal Service’s
              response to those comments. In the meantime, the Commission has
              published the&nbsp;
              <a
                rel="noreferrer"
                target="_blank"
                href="https://www.prc.gov/docs/121/121270/FY%202021%20ACD.pdf"
              >
                <u>Annual Compliance Determination</u>
              </a>
              &nbsp;for 2021, which contains data through fiscal year 2021.
            </p>
            <p className="dashIntroPara">
              Since the Commission published the beta dashboard and received
              comments on it, Congress passed the Postal Service Reform Act of
              2022, and the President signed the reform bill into law on April
              6, 2022. <i>See&nbsp;</i>
              <a
                rel="noreferrer"
                target="_blank"
                href="https://www.congress.gov/117/plaws/publ108/PLAW-117publ108.pdf"
              >
                <u>
                  Postal Service Reform Act, Pub. L. 117-108, 136 Stat. 1127
                  (April 6, 2022
                </u>
                )
              </a>
              . The reform law requires the Postal Service to develop its own
              public, interactive, service performance dashboard that, among
              other features, presents data in a manner that is searchable and
              can be downloaded in bulk by any person or entity. The law tasks
              the Commission with:
              <ul>
                <li>
                  establishing requirements for publication of service
                  performance information on the Postal Service's dashboard (in
                  terms of organizational structure, geographic coverage,
                  granularity, and temporal coverage);
                </li>
                <li>
                  recommending any changes to the Postal Service's measurement
                  systems that the Commission deems necessary for measurement
                  and publication of service performance information on the
                  dashboard; and
                </li>
                <li>
                  regularly consulting with the Postal Service on appropriate
                  features and information for the Postal Service's dashboard.
                </li>
              </ul>
              The Commission is therefore pausing any updates of the
              Commission's beta dashboard to ensure that any data visualizations
              add value and are complementary.
            </p>
            <p className="dashIntroPara">
              <del className="strikeThrough">
                The Commission is soliciting public comment on this dashboard
                via Docket No. PI2022-2. Comments are due March 18, 2022 and
                reply comments are due April 7, 2022. A guide to using the
                Filing Online system, including how to create an account, is
                available at:
                <a
                  rel="noreferrer"
                  target="_blank"
                  href="https://www.prc.gov/how-to-participate"
                >
                  https://www.prc.gov/how-to-participate
                </a>
                . If you have questions about how to use the Filing Online
                system, please contact the dockets clerk by email at
                dockets@prc.gov or telephone at (202) 789-6847.
              </del>
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
