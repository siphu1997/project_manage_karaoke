import HomeCtn from "./container/HomeCtn";
import LoginCtn from "./container/LoginCtn";
import NoMatch from "./component/NoMatch";
import Dashboard from "./container/Dashboard";
import ManageRoom from "./container/ManageRoom";
import ManageStaff from "./container/ManageStaff";
import ManageMenu from "./container/ManageMenu";

const routes = [
  {
    exact: true,
    path: "/",
    component: HomeCtn,
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
    path: "/:tab",
    component: HomeCtn,
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
        component: NoMatch
      }
    ]
  },

  {
    component: NoMatch
  }
];

export const links = [
  {
    label: "Dashboard",
    url: "/dashboard"
  },
  {
    label: "Quản lý phòng",
    url: "/manage-room"
  },
  {
    label: "Quản lý nhân viên",
    url: "/manage-staff"
  },
  {
    label: "Quản lý món ăn",
    url: "/manage-menu"
  }
];

export default routes;
