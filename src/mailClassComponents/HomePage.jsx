import Typography from "@material-ui/core/Typography";
import * as d3 from "d3";
// import { useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import { ReactComponent as Logo } from "../Design/prcIcon.svg";
import DashContents from "./HomePageContents";

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
            <p className="homePageTextIdentifier">TextID: Dashboard Intro</p>
            The Postal Regulatory Commission has launched an interactive
            dashboard that provides visual data and interactive tools to allow
            the public to view the service performance results for many mail
            products delivered by the United States Postal Service (USPS).
          </Typography>
        </Grid>
      </Grid>

      <Grid container spacing={4} className="homePageTextContainerLeft">
        <Grid item xs={7}>
          <Typography variant="h5">About this Dashboard</Typography>
          <br />
          <Typography variant="h6">
            <p className="homePageTextIdentifier">
              TextID: Dashboard Description
            </p>
            <ul>
              <li>
                Every mailpiece handled by USPS has a service performance
                target. This dashboard provides a visual comparison of the
                Postal Service’s Market Dominant products’ on-time delivery with
                the service performance targets established by the USPS.{" "}
              </li>
              <li>
                The public data contained in the dashboard are based on the
                Commission’s Annual Compliance Review and will change throughout
                time as data are updated.
              </li>
              <li>
                The Commission’s dashboard is interactive, allowing users to
                explore and reveal service performance information by hovering
                over data points. When hovering over an element of visual data,
                a pop-up will provide additional information.{" "}
              </li>
            </ul>
          </Typography>
          <br />
          <br />
          <Typography variant="h5">Dashboard Contents</Typography>

          <DashContents />
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
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      <Grid container spacing={4} className="homePageTextContainerLeft">
        <Grid item xs={7}>
          <Typography variant="h6"> Glossary </Typography>
          <Typography variant="h6">
            <p className="homePageTextIdentifier">TextID: Glossary</p>
            <ul>
              <li>
                <span className="undelineMe"> Product component:</span> a
                delivery standard within a product. Within First-Class Mail,
                data is reported by delivery standard. For example, First-Class
                Flats 2 Day and First-Class Flats 3 to 5 day are two distinct
                product components. All other mail classes report data by the
                product. For any visualization that includes mailpieces within
                First-Class Mail and other classes, the group of mailpieces is
                referred to as “product components”.
              </li>
              <li>
                <span className="undelineMe">Service performance score:</span>{" "}
                The percentage of mailpieces failing to meet their performance
                target.{" "}
              </li>
              <li>
                <span className="undelineMe">Service performance target:</span>{" "}
                A goal set by the Postal Service for the percentage on-time
                performance target of a particular product or product component.{" "}
              </li>
            </ul>
          </Typography>
        </Grid>
      </Grid>

      <Grid container spacing={4} className="homePageTextContainerLeft">
        <Grid item xs={7}>
          <Typography variant="h6"> Disclosure: </Typography>
          <p className="homePageTextIdentifier">TextID: Disclosure Section</p>
          <Typography variant="body1">
            The information contained on this webpage or beta dashboard is for
            general information purposes only.
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
