import React from "react";
import { useState, useEffect } from "react";
import { Navigate, useRoutes } from "react-router-dom";
import { useSelector } from "react-redux";

import NewActivity from "./admin/pages/NewActivity";
import NewsReporting from "./admin/pages/NewsReporting";
import DashboardAppPage from "./admin/pages/DashboardAppPage";
import AdminReport from "./admin/pages/AdminReport";
import PastActivity from "./admin/pages/PastActivity";
import Login from "./admin/pages/login";
import Profile from "./admin/pages/Profile";
import UserData from './admin/pages/UserData';
import Page404 from "./admin/pages/Page404";
import Password from "./admin/pages/Password";
import DashboardLayout from "./admin/layouts/dashboard";
import Treasurer from "./admin/pages/Treasurer";
import News from "./admin/pages/News";
import ZonalView from "./admin/pages/ZonalView";
import RegionalView from "./admin/pages/RegionalView";


import Home from "./pages/Home/Home";
import UserLayout from "./components/UserLayout";
import About from "./pages/About/About";
import DGTeam from "./pages/About/dgTeam/DGTeam";
import District from "./pages/About/district/District";
import OrgChart from "./pages/About/orgChart/OrgChart";
import Events from "./pages/Events/Events";
import MemberDir from "./pages/Membership/MemberDir/MemberDir";
import BusinessDir from "./pages/Membership/BusinessDir/BusinessDir";
import MemberData from "./pages/Membership/MemberData/MemberData";


export default function Router() {
  const isAdmin = useSelector((state) => state.auth.admin);
  const role = useSelector((state) => state.auth.role);
  const [routes, setRoutes] = useState([]);
  useEffect(() => {
    setRoutes([
      { path: "/login", element: <Login /> },
      { path: "/password", element: <Password /> },
      {path:"users",element:<UserData/>},
      {
        path: "/404",
        element: <Page404 />,
      },
      {
        path: "*",
        element: <Navigate to="/404" replace />,
      },
      ...(isAdmin
      ? [
          {
            path: "/dashboard",
            element: <DashboardLayout />,
            children: [
              { path: "edit-profile", element: <Profile /> },
            ],
          },
        ]
      : []),
      {
        path: "/",
        element: <UserLayout />,
        children: [
          { path: "", element: <Home /> },
          { path: "/about/governor", element: <About /> },
          { path: "/about/dgteam", element: <DGTeam /> },
          { path: "/about/aboutdistrict317F", element: <District /> },
          { path: "/about/organizationchart", element: <OrgChart /> },
          { path: "/events", element: <Events /> },
          { path: "/membership/memberdirectory", element: <MemberDir /> },
          { path: "/membership/businessdirectory", element: <BusinessDir /> },
          { path: "/membership/downloadmemberdata", element: <MemberData /> },
        ],
      },

      ...(role?.includes("Club Treasurer") || role?.includes("Club Secretary") || role?.includes("Club President")
        ? [
            {
              path: "/dashboard",
              element: <DashboardLayout />,
              children: [
                { path: "app", element: <DashboardAppPage /> },
                { path: "activity", element: <NewActivity /> },
                { path: "news", element: <NewsReporting /> },
                { path: "admin", element: <AdminReport /> },
                { path: "pastactivity", element: <PastActivity /> },
              
             
                role.includes("Club Treasurer") && {path:"manage-expense",element:<Treasurer/>}
              ],
            },
          ]
        : []),

        ...(role?.includes("lion member") || isAdmin
        ? [
            {
              path: "/dashboard",
              element: <DashboardLayout />,
              children: [
                { path: "app", element: <DashboardAppPage /> },
                { path: "pastactivity", element: <PastActivity /> },
                { path: "news", element: <News/> }, 
               
                
              ],
            },
          ]
        : []),
        ...(role?.includes("Region Chairperson")
        ? [
            {
              path: "/dashboard",
              element: <DashboardLayout />,
              children: [
                { path: "region", element: <RegionalView /> },  
              ],
            },
          ]
        : []),
        ...(role?.includes("Zone Chairperson")
        ? [
            {
              path: "/dashboard",
              element: <DashboardLayout />,
              children: [
                { path: "zone", element: <ZonalView/> },  
              ],
            },
          ]
        : []),
    ]);
  }, [isAdmin, role]);

  return useRoutes(routes);

}
