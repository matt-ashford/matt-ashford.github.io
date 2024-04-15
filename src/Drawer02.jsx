import { useEffect, useState } from "react";

import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";

export const Drawer02 = (props) => {
  const [state, setState] = useState({
    left: false,
  });

  const toggleDrawer = (open) => () => {
    setState({ ...state, left: open });
  };

  const list = () => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemText primary="Open Drawer" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <div>
      <Button onClick={toggleDrawer(true)}>Open Drawer</Button>
      <Drawer anchor="left" open={state.left} onClose={toggleDrawer(false)}>
        <ul>
          <li>item</li>
          <li>item</li>
          <li>item</li>
          <li>item</li>
        </ul>
        {list()}
      </Drawer>
    </div>
  );
};

export default Drawer02;
