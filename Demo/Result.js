import { Box, Tab, Tabs, Typography } from "@material-ui/core";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Table from "./Table";
import * as myAction from "../../action/myAction";

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
};

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

const ResultTab = (props) => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  console.log(props.message);

  return (
    <div className={classes.root}>
      {/* <AppBar position="static"> */}
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="simple tabs example"
      >
        <Tab label="Result" {...a11yProps(0)} />
        <Tab label="Table" {...a11yProps(1)} />
      </Tabs>
      {/* </AppBar> */}
      <TabPanel value={value} index={0}>
        <Typography>{props.message}</Typography>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Table />
      </TabPanel>
    </div>
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
    message: state.message,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ResultTab);
