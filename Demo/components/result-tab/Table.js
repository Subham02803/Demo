import React from "react";

import * as myAction from "../../action/myAction";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button, Grid, Typography } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import FilterListIcon from "@material-ui/icons/FilterList";
import SyncIcon from "@material-ui/icons/Sync";

const Table = (props) => {
  var isTableData = true;
  var columnConfig = [];
  var rows = [];
  if (
    props.jsonArray.columns === undefined &&
    props.jsonArray.rows === undefined
  ) {
    isTableData = false;
  } else {
    var columns = props.jsonArray.columns;
    columns.map((column) => {
      var C = { field: column, headerName: column, width: 200 };
      columnConfig.push(C);
    });
    rows = props.jsonArray.rows;
  }

  return (
    <Grid container>
      <Grid container style={{ height: "20px" }}>
        <Grid item xs={6} style={{ display: "flex", flexDirection: "row" }}>
          {props.databaseName === undefined ? null : (
            <Typography style={{ marginLeft: "10px" }}>
              {"Database Name: " + props.databaseName}
            </Typography>
          )}
          {props.tableName === undefined ? null : (
            <Typography style={{ marginLeft: "10px" }}>
              {"Table Name: " + props.tableName}
            </Typography>
          )}
        </Grid>
        <Grid
          item
          xs={6}
          style={{ display: "flex", flexDirection: "row", paddingLeft: "40px" }}
        >
          <Button variant="outlined" color="primary">
            <FilterListIcon style={{ fontSize: 15 }} />
          </Button>
          <Button
            variant="outlined"
            color="primary"
            style={{ marginLeft: "10px" }}
          >
            <SyncIcon style={{ fontSize: 15 }} />
          </Button>
        </Grid>
      </Grid>
      {isTableData ? (
        <Grid
          item
          xs={12}
          style={{ height: "310px", overflow: "scroll", marginTop: "20px" }}
        >
          <DataGrid
            rows={rows}
            columns={columnConfig}
            pageSize={5}
            checkboxSelection
          />
        </Grid>
      ) : null}
    </Grid>
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

export default connect(mapStateToProps, mapDispatchToProps)(Table);
