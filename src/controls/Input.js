import { TextField } from "@material-ui/core";
import React from "react";

function Input(props) {
    const { name, label,type, value,error=null, onChange } = props;
  return (
    <TextField
    variant="outlined"
    label={label}
    name={name}
    type={type}
    value={value}
    onChange={onChange}
    {...(error && {error:true,helperText:error})}
    />
  );
}

export default Input;
