import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { withRouter, Route, Switch, BrowserRouter } from "react-router-dom";

const DashContents = (props) => {
  const { history } = props;

  const mailClassNames = [
    {
      text: "USPS service performance results for all Market Dominant product components",
      onClick: () => history.push("/all-md"),
    },
    {
      text: "USPS service performance results for First-Class Mail product components",
      onClick: () => history.push("/first-class"),
    },
    {
      text: "USPS service performance results for Marketing Mail",
      onClick: () => history.push("/marketing-mail"),
    },
    {
      text: "USPS service performance results for Periodicals",
      onClick: () => history.push("/periodicals"),
    },
    {
      text: "USPS service performance results for Package Services",
      onClick: () => history.push("/package-services"),
    },
    {
      text: "USPS service performance results for Special Services",
      onClick: () => history.push("/special-services"),
    },
  ];

  return (
    <List>
      {mailClassNames.map((item, index) => {
        const { text, onClick } = item;

        return (
          <ListItem button key={`contents_${index}`} onClick={onClick}>
            <p className="contentsListItem">{text} </p>
          </ListItem>
        );
      })}
    </List>
  );
};

export default withRouter(DashContents);
