import React from "react";
import HomeCtn from "./container/HomeCtn";
import LoginCtn from "./container/LoginCtn";
import NoMatch from "./component/NoMatch";
import Dashboard from "./container/Dashboard";
import ManageRoom from "./container/ManageRoom";
import ManageStaff from "./container/ManageStaff";
import ManageMenu from "./container/ManageMenu";
import ManageRoomStaff from "./container/ManageRoomStaff";

import { Redirect } from "react-router-dom";
const RedirectCpn = () => <Redirect to="/nomatch" />;
const routes = [
  {
    exact: true,
    path: "/",
    component: HomeCtn,
    isPrivate: true,
    routes: [
      {
        component: Dashboard
      }
    ]
  },
  {
    path: "/login",
    component: LoginCtn
    // routes: [
    //   {
    //     path: "/tacos/bus",
    //     component: Bus
    //   },
    //   {
    //     path: "/tacos/cart",
    //     component: Cart
    //   }
    // ]
  },
  {
    exact: true,
    path: "/nomatch",
    component: NoMatch
  },
  {
    path: "/:tab",
    component: HomeCtn,
    isPrivate: true,
    routes: [
      {
        path: "/dashboard",
        component: Dashboard
      },
      {
        path: "/manage-room",
        component: ManageRoom
      },
      {
        path: "/manage-staff",
        component: ManageStaff
      },
      {
        path: "/manage-menu",
        component: ManageMenu
      },
      {
        path: "/book-room",
        component: ManageRoomStaff
      },
      {
        component: RedirectCpn
      }
    ]
  },
  {
    component: NoMatch
  }
];

export const linkstaff = [
  {
    label: "Đặt phòng",
    url: "/book-room",
    icon: "room_service"
  }
];

export const linkadmin = [
  {
    label: "Dashboard",
    url: "/dashboard",
    icon: "trending_up"
  },
  {
    label: "Quản lý phòng",
    url: "/manage-room",
    icon: "home"
  },
  {
    label: "Quản lý nhân viên",
    url: "/manage-staff",
    icon: "supervisor_account"
  },
  {
    label: "Quản lý món ăn",
    url: "/manage-menu",
    icon: "fastfood"
  }
];

export default routes;
