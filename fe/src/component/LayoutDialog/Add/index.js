import React from "react";
import { TextField, MenuItem, Grid } from "@material-ui/core";

const allInput = [
  {
    id: "customer-name",
    label: "Tên khách",
    required: true
  },
  {
    id: "tel",
    label: "Sô điện thoại",
    required: true,
    type: "tel",
    inputProps: {
      minLength: 9,
      maxLength: 11
    }
  },
  {
    id: "number-people",
    label: "Sô lượng khách",
    required: true,
    type: "number",
    inputProps: {
      min: 0,
      max: 50
    }
  },
  {
    id: "room-type",
    label: "Loại phòng",
    required: true,
    select: true,
    value: 0,
    children: [
      {
        label: "Thường",
        value: 0
      },
      {
        label: "VIP",
        value: 1
      }
    ]
  }
];

export default function index() {
  return (
    <Grid container spacing={3}>
      {/* <DialogContentText>
        To subscribe to this website, please enter your email address here. We
        will send updates occasionally.
      </DialogContentText> */}

      {allInput.map((item, index) => (
        <Grid item xs={4} key={index}>
          <TextField
            fullWidth
            color="secondary"
            autoFocus={index === 0 ? true : false}
            margin="dense"
            {...item}
          >
            {item.children &&
              item.children.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
          </TextField>
        </Grid>
      ))}
    </Grid>
  );
}
