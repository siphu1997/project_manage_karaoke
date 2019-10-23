import React, { Fragment } from "react";
import { DialogContentText, TextField, MenuItem } from "@material-ui/core";

const allInput = [
  {
    id: "name",
    label: "Tên Phòng"
  }
];
export default function index() {
  return (
    <Fragment>
      {/* <DialogContentText>
        To subscribe to this website, please enter your email address here. We
        will send updates occasionally.
      </DialogContentText> */}

      <TextField
        autoFocus
        margin="dense"
        id="name"
        label="Tên khách"
        type="email"
      />
      <TextField
        autoFocus
        margin="dense"
        id="name"
        label="Loại phòng"
        type="email"
        select
      >
        {[
          {
            label: "VIP",
            value: 1
          },
          {
            label: "Thường",
            value: 0
          }
        ].map(option => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
    </Fragment>
  );
}
