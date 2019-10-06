import HomeCtn from "./container/HomeCtn";
import LoginCtn from "./container/LoginCtn";
import NoMatch from "./component/NoMatch";
const routes = [
  {
    exact: true,
    path: "/",
    component: HomeCtn
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
    component: NoMatch
  }
];

export default routes;
