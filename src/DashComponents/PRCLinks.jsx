import Link from "@material-ui/core/Link";

export const PRCLinks = () => {
  return (
    <div style={{ marginBottom: "2rem" }}>
      <Link
        class="nav-link"
        href="https://www.prc.gov"
        style={{ marginRight: "2rem", marginLeft: "-20rem" }}
      >
        PRC.gov
      </Link>

      <Link
        class="nav-link"
        href="https://twitter.com/postalregulator?lang=en.gov"
      >
        PRC Twitter
      </Link>
    </div>
  );
};

export default PRCLinks;
