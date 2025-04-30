import useAuthStore from "../store/authStore";
import Navbar from "../components/navbar/Navbar";
import SideMenu from "../components/sidemenu/SideMenu";
import Modal from "../components/modal/Modal";
import { useState } from "react";
import LogoutAlert from "../components/alerts/LogoutAlert";
import { useNavigate } from "react-router-dom";

const DashboardLayout = ({ activeMenu, children }) => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const [isOpenLogoutDialog, setIsOpenLogoutDialog] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  }
  return (
    <div>
      <Navbar activeMenu={activeMenu} />
      {user && (
        <div className="flex">
          <div className="max-[1080px]:hidden">
            <SideMenu
              activeMenu={activeMenu}
              setIsOpenLogoutDialog={setIsOpenLogoutDialog}
            />
          </div>
          <div className="grow mx-5">
            {children}
            <Modal
              isOpen={isOpenLogoutDialog}
              onClose={() => setIsOpenLogoutDialog(false)}
              title="Logout"
            >
              <LogoutAlert
                content="Are you sure you want to logout?"
                onLogout={handleLogout}
              />
            </Modal>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardLayout;
