import { BrowserRouter, useRoutes } from "react-router-dom";
import { routers } from "./routes/router";
import { RecoilRoot } from "recoil";

const App = () => {
  const routes = useRoutes(routers);
  return routes;
};

const AppWrapper = () => {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </RecoilRoot>
  );
};

export default AppWrapper;
