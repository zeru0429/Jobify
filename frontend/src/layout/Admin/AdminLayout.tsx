import Header from "../Header";
// mui
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
const drawerWidth = 240;
import { Outlet } from "react-router-dom";
import { useState } from "react";
import LogoContainer from "../../component/LogoContainer";
import AdminSidebar from "./AdminSidebar";
import { useAuth } from "../../context/AuthContext";
import UnauthorizedPage from "../../component/UnauthorizedPage";
import LogOutButton from "../LogOutButton";
import Login from "../../features/public/Login";
export const AdminLayout = () => {
  const [open, setOpen] = useState(false);
  const { isAdmin, userData } = useAuth();

  const handleDrawerClose = () => {
    setOpen(false);
  };
  if (userData != null) {
    return <Login />;
  }
  if (isAdmin) {
    return (
      <>
        <Box
          sx={{
            marginLeft: open ? `${drawerWidth}px` : "0",
            height: "100vh", // Full screen height
            display: "flex",
            flexDirection: "column", // Makes sure content below header is stacked
          }}
        >
          <CssBaseline />
          <Header setOpen={setOpen} />
          <Divider />
          <Drawer
            sx={{
              width: drawerWidth,
              flexShrink: 0,
              "& .MuiDrawer-paper": {
                width: drawerWidth,
                boxSizing: "border-box",
              },
            }}
            variant="persistent"
            anchor="left"
            open={open}
          >
            <div className="bg-[#002A47] dark:bg-zinc-950 dark:text-white py-3 flex justify-between px-2 text-center align-middle items-center">
              <div className="w-full ">
                <LogoContainer />
              </div>
              <div>
                <IconButton onClick={handleDrawerClose} className="text-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={20}
                    height={20}
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="#d1d5db"
                      d="M16.88 2.88a1.25 1.25 0 0 0-1.77 0L6.7 11.29a.996.996 0 0 0 0 1.41l8.41 8.41c.49.49 1.28.49 1.77 0s.49-1.28 0-1.77L9.54 12l7.35-7.35c.48-.49.48-1.28-.01-1.77"
                    ></path>
                  </svg>
                </IconButton>
              </div>
            </div>
            <Divider />
            <AdminSidebar />
            <Divider />
            <LogOutButton />
          </Drawer>

          {/* Main content area */}
          <Box
            sx={{
              flex: 1, // Ensure it takes all remaining space
              overflowY: "auto", // Scrollable content
              width: open ? `calc(100vw - ${drawerWidth}px)` : "100vw", // Adjust for sidebar
            }}
          >
            <div className={`mt-24 px-10`}>
              <Outlet />
            </div>
          </Box>
        </Box>
      </>
    );
  } else {
    return <UnauthorizedPage />;
  }
};
