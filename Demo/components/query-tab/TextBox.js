import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Input,
} from "@material-ui/core";
import BackupIcon from "@material-ui/icons/Backup";
import axios from "../../axios-base";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import * as myAction from "../../action/myAction";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

const TextBox = (props) => {
  const [text, setText] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [fileData, setFileData] = React.useState(null);
  const { displayData } = props.tableJsonAction;

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleLoadFile = (event) => {
    //console.log(event.target.files[0]);
    setFileData(event.target.files[0]);
  };

  const handleUpload = () => {
    const formData = new FormData();
    formData.append("fileUpload", fileData);
    axios.post("uploadFile", formData).then((response) => {
      if (response.data !== "ERROR") {
        console.log("yes");
      } else {
        alert("Error While Uploading the Image");
      }
    });
  };

  const runScript = () => {
    if (text.substring(0, 3) === "USE" || text.substring(0, 3) === "use") {
      if (text.split(";").length > 1 && text.split(";")[1] !== "") {
        alert("oto parbo na");
      } else {
        if (text.charAt(text.length - 1) === ";") {
          setText(text.substring(0, text.length - 1));
        }
        if (text.split(" ").length === 2) {
          var data = { query: text };
          var successMessage =
            "1 queries executed, 1 success, 0 errors, 0 warnings\nQuery: " +
            text;
          axios
            .post("checkDB", data)
            .then((res) => {
              if (res.data.success === true) {
                displayData([], text.split(" ")[1], undefined, successMessage);
              }
            })
            .catch((err) => console.log(err));
        }
      }
    } else {
      if (props.databaseName === undefined) {
        alert("Please select a database");
      } else {
        var sqldata = { script: text, database: props.databaseName };
        axios
          .post("executeQuery", sqldata)
          .then((res) => {
            if (res.data.success === true && res.data.isTable === true) {
              displayData(res.data, props.databaseName, res.data.tableName);
            }
          })
          .catch((err) => console.log(err));
      }
    }
  };

  return (
    <Grid container>
      <Grid item xs={11}>
        <textarea
          name="textValue"
          value={text}
          style={{
            height: "180px",
            width: "72vw",
            borderBlockColor: "black",
            marginLeft: "10px",
          }}
          onChange={(event) => handleTextChange(event)}
        />
      </Grid>
      <Grid item xs={1}>
        <Button variant="outlined" color="primary" onClick={runScript}>
          <PlayArrowIcon />
        </Button>
        <Button
          variant="outlined"
          color="primary"
          style={{ marginTop: "10px" }}
          onClick={handleClickOpen}
        >
          <BackupIcon />
        </Button>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Upload SQL File</DialogTitle>
          <DialogContent>
            <DialogContentText>only sql file is accepted</DialogContentText>
            <Input
              type="file"
              margin="dense"
              id="sqlFile"
              label="SQL File:"
              fullWidth
              onChange={(event) => handleLoadFile(event)}
            />
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
      </Grid>
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

export default connect(mapStateToProps, mapDispatchToProps)(TextBox);
