import {
  Drawer as MUIDrawer,
  List,
  ListItemText,
  ListItem,
  Divider,
} from "@material-ui/core";

import { withRouter } from "react-router-dom";

const Drawer = (props) => {
  const { history } = props;

  const mailClassNames = [
    {
      text: "First Class",
      onClick: () => history.push("/first-class"),
    },
    {
      text: "Marketing Mail",
      onClick: () => history.push("/marketing-mail"),
    },
    {
      text: "Periodicals",
      onClick: () => history.push("/periodicals"),
    },
    {
      text: "Package Services",
      onClick: () => history.push("/package-services"),
    },
    {
      text: "Special Services",
      onClick: () => history.push("/special-services"),
    },
  ];

  const homeName = [
    {
      text: "All Market Dominant",
      onClick: () => history.push("/all-md"),
    },
  ];

  return (
    <MUIDrawer variant="permanent">
      <List>
        {homeName.map((item, index) => {
          const { text, onClick } = item;

          return (
            <ListItem button key={text} onClick={onClick}>
              <ListItemText primary={text} />
            </ListItem>
          );
        })}
      </List>

      <Divider />
      <List>
        {mailClassNames.map((item, index) => {
          const { text, onClick } = item;

          return (
            <ListItem button key={text} onClick={onClick}>
              <ListItemText primary={text} />
            </ListItem>
          );
        })}
      </List>
    </MUIDrawer>
  );
};

export default withRouter(Drawer);
