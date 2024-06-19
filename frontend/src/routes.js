/** 
  All of the routes for the Material Dashboard 2 React are added here,
  You can add a new route, customize the routes and delete the routes here.

  Once you add a new route on this file it will be visible automatically on
  the Sidenav.

  For adding a new route you can follow the existing routes in the routes array.
  1. The `type` key with the `collapse` value is used for a route.
  2. The `type` key with the `title` value is used for a title inside the Sidenav. 
  3. The `type` key with the `divider` value is used for a divider between Sidenav items.
  4. The `name` key is used for the name of the route on the Sidenav.
  5. The `key` key is used for the key of the route (It will help you with the key prop inside a loop).
  6. The `icon` key is used for the icon of the route on the Sidenav, you have to add a node.
  7. The `collapse` key is used for making a collapsible item on the Sidenav that has other routes
  inside (nested routes), you need to pass the nested routes inside an array as a value for the `collapse` key.
  8. The `route` key is used to store the route location which is used for the react router.
  9. The `href` key is used to store the external links location.
  10. The `title` key is only for the item with the type of `title` and its used for the title text on the Sidenav.
  10. The `component` key is used to store the component of its route.
*/

// Material Dashboard 2 React layouts
import Dashboard from "layouts/dashboard";

import AAPL from "layouts/aapl";
import MSFT from "layouts/msft";
import GOOG from "layouts/goog";
import AMZN from "layouts/amzn";
import TSLA from "layouts/tsla";
import FB from "layouts/fb";
import NFLX from "layouts/nflx";
import NVDA from "layouts/nvda";
import AMD from "layouts/amd";
import INTC from "layouts/intc";

// @mui icons
import AmznIcon from "./assets/images/icons/companies/amzn.svg";
import TslaIcon from "./assets/images/icons/companies/tsla.svg";
import FbIcon from "./assets/images/icons/companies/fb.svg";
import NflxIcon from "./assets/images/icons/companies/nflx.svg";
import NvdaIcon from "./assets/images/icons/companies/nvda.svg";
import AmdIcon from "./assets/images/icons/companies/amd.svg";
import IntcIcon from "./assets/images/icons/companies/intc.svg";

import AppleIcon from '@mui/icons-material/Apple';
import GoogleIcon from '@mui/icons-material/Google';
import MicrosoftIcon from '@mui/icons-material/Microsoft';
import HomeIcon from '@mui/icons-material/Home';

const routes = [
  {
    type: "collapse",
    name: "Home",
    key: "home",
    icon: <HomeIcon />,
    route: "/home",
    component: <Dashboard />,
  },
  {
    type: "collapse",
    name: "AAPL",
    key: "apple",
    icon: <AppleIcon />,
    route: "/apple",
    component: <AAPL />,
  },
  {
    type: "collapse",
    name: "MSFT",
    key: "microsoft",
    icon: <MicrosoftIcon />,
    route: "/microsoft",
    component: <MSFT />,
  },
  {
    type: "collapse",
    name: "GOOG",
    key: "google",
    icon: <GoogleIcon />,
    route: "/google",
    component: <GOOG />,
  },
  {
    type: "collapse",
    name: "AMZN",
    key: "amazon",
    icon: <img src={AmznIcon} alt="AMZN" style={{ width: 24, height: 24 }} />,
    route: "/amazon",
    component: <AMZN />,
  },
  {
    type: "collapse",
    name: "TSLA",
    key: "tesla",
    icon: <img src={TslaIcon} alt="TSLA" style={{ width: 24, height: 24 }} />,
    route: "/tesla",
    component: <TSLA />,
  },
  {
    type: "collapse",
    name: "META",
    key: "meta",
    icon: <img src={FbIcon} alt="FB" style={{ width: 24, height: 24 }} />,
    route: "/meta",
    component: <FB />,
  },
  {
    type: "collapse",
    name: "NFLX",
    key: "netflix",
    icon: <img src={NflxIcon} alt="NFLX" style={{ width: 24, height: 24 }} />,
    route: "/netflix",
    component: <NFLX />,
  },
  {
    type: "collapse",
    name: "NVDA",
    key: "nvidia",
    icon: <img src={NvdaIcon} alt="NVDA" style={{ width: 24, height: 24 }} />,
    route: "nvidia",
    component: <NVDA />,
  },
  {
    type: "collapse",
    name: "AMD",
    key: "amd",
    icon: <img src={AmdIcon} alt="AMD" style={{ width: 24, height: 24 }} />,
    route: "amd",
    component: <AMD />,
  },
  {
    type: "collapse",
    name: "INTC",
    key: "intel",
    icon: <img src={IntcIcon} alt="INTC" style={{ width: 24, height: 24 }} />,
    route: "intel",
    component: <INTC />,
  },
];

export default routes;
