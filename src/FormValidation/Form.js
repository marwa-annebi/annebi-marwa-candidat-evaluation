import { Paper, Grid, makeStyles } from "@material-ui/core";
import React, { useState } from "react";
import MuiAlert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import PasswordChecklist from "react-password-checklist";
import Controls from "../controls/Controls";
import { Form, useForm } from "./useForm";
import LinearBuffer from "../LinearBuffer";
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiFormControl-root": {
      width: "50%",
      margin: theme.spacing(1),
    },
  },
  pageContent: {
    marginLeft: "250px",
    marginTop: "100px",

    width: "800px",
    margin: theme.spacing(5),
    padding: theme.spacing(5),
  },
}));
const initialFValues = {
  id: 0,
  name: "",
  email: "",
  password: "",
  Confirm_password: "",
  cin: "",
};
function FormValidation() {
  const [validation, setvalidation] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");

  const [open, setOpen] = React.useState(false);
  const [loading, setloading] = useState(false);
  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ("name" in fieldValues)
      temp.name = fieldValues.name ? "" : "This field is required.";

    if ("email" in fieldValues)
      temp.email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fieldValues.email)
        ? ""
        : "Email is not valid.";
    if ("cin" in fieldValues)
      temp.cin = fieldValues.cin.length == 8 ? "" : "8 numbers required.";

    setErrors({
      ...temp,
    });

    if (fieldValues == values) return Object.values(temp).every((x) => x == "");
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const { values, setValues, errors, setErrors, handleInputChange, resetForm } =
    useForm(initialFValues, true, validate);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      {
        setvalidation("validator Form");
        setOpen(true);
        resetForm();
      }
    }
  };
  const classes = useStyles();
  return (
    <>
      {validation && (
        <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            {validation}
          </Alert>
        </Snackbar>
      )}

      <Paper className={classes.pageContent}>
        <Form className={classes.root}>
          <Grid container>
            <Grid item xs={6}>
              <Controls.Input
                name="cin"
                onChange={handleInputChange}
                error={errors.cin}
                label="cin"
              ></Controls.Input>
              <Controls.Input
                name="name"
                onChange={handleInputChange}
                error={errors.name}
                label="Name"
              ></Controls.Input>

              <Controls.Input
                name="email"
                type="email"
                onChange={handleInputChange}
                error={errors.email}
                label="Email"
              ></Controls.Input>
            </Grid>
            <Grid item xs={6}>
              <Controls.Input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                name="password"
                label="Password"
              ></Controls.Input>

              <Controls.Input
                type="password"
                onChange={(e) => setPasswordAgain(e.target.value)}
                name="Confirm password"
                label="Confirm Password"
              ></Controls.Input>
              <PasswordChecklist
                rules={[
                  "minLength",
                  "specialChar",
                  "number",
                  "capital",
                  "match",
                ]}
                minLength={5}
                value={password}
                valueAgain={passwordAgain}
              />
              <br />
              <div>
                <Controls.Button
                  type="submit"
                  text="Submit"
                  onClick={handleSubmit}
                />
                <Controls.Button text="Reset" color="secondary" type="Reset" />
              </div>
            </Grid>
          </Grid>
        </Form>
      </Paper>
    </>
  );
}

export default FormValidation;
