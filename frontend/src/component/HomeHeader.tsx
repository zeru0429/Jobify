// HomeHeader.tsx

import { AppBar, Box, Button } from "@mui/material";
import { IoNotificationsOutline } from "react-icons/io5";
import { RiAccountCircleLine } from "react-icons/ri";
import { MdNightlight, MdLightMode, MdBrightnessAuto } from "react-icons/md";
import LogoContainer from "./LogoContainer";
import IconContainer from "./icon/Icon_container";

interface HomeHeaderProps {
  isLoggedIn: boolean;
  toggleThemeData: () => void;
  themeData: string;
  handleLogOut: () => void;
  navigate: any;
}

const HomeHeader: React.FC<HomeHeaderProps> = ({
  isLoggedIn,
  toggleThemeData,
  themeData,
  handleLogOut,
  navigate,
}) => {
  const getThemeIcon = () => {
    switch (themeData) {
      case "light":
        return MdNightlight;
      case "dark":
        return MdLightMode;
      case "system":
        return MdBrightnessAuto;
      default:
        return MdLightMode;
    }
  };

  return (
    <AppBar className="bg-[#002A47] text-white dark:bg-slate-900 dark:text-white">
      <div className="ps-4 p-3 flex justify-between w-full pe-14 bg-[#002A47] dark:bg-zinc-950 dark:text-white">
        <div className="flex gap-5 align-middle items-center text-center">
          <Box sx={{ width: "20px" }}></Box>
          <LogoContainer />
        </div>

        <div className="flex gap-3 me-5 align-middle items-center">
          <IconContainer
            handler={toggleThemeData}
            Icon={getThemeIcon()}
            iconsClassName="my-custom-icon-class"
            children={null}
          />

          {isLoggedIn && (
            <>
              <IoNotificationsOutline className="w-[22px] h-[22px]" />
              <RiAccountCircleLine className="w-[25px] h-[25px] cursor-pointer" />
            </>
          )}

          {!isLoggedIn ? (
            <Button
              className="bg-[#002A47] hover:dark:bg-[#5a5a5a] dark:text-gray-200 px-3 py-1 text-white rounded-md"
              onClick={() => navigate("/login")}
            >
              Login
            </Button>
          ) : (
            <Button
              className="bg-[#002A47] hover:dark:bg-[#5a5a5a] dark:text-gray-200 px-3 py-1 text-white rounded-md"
              onClick={handleLogOut}
            >
              Logout
            </Button>
          )}
        </div>
      </div>
      <hr className="dark:bg-gray-600 dark:text-gray-600" />
    </AppBar>
  );
};

export default HomeHeader;
