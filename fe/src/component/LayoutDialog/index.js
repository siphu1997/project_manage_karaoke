import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import InfoDialog from "./Info";
import AddDialog from "./Add";
import EditDialog from "./Edit";
import OrderDialog from "./Order";
import PaymentDialog from "./Payment";
import { Divider } from "@material-ui/core";

const getLayout = (action, props) => {
  switch (action) {
    case "add":
      return <AddDialog {...props} />;
    case "edit":
      return <EditDialog {...props} />;
    case "order":
      return <OrderDialog {...props} />;
    case "payment":
      return <PaymentDialog {...props} />;

    default:
      return <InfoDialog {...props} />;
  }
};

const getTitle = action => {
  switch (action) {
    case "add":
      return "Thêm phòng mới";
    case "edit":
      return "Chỉnh sửa thông tin";
    case "order":
      return "Thêm món ăn";
    case "payment":
      return "Thanh toán";

    default:
      return "Thông tin phòng";
  }
};

export default function LayoutDialog(props) {
  const { isOpen, handleClose, idRoom, action } = props;
  return (
    <div>
      <Dialog
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        fullWidth
        maxWidth="md"
      >
        <DialogTitle id="form-dialog-title">{getTitle(action)}</DialogTitle>
        <Divider />
        <DialogContent>{getLayout(action, props)}</DialogContent>
        <Divider />
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Hủy
          </Button>
          <Button onClick={handleClose} color="secondary" variant="contained">
            Đồng ý
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
