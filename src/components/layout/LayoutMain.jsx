import Header from "../header/Header";
import { Outlet } from "react-router-dom";

const LayoutMain = () => {
  return (
    <>
      <Header></Header>
      <Outlet></Outlet>
    </>
  );
};

export default LayoutMain;
