import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as manageRoomAction from "../action/manageRoomAction";
import { Box, CircularProgress } from "@material-ui/core";
import MaterialTable from "material-table";
import api from "../common/apiService";
class ManageRoom extends Component {
  doFetchData = () => {
    const { isAuth, manageRoom } = this.props;
    if (isAuth) {
      if (manageRoom.data === null) {
        this.props.manageRoomAction.doFetch();
      }
    }
  };

  componentDidMount = () => {
    this.doFetchData();
  };
  render() {
    const { manageRoom } = this.props;
    const formatColumns = [
      { title: "ID", field: "roomId", editable: "never", grouping: false },
      { title: "Tên", field: "roomName", grouping: false },
      {
        title: "Loại",
        field: "roomType",

        // lookup: { 1: "Thường", 2: "VIP" }
        lookup: manageRoom.roomType ? manageRoom.roomType.dataType : []
      },
      {
        title: "Giá",
        field: "roomType",
        lookup: manageRoom.roomType ? manageRoom.roomType.dataPrice : [],
        editable: "never",
        type: "currency",
        currencySetting: {
          currencyCode: "VND",
          locale: "vi-VN",
          minimumFractionDigits: 0,
          maximumFractionDigits: 2
        }
        // render: rowData =>
        //   rowData ? (
        //     // <CurrencyFormat
        //     //   value={rowData.roomPrice}
        //     //   displayType={"text"}
        //     //   thousandSeparator={true}
        //     //   suffix=" VND"
        //     // />
        //     `${currencyFormatter.format(rowData.roomPrice, { code: 'VND' })}`
        //   ) : (
        //     ""
        //   )
      },
      {
        title: "Trạng thái",
        field: "isActive",
        type: "boolean",
        editable: "onUpdate"
      },
      {
        title: "Hoạt động",
        field: "isUsing",
        type: "boolean",
        editable: "onUpdate"
      }
    ];
    if (manageRoom.loading) {
      return (
        <Box width="100%" justifyContent="center" mt={10} display="flex">
          <CircularProgress />
        </Box>
      );
    }

    return (
      <Box padding={2}>
        {manageRoom.data && (
          <MaterialTable
            data={manageRoom.data}
            title="Quản lý phòng"
            options={{
              actionsColumnIndex: -1,
              grouping: true
            }}
            columns={formatColumns}
            editable={{
              onRowAdd: newData => {
                // console.log(newData);
                return api
                  .createNewRoom(newData.roomName, newData.roomType)
                  .then(res => {
                    console.log(res);
                  })
                  .catch(error => {
                    console.log(new Error(error));
                  });
                // new Promise((resolve, reject) => {
                //   setTimeout(() => {
                //     {
                //       /* const data = this.state.data;
                //         data.push(newData);
                //         this.setState({ data }, () => resolve()); */
                //     }
                //     resolve();
                //   }, 1000);
                // })
              },
              onRowUpdate: (newData, oldData) => {
                console.log(newData);
                console.log(oldData);
                return new Promise((resolve, reject) => {
                  setTimeout(() => {
                    {
                      /* const data = this.state.data;
                        const index = data.indexOf(oldData);
                        data[index] = newData;
                        this.setState({ data }, () => resolve()); */
                    }
                    resolve();
                  }, 1000);
                });
              },
              onRowDelete: oldData =>
                new Promise((resolve, reject) => {
                  setTimeout(() => {
                    {
                      /* let data = this.state.data;
                        const index = data.indexOf(oldData);
                        data.splice(index, 1);
                        this.setState({ data }, () => resolve()); */
                    }
                    resolve();
                  }, 1000);
                })
            }}
            localization={{
              body: {},
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
  manageRoom: state.manageRoom
});

const mapDispatchToProps = dispatch => ({
  manageRoomAction: bindActionCreators(manageRoomAction, dispatch)
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManageRoom);
