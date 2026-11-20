import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router";
import { store } from "../store";
import AsideNav from "../../features/dashboard/ui/components/AsideNav";
import TopNav from "../../features/dashboard/ui/components/TopNav";

const DashboardLayout = () => {
  let { mode } = useSelector((store) => store.theme);
  console.log(mode);

  // useEffect(() => {
  //   if (mode === "light") {
  //     document.body.classList.add("light");
  //   } else {
  //     document.body.classList.remove("light");
  //   }
  // }, [mode]);

  useEffect(() => {
    if (mode === "light") {
      document.body.classList.add("light");
    } else {
      document.body.classList.remove("light");
    }

    console.log("Theme Mode:", mode);
    console.log("Body Class:", document.body.className);

    setTimeout(() => {
      console.log(
        "Background Variable:",
        getComputedStyle(document.body).getPropertyValue("--bg-main"),
      );

      console.log(
        "Text Variable:",
        getComputedStyle(document.body).getPropertyValue("--text-primary"),
      );
    }, 100);
  }, [mode]);

  return (
    <div className="grid grid-cols-[1.2fr_7fr] h-screen w-full ">
      <div className="border-r border-[var(--border-color)]">
        {" "}
        <AsideNav />
      </div>

      <div className="overflow-auto">
        <div className="border border-white p-2 ">
          <TopNav />
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
