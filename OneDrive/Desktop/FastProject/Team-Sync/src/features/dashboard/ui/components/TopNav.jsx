import React, { Profiler } from "react";
import { Bell, Grip, Lightbulb, Moon, Search } from "lucide-react";
import { toggleTheme } from "../../../../shared/state/themeSlice";
import { useDispatch, useSelector } from "react-redux";
import { logOutApi } from "../../apis/authApi";
import { removeEmployee } from "../../../auth/state/authSlice";

const TopNav = () => {
  let dispatch = useDispatch();

  let handleLogout = async () => {
    await logOutApi();
    dispatch(removeEmployee());
  };

  let { mode } = useSelector((store) => store.theme);

  let handleThemeChange = () => {
    dispatch(toggleTheme());
  };

  return (
    <div className="flex justify-between items-center px-8">
      <div className="flex gap-2 border border-gray-700 rounded-sm w-120 p-1">
        <input
          className="w-full border-none outline-none"
          type="search"
          placeholder="Search Workspace"
        />
        <Search />
      </div>
      <div className="flex gap-8">
        <Bell />
        <Grip />
        <button>
          {mode === "light" ? (
            <Moon onClick={handleThemeChange} />
          ) : (
            <Lightbulb onClick={handleThemeChange} />
          )}
        </button>
        <button
          className="rounded-md bg-[var(--primary)] px-3 py-1 text-[var(--bg-main)] cursor-pointer"
          onClick={handleLogout}
        >
          LogOut
        </button>
      </div>
    </div>
  );
};

export default TopNav;
