import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as manageMenuAction from "../action/manageMenuAction";
import { Box, Typography, Zoom, CircularProgress } from "@material-ui/core";
import MaterialTable from "material-table";
import api from "../common/apiService";
import { withSnackbar } from "notistack";
import currencyFormatter from "currency-formatter";

class ManageMenu extends Component {
  doFetchData = () => {
    const { isAuth, manageMenu, manageMenuAction } = this.props;
    if (isAuth) {
      if (manageMenu.data === null) {
        manageMenuAction.doFetch();
      }
    }
  };

  showNotificate = (message, type) => {
    this.props.enqueueSnackbar(message, {
      variant: type,
      preventDuplicate: true
    });
  };

  printError = error => {
    const { errors, message } = error.response.data;
    if (errors && errors.length > 0) {
      errors.forEach(item => {
        this.showNotificate(item, "error");
      });
    }

    if (message) {
      this.showNotificate(message, "error");
    }
  };

  componentDidMount = () => {
    this.doFetchData();
  };
  render() {
    const { manageMenu, manageMenuAction } = this.props;
    const formatColumns = [
      {
        title: "ID",
        field: "id",
        editable: "never",
        grouping: false,
        defaultSort: "asc"
      },
      {
        title: "Tên",
        field: "name",
        grouping: false
      },
      {
        title: "Loại",
        field: "type"
      },
      {
        title: "Đơn vị",
        field: "unit"
      },
      {
        title: "Giá",
        field: "price",
        grouping: false,
        render: rowData =>
          rowData
            ? `${currencyFormatter.format(rowData.price, { code: "VND" })}`
            : ""
      },
      {
        title: "Trạng thái",
        field: "status",
        type: "boolean",
        editable: "onUpdate"
      }
    ];

    if (manageMenu.loading) {
      return (
        <Box width="100%" justifyContent="center" mt={10} display="flex">
          <CircularProgress />
        </Box>
      );
    }

    return (
      <Box padding={2}>
        {manageMenu.data && (
          <Zoom in={true}>
            <MaterialTable
              data={manageMenu.data}
              title="Quản Menu"
              options={{
                actionsColumnIndex: -1,
                grouping: true,
                pageSize: 10
              }}
              columns={formatColumns}
              editable={{
                onRowAdd: newData => {
                  return api
                    .createNewMenu(newData)
                    .then(res => {
                      const { data } = res.data;
                      manageMenuAction.doAddNewMenu(data);
                      this.showNotificate("Thêm mới thành công", "success");
                    })
                    .catch(error => {
                      this.showNotificate("Thêm mới không thành công", "error");
                      console.log(new Error(error));
                      this.printError(error);
                      return new Promise.reject();
                    });
                },
                onRowUpdate: (newData, oldData) => {
                  if (newData === oldData) {
                    return Promise.resolve();
                  }
                  return api
                    .updateMenu(newData)
                    .then(res => {
                      const { data } = res.data;
                      manageMenuAction.doUpdateMenu(data);
                      this.showNotificate("Cập nhật thành công", "success");
                    })
                    .catch(error => {
                      console.log(new Error(error));
                      // console.log(error.response.data);
                      // this.showNotificate(error.response.data.message, "error");
                      this.showNotificate("Cập nhật thất bại", "error");
                      this.printError(error);
                    });
                },
                onRowDelete: oldData => {
                  return api
                    .deleteMenu(oldData.id)
                    .then(res => {
                      this.showNotificate("Xóa thành công", "success");
                      this.props.manageMenuAction.deleteMenu(oldData.id);
                    })
                    .catch(error => {
                      console.log(new Error(error));
                      // console.log(error.response.data);
                      // this.showNotificate(error.response.data.message, "error");
                      this.showNotificate("Xóa thất bại", "error");
                      this.printError(error);
                    });
                }
              }}
              localization={{
                body: {
                  editRow: {
                    deleteText: "Bạn chắc chắn muốn xóa thực đơn này ?",
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
          </Zoom>
        )}
      </Box>
    );
  }
}

const mapStateToProps = state => ({
  isAuth: state.auth.isAuth,
  manageMenu: state.manageMenu
});

const mapDispatchToProps = dispatch => ({
  manageMenuAction: bindActionCreators(manageMenuAction, dispatch)
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withSnackbar(ManageMenu));
