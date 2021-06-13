import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import axios from "../../axios-base";
import { Collapse } from "@material-ui/core";
import * as myAction from "../../action/myAction";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

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

const SingleMenu = (props) => {
  const classes = useStyles();
  const { database, allSchema } = props;
  const { displayData } = props.tableJsonAction;
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
    displayData([], database, undefined, undefined);
  };

  const showTableHandler = (tableName) => {
    var data = { database: database, tableName: tableName };
    axios
      .post("showTable", data)
      .then((res) => {
        displayData(res.data, database, tableName);
      })
      .catch((err) => console.log(err));
  };

  return (
    <List
      component="nav"
      aria-labelledby="nested-list-subheader"
      className={classes.root}
    >
      <ListItem button onClick={handleClick}>
        <ListItemText primary={database} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {Object.keys(allSchema[database]).map((index) => {
            return (
              <ListItem
                button
                onClick={() => showTableHandler(allSchema[database][index])}
                className={classes.nested}
              >
                <ListItemText primary={allSchema[database][index]} />
              </ListItem>
            );
          })}
        </List>
      </Collapse>
    </List>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    tableJsonAction: bindActionCreators(myAction, dispatch),
  };
};

const mapStateToProps = (state) => {
  return {
    jsonArray: state.jsonArray,
    databaseName: state.databaseName,
    tableName: state.tableName,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleMenu);
