import React from "react";
import { NavLink } from "react-router";
import NavigationTab from "./NavigationTab";
import { useSelector } from "react-redux";
import { store } from "../../../../app/store";
import { adminNavigations } from "../../../../constant/Navigation";
import { employeeNavigations } from "../../../../constant/Navigation";

const AsideNav = () => {
  let { employee } = useSelector((store) => store.auth);

  let identity = employee.role === "admin" ? adminNavigations  : employeeNavigations ;
  
  return (
    <div className="flex flex-col items-center   min-h-screen">
      <div>
        <h1 className="text-2xl font-semibold"> Team-Sync </h1>
        <p> Enterprice workplace </p>
      </div>
      <div className="flex flex-col mt-10 gap-y-5 w-[90%]">
        {
          identity.map((elem)=>{
            return <NavigationTab path={elem.path} icon={elem.icon} title={elem.title} />
          })
        }
      </div>
    </div>
  );
};

export default AsideNav;
