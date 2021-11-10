import LinkedInIcon from "@material-ui/icons/LinkedIn";
import TwitterIcon from "@material-ui/icons/Twitter";
import { ReactComponent as Logo } from "../Design/prcIcon.svg";

export const Footer = () => {
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
        <div id="iconAndLinkContainer">
          <div id="iconsContainer">
            <a
              target="_blank"
              href="https://www.linkedin.com/company/postal-regulatory-commission/mycompany/"
              className="iconLink"
            >
              <LinkedInIcon />
            </a>

            <a
              target="_blank"
              href="https://twitter.com/postalregulator?lang=en.gov"
              className="iconLink"
            >
              <TwitterIcon />
            </a>
          </div>
          <a
            id="tweetPageLink"
            href="https://twitter.com/share?ref_src=twsrc%5Etfw"
            class="twitter-share-button"
            data-show-count="false"
            target="_blank"
          >
            Tweet this Page
          </a>
        </div>
      </div>

      <div id="footerDisclosureContainer">
        <p className="footerPRC" id="footerDisclosure">
          The information contained on this webpage or beta dashboard is for
          general information purposes only. This dashboard provides some of,
          but not all, the official information reported by the Postal Service
          and used by the Commission in its last 2 Annual Compliance Review
          proceedings (Docket Nos. ACR2019 and ACR2020). Each year, as required
          by the Postal Accountability and Enhancement Act (PAEA), the
          Commission reviews the Postal Service’s service performance in the
          Annual Compliance Review. After evaluating the data provided by the
          Postal Service during the Annual Compliance Review, the Commission
          must issue a written determination as to “whether any service
          standards in effect during such year were not met.” 39 U.S.C.
          3653(b)(2). This Annual Compliance Determination (ACD) is a public
          report issued by the Commission on approximately March 28 of each
          year. Any discrepancies and characterizations that appear on this
          dashboard that may be inconsistent with the Commission’s ACDs, do not
          change or alter the Commission’s official ACD determinations.{" "}
        </p>
      </div>
    </div>
  );
};

export default Footer;
