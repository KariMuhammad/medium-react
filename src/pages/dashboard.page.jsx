import { Outlet } from "react-router-dom";

const Dashboard = () => {
  return <h1>
    {<Outlet />}
  </h1>;
};

export default Dashboard;
