import React from "react";
import { makeStyles } from "@mui/styles";
import { Drawer, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { List } from "@mui/material";
import { AddCircleRounded, Note } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
const useLayoutStyle = makeStyles({
  layoutPage: {
    width: 245,
    background: "#f9f9f9",
  },
  drawer: {
    width: 245,
  },
  myPaper: {
    width: 235,
  },
  layout: {
    display: "flex",
  },
});
const AppLayout = ({ children }) => {
  const drawerItems = [
    {
      title: "Create Note",
      path: "/create",
      icon: <AddCircleRounded color="primary" />,
    },
    {
      title: "My Notes",
      path: "/",
      icon: <Note color="primary" />,
    },
  ];
  const classes = useLayoutStyle();
  const navigate = useNavigate();
  return (
    <div className={classes.layout}>
      <div>
        <Drawer
          className={classes.drawer}
          anchor="left"
          variant="permanent"
          // Overriding css with classes.
          //draweer has paper class
          classes={{ paper: classes.myPaper }}
        >
          <List key={"listl"}>
            {drawerItems.map((item) => (
              <ListItem
                id={item.text}
                button
                key={item.text}
                onClick={() => navigate(item.path)}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText>{item.title}</ListItemText>
              </ListItem>
            ))}
          </List>
        </Drawer>
      </div>
      <div> {children}</div>
    </div>
  );
};

export default AppLayout;
