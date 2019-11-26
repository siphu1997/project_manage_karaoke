import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as manageAccount from "../action/manageAccountAction";
import { Box, CircularProgress } from "@material-ui/core";
import MaterialTable from "material-table";
import api from "../common/apiService";
import { formatDataRoomCTS } from "../common/format";
import { withSnackbar } from "notistack";

class ManageAccount extends Component {
  doFetchData = () => {
    const { isAuth, manageAccount } = this.props;
    if (isAuth) {
      if (manageAccount.data === null) {
        this.props.manageAccount.doFetch();
      }
    }
  };

  showNotificate = (message, type) => {
    this.props.enqueueSnackbar(message, {
      variant: type,
      preventDuplicate: true
    });
  };
  componentDidMount = () => {
    this.doFetchData();
  };
  render() {
    const { manageAccount } = this.props;
    // const formatColumns = [
    //   {
    //     title: "ID",
    //     field: "roomId",
    //     editable: "never",
    //     grouping: false,
    //     defaultSort: "asc"
    //   },
    //   {
    //     title: "Tên",
    //     field: "roomName",
    //     grouping: false,
    //     initialEditValue: "P."
    //   },
    //   {
    //     title: "Loại",
    //     field: "roomType",

    //     lookup: manageAccount.roomType ? manageAccount.roomType.dataType : []
    //   },
    //   {
    //     title: "Giá",
    //     field: "roomType",
    //     lookup: manageAccount.roomType ? manageAccount.roomType.dataPrice : [],
    //     editable: "never",
    //     type: "currency",
    //     currencySetting: {
    //       currencyCode: "VND",
    //       locale: "vi-VN",
    //       minimumFractionDigits: 0,
    //       maximumFractionDigits: 2
    //     }
    //     // render: rowData =>
    //     //   rowData ? (
    //     //     // <CurrencyFormat
    //     //     //   value={rowData.roomPrice}
    //     //     //   displayType={"text"}
    //     //     //   thousandSeparator={true}
    //     //     //   suffix=" VND"
    //     //     // />
    //     //     `${currencyFormatter.format(rowData.roomPrice, { code: 'VND' })}`
    //     //   ) : (
    //     //     ""
    //     //   )
    //   },
    //   {
    //     title: "Trạng thái",
    //     field: "isActive",
    //     type: "boolean",
    //     editable: "onUpdate"
    //   },
    //   {
    //     title: "Hoạt động",
    //     field: "isUsing",
    //     type: "boolean",
    //     editable: "onUpdate"
    //   }
    // ];
    // if (manageAccount.loading) {
    //   return (
    //     <Box width="100%" justifyContent="center" mt={10} display="flex">
    //       <CircularProgress />
    //     </Box>
    //   );
    // }

    return (
      <Box padding={2}>
        {manageAccount.data && (
          <MaterialTable
            data={manageAccount.data}
            title="Quản lý phòng"
            options={{
              actionsColumnIndex: -1,
              grouping: true,
              pageSize: 10
            }}
            // columns={formatColumns}
            editable={{
              onRowAdd: newData => {
                console.log(newData);
                // console.log(this);
                return api
                  .createNewRoom(newData.roomName, newData.roomType)
                  .then(res => {
                    console.log(res);
                    console.log(this);
                    const { data } = res.data;
                    const customData = {
                      isUsing: data.is_using === 1 ? true : false,
                      isActive: data.status === 1 ? true : false,
                      roomId: data.room_id,
                      roomName: data.room_name,
                      roomPrice: data.roomtype.roomtype_price,
                      roomType: data.roomtype.roomtype_id
                    };
                    this.addNewData(customData);
                    this.showNotificate("Thêm mới thành công", "success");
                  })
                  .catch(error => {
                    console.log(new Error(error));
                  });
              },
              onRowUpdate: (newData, oldData) => {
                if (newData === oldData) {
                  return Promise.resolve();
                }
                return api
                  .updateRoom(formatDataRoomCTS(newData))
                  .then(res => {
                    const { data } = res.data;
                    const customData = {
                      isUsing: data.is_using === 1 ? true : false,
                      isActive: data.status === 1 ? true : false,
                      roomId: data.room_id,
                      roomName: data.room_name,
                      roomPrice: data.roomtype.roomtype_price,
                      roomType: data.roomtype.roomtype_id
                    };
                    // this.props.manageAccount.addNewData(data);
                    this.props.manageAccount.addNewDataUpdate(customData);
                    this.showNotificate("Cập nhật thành công", "success");
                  })
                  .catch(error => {
                    console.log(new Error(error));
                    // console.log(error.response.data);
                    // this.showNotificate(error.response.data.message, "error");
                    this.showNotificate("Cập nhật thất bại", "error");
                  });
              },
              onRowDelete: oldData => {
                return api
                  .deleteRoom(oldData.roomId)
                  .then(res => {
                    console.log(res);
                    this.showNotificate("Xóa thành công", "success");
                  })
                  .catch(error => {
                    console.log(new Error(error));
                    // console.log(error.response.data);
                    // this.showNotificate(error.response.data.message, "error");
                    this.showNotificate(
                      "Xóa không thành công thất bại",
                      "error"
                    );
                  });
              }
            }}
            localization={{
              body: {
                editRow: {
                  deleteText: "Bạn chắc chắn muốn xóa phòng này ?",
                  saveTooltip: "Đồng ý",
                  cancelTooltip: "Hủy"
                }
              },
              toolbar: {
                searchTooltip: "Tìm kiếm",
                searchPlaceholder: "Tìm kiếm"
              },
              pagination: {
                labelRowsSelect: "Dòng",
                labelDisplayedRows: " {from}-{to} của {count}",
                firstTooltip: "Trang đầu",
                previousTooltip: "Trang trước",
                nextTooltip: "Trang tiếp",
                lastTooltip: "Trang cuối"
              },
              grouping: {
                placeholder: "Kéo tựa đề  cột vào để  nhóm kết quả "
              }
            }}
          />
        )}
      </Box>
    );
  }
}

const mapStateToProps = state => ({
  isAuth: state.auth.isAuth,
  manageAccount: state.manageAccount
});

const mapDispatchToProps = dispatch => ({
  manageAccount: bindActionCreators(manageAccount, dispatch)
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withSnackbar(ManageAccount));
