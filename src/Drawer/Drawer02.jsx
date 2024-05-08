import React, { useState } from "react";
import {
  Drawer,
  Button,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
  Box,
} from "@mui/material";
import styles from "./Drawer.module.css";
// import DehazeIcon from "@mui/icons-material/Dehaze";

import { withRouter } from "react-router-dom";

// export const Drawer02 = (props) => {
const Drawer02 = (props) => {
  const { history } = props;
  const [isOpen, setIsOpen] = useState(false);

  function changeDrawer(binaryInput) {
    setIsOpen(binaryInput);
  }

  const mailClassNames = [
    {
      text: "First-Class",
      onClickItem: () => history.push("/first-class"),
    },
    {
      text: "Marketing Mail",
      onClickItem: () => history.push("/marketing-mail"),
    },
    {
      text: "Periodicals",
      onClickItem: () => history.push("/periodicals"),
    },
    {
      text: "Package Services",
      onClickItem: () => history.push("/package-services"),
    },
    {
      text: "Special Services",
      onClickItem: () => history.push("/special-services"),
    },
  ];

  const homeName = [
    {
      text: "Home",
      onClickItem: () => history.push("/home"),
    },
    {
      text: "All Market Dominant",
      onClickItem: () => history.push("/all-md"),
    },
  ];

  function listFunc(inputArray) {
    const listItems = inputArray.map((el, idx) => {
      const { text, onClickItem } = el;
      return (
        <ListItem
          key={text}
          onClick={() => {
            onClickItem();
            changeDrawer(false);
          }}
          className={styles.listItem}
        >
          <ListItemText primary={text} />
        </ListItem>
      );
    });
    return <List>{listItems}</List>;
  }

  const classNav = listFunc(mailClassNames);
  const homeNav = listFunc(homeName);

  const openBtnFunc = (isOpen) => {
    if (!isOpen) {
      return (
        <div className={styles.btnContainer} onClick={() => changeDrawer(true)}>
          <div className={styles.iconLine}></div>
          <div className={styles.iconLine}></div>
          <div className={styles.iconLine}></div>
        </div>
      );
    }
    return <></>;
  };

  const openBtn = openBtnFunc(isOpen);

  return (
    <div className={styles.drawerContainer}>
      <div className={styles.leftDiv}> {openBtn}</div>
      <div className={styles.content}>
        <Drawer anchor="left" open={isOpen} onClose={() => changeDrawer(false)}>
          <Box sx={{ width: "10rem" }}>
            {homeNav}
            <Divider />
            {classNav}
          </Box>
        </Drawer>
      </div>
    </div>
  );
};

export default withRouter(Drawer02);
