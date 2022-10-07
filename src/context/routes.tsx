import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faRightToBracket,
  faDashboard,
  faStore,
  faBagShopping,
} from "@fortawesome/free-solid-svg-icons";
import { lazy } from "react";

const Authentication = lazy(
  () => import("@/pages/Authentication/Authentication.page")
);
const Home = lazy(() => import("@/pages/Home/Home.page"));
const Dashboard = lazy(() => import("@/pages/Dashboard/Dashboard.page"));
const Stores = lazy(() => import("@/pages/Dashboard/pages/Stores/Stores"));
const Items = lazy(() => import("@/pages/Dashboard/pages/Items/Items"));
export const BasicRoutes = [
  {
    name: "Authentication",
    element: <Authentication />,
    path: "/auth",
    icon: <FontAwesomeIcon icon={faRightToBracket} />,
  },
  {
    name: "Home",
    element: <Home />,
    path: "/",
    icon: <FontAwesomeIcon icon={faHome} />,
  },
];

export const UserRoutes = [
  {
    name: "Dashboard",
    element: <Dashboard />,
    path: "/dashboard",
    icon: <FontAwesomeIcon icon={faDashboard} />,
  },
  {
    name: "Stores",
    element: <Stores />,
    path: "/dashboard/stores",
    icon: <FontAwesomeIcon icon={faStore} />,
  },
  {
    name: "Items",
    element: <Items />,
    path: "/dashboard/items",
    icon: <FontAwesomeIcon icon={faBagShopping} />,
  },
];
