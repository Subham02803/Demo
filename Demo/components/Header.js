import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

const Header = (props) => {
  //const [open, setOpen] = React.useState(true);

  return <div style={{ color: "blue" }}>My SQL</div>;
};

export default Header;
