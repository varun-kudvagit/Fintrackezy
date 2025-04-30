import React from "react";
import { SIDE_MENU_DATA } from "../../utils/data";
import useAuthStore from "../../store/authStore";
import { useNavigate } from "react-router-dom";
import CharAvatar from "../cards/CharAvatar";

const SideMenu = ({ activeMenu, setIsOpenLogoutDialog }) => {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const handleClick = (route) => {
    if (route === "logout") {
      setIsOpenLogoutDialog(true);
    } else {
      navigate(route);
    }
  };
  if (!user) {
    return <div>Loading User...</div>;
  }
  return (
    <div className="w-64 h-[calc(100vh-61px)] bg-white border-r border-gray-200/50 p-5 sticky top-[61px] z-20">
      <div className="flex flex-col items-center justify-center gap-3 mt-3 mb-7">
        {user?.profileImageUrl ? (
          <img
            src={user?.profileImageUrl || ""}
            alt="Profile Image"
            className="w-20 h-20 bg-slate-400 rounded-full"
          />
        ) : (
          <CharAvatar
            name={user?.name}
            width="w-20"
            height="h-20"
            style="text-xl"
          />
        )}
        <h5 className="text-gray-950 font-semibold leading-6 my-2">
          {user?.name || ""}
        </h5>
        {SIDE_MENU_DATA.map((item, index) => (
          <button
            key={`menu-${index}`}
            className={`w-full flex items-center gap-4 text-[15px] ${
              activeMenu === item.label
                ? "text-white bg-primary hover:bg-purple-600/15 hover:text-purple-600"
                : "hover:bg-purple-600/15 hover:text-purple-600"
            } py-3 px-6 rounded-lg mb-3 cursor-pointer`}
            onClick={() => handleClick(item.path)}
          >
            <item.icon className="text-xl" />
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SideMenu;
