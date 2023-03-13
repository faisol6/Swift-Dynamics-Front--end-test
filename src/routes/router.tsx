import React from "react";
import Home from "../pages/Home";
import { RouteObject } from "react-router-dom";
import Calculate from "../pages/Calculate";
import Geometry from "../pages/Geometry";
import TableForm from "../pages/TableForm";

export interface IRouter {
  path: string;
  name: string;
  authentMenuName: string;
  exact: boolean;
  component: React.FC;
}

export const routers: RouteObject[] = [
  {
    path: "/",
    element: <Home />,
    index: true,
  },
  {
    path: "/table",
    element: <TableForm />,
    index: true,
  },
  {
    path: "/calculate",
    element: <Calculate />,
    index: true,
  },
  {
    path: "/geometry",
    element: <Geometry />,
    index: true,
  },
];
