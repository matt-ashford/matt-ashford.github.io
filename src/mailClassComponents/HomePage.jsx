import Typography from "@material-ui/core/Typography";
import * as d3 from "d3";
import { useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import { ReactComponent as Logo } from "../Design/prcIcon.svg";

export const HomePage = () => {
  const svg = d3.select("#envelopeSvg");

  const lineStyles = {
    stroke: "black",
    strokeWidth: "3",
  };

  const envelopeXStart = "100";

  const envelopeWidth = `${parseInt(envelopeXStart) + 250}`;
  const envelopeHeight = "150";

  const midWayWidth = `${
    (parseInt(envelopeXStart) + parseInt(envelopeWidth)) / 2
  }`;

  function expandSpeedLine(selectionId) {
    const startPoint = parseInt(envelopeXStart) - 10;
    d3.select(`#${selectionId}`)
      .attr("x2", startPoint)
      .attr("x1", startPoint)
      .transition()
      .duration(500)
      .attr("x2", startPoint)
      .attr("x1", 0);
  }

  return (
    <>
      <Grid container spacing={4}>
        <Grid item xs={9} className="homePageTextContainerLeft">
          <Typography variant="h2">Welcome</Typography>
          <Typography variant="h5">
            To the Postal Regulatory Commission's Service Performance Dashboard
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
            <p className="homePageTextIdentifier">
              TextID: Dashboard Description
            </p>
            The Postal Regulatory Commission has launched an interactive
            dashboard that provides visual data and interactive tools to allow
            the public to view service performance of many USPS products.
          </Typography>
        </Grid>
      </Grid>

      <Grid container spacing={4} className="homePageTextContainerLeft">
        <Grid item xs={7}>
          <Typography variant="h5">What is Service Performance?</Typography>
          <br />
          <Typography variant="h6">
            <p className="homePageTextIdentifier">
              TextID: Service Description
            </p>
            The Percentage of mailpieces that are delivered on time. Every
            mailpiece handled by USPS has a service performance target. To
            calculate a service performance score, a sample of mailpieces is
            taken for a particular mail product, say Marketing Mail Letters. If
            the service performance target for Marketing Mail letters is 91.8
            percent, and out of the sample only 89.6 percent of Marketing Mail
            letters were delivered on time, then the marketing mail product
            missed its target by 2.2 percentage points.
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <HomePageContactInfo />
        </Grid>
      </Grid>

      <Grid container spacing={4} className="homePageTextContainerLeft">
        <Grid item xs={5}>
          <Paper elevation={3} id="linksContainer">
            <Typography variant="h5">Additional Resources</Typography>
            <br />
            <Typography variant="h6">
              <p className="homePageTextIdentifier">TextID: Links</p>
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
              <Divider />
              <br />
              <Link
                href="https://www.prc.gov/dockets/document/112730"
                className="homePageLink"
              >
                Another Link?
              </Link>
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      <Grid container spacing={4} className="homePageTextContainerLeft">
        <Grid item xs={7}>
          <Typography variant="h6"> Disclosure: </Typography>
          <p className="homePageTextIdentifier">TextID: Disclosure Section</p>
          <Typography variant="body1">
            This dashboard is merely created to provide information to the
            public. It is not used to determine compliance. Lawyers can have a
            field day in this section describing what this dashboard is and what
            this dashboard is not. This might also be a good place to talk about
            how we define “products” differently here because they don’t line up
            with the CRA. I’ll just fill this in with one more sentence, so it
            looks like we have some actual substance.
          </Typography>
        </Grid>
      </Grid>

      <br />
      <br />
      <HomePageFooter />
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

const HomePageFooter = () => {
  return (
    <div id="homePageFooter">
      <div id="footerLogoAndName">
        <div id="footerLogoContainer">
          <a href="https://www.prc.gov">
            <Logo />
          </a>
        </div>
        <div id="footerPRCNameContainer">
          <p className="footerPRC">Postal </p>
          <p className="footerPRC">Regulatory </p>
          <p className="footerPRC">Commission</p>
        </div>
        <div id="footerAddressContainer">
          <p className="footerPRC"> 901 New York Ave NW </p>
          <p className="footerPRC">Suite 200</p>
          <p className="footerPRC"> Washington, DC 20268</p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
