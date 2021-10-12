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
        style={{ marginRight: "2rem" }}
        class="nav-link"
        href="https://twitter.com/postalregulator?lang=en.gov"
      >
        PRC Twitter
      </Link>

      <a
        href="https://twitter.com/share?ref_src=twsrc%5Etfw"
        class="twitter-share-button"
        data-show-count="false"
      >
        Tweet this Page
      </a>
      <script
        async
        src="https://platform.twitter.com/widgets.js"
        charset="utf-8"
      ></script>
    </div>
  );
};

export default PRCLinks;
