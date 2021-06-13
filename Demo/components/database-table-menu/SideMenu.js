import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import ListSubheader from "@material-ui/core/ListSubheader";
import List from "@material-ui/core/List";
import axios from "../../axios-base";
import SingleMenu from "./SingleMenu";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from "@material-ui/core";
import SyncIcon from "@material-ui/icons/Sync";

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

const SlideMenu = (props) => {
  const classes = useStyles();
  const [data, setData] = React.useState({});
  const [checkSQL, setCheckSQL] = React.useState(false);

  useEffect(() => {
    loadDatabased();
  }, []);

  const loadDatabased = () => {
    axios
      .get("getAllDataBases")
      .then((response) => {
        setData(response.data.rows.data);
        setCheckSQL(response.data.rows.checkSQL);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleClose = () => {
    setCheckSQL(false);
  };

  const handleUpload = () => {
    var formData = {};
    axios
      .post("addSQLQueryTable", formData)
      .then((response) => {
        if (response.data !== "ERROR") {
          alert("success");
        } else {
          alert("Error While Uploading the Image");
        }
      })
      .catch((err) => {
        alert("error");
      });
  };

  return (
    <div>
      <List
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader
            component="div"
            id="nested-list-subheader"
            style={{ display: "flex", flexDirection: "row" }}
          >
            <Typography>Databases</Typography>
            <Button
              variant="outlined"
              color="primary"
              style={{ marginLeft: "12px" }}
              onClick={loadDatabased}
            >
              <SyncIcon style={{ fontSize: 15 }} />
            </Button>
          </ListSubheader>
        }
        className={classes.root}
      >
        {Object.keys(data).map((item) => {
          return <SingleMenu database={item} allSchema={data} />;
        })}
      </List>
      <Dialog
        open={checkSQL}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Upload SQL File</DialogTitle>
        <DialogContent>
          <DialogContentText>
            You do not have sql_file_table please click on sql execute
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleUpload} color="primary">
            Execute
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default SlideMenu;
