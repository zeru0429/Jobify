import { useForm, SubmitHandler } from "react-hook-form";
import { useEffect, useState } from "react";
import LogoContainer from "../../component/LogoContainer";
import { useThemeData } from "../../context/them_context";
import { MdNightlight, MdLightMode, MdBrightnessAuto } from "react-icons/md";
import IconContainer from "../../component/icon/Icon_container";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useToast } from "../../context/ToastContext";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useLoginMutation } from "../../services/public_service";
import { ErrorResponseType, LoginFormType } from "../../_types/form_types";
import { Box, Button } from "@mui/material";

// Define the LoginResponseType type
type LoginResponseType = {
  token?: string;
};

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormType>();
  const [showPassword, setShowPassword] = useState(false);
  const { themeData, setThemeData } = useThemeData();
  const { userData, fetchData } = useAuth();
  const [login, { isLoading }] = useLoginMutation();
  const navigate = useNavigate();
  const { setToastData } = useToast();
  const { isLoggedIn, setUserData } = useAuth();
  useEffect(() => {
    if (userData.token != null) {
      switch (userData.role) {
        case "admin":
          navigate("/admin");
          break;
        case "super_admin":
          navigate("/admin");
          break;
        default:
          break;
      }
    }
  }, [userData]);

  const onSubmit: SubmitHandler<LoginFormType> = async (data) => {
    try {
      const response: LoginResponseType = await login(data).unwrap();
      localStorage.setItem("token", JSON.stringify({ token: response.token }));
      fetchData();
      setToastData({
        message: "login successful",
        success: true,
      });
    } catch (error: any) {
      const res: ErrorResponseType = error;
      setToastData({
        message: res.data.message,
        success: res.data.success,
      });
    }
  };

  const getThemeIcon = () => {
    if (themeData === "light") {
      return MdNightlight;
    } else if (themeData === "dark") {
      return MdLightMode;
    } else if (themeData === "system") {
      return MdBrightnessAuto;
    }
  };

  const toggleThemeData = () => {
    if (themeData === "light") {
      setThemeData("dark");
    } else if (themeData === "dark") {
      setThemeData("light");
    } else if (themeData === "system") {
      setThemeData("dark");
    }
  };

  const handleLogOut = () => {
    localStorage.removeItem("token");
    setUserData({ firstName: "", id: 0, role: "", token: null });
    // reload page
    window.location.reload();
  };

  return (
    <>
      <div className="bg-[#002A47] text-white dark:bg-[#1C1E22] dark:text-[#B7E4FF] w-full h-screen">
        <div className="ms-10 pt-2 flex justify-between me-10 items-center">
          <LogoContainer />
          <Box>
            <IconContainer
              handler={toggleThemeData}
              Icon={getThemeIcon()}
              iconsClassName="my-custom-icon-class"
              children={null}
            />
            <Button
              className=" bg-[#002A47] hover:dark:bg-[#5a5a5a] dark:text-gray-200 px-3 py-1 text-white rounded-md"
              onClick={() => navigate("/")}
            >
              Home
            </Button>
          </Box>

          {isLoggedIn && (
            <Button
              className=" bg-[#002A47] hover:dark:bg-[#5a5a5a] dark:text-gray-200 px-3 py-1 text-white rounded-md"
              onClick={() => handleLogOut()}
            >
              Logout
            </Button>
          )}
        </div>
        <div className="w-full max-w-md p-6 shadow-md rounded-lg text-center m-auto">
          <div className="flex flex-col items-center justify-center text-center mb-8">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={70}
              height={70}
              viewBox="0 0 512 512"
              className="mb-4 text-white"
            >
              <path
                fill="currentColor"
                d="M332.64 64.58C313.18 43.57 286 32 256 32c-30.16 0-57.43 11.5-76.8 32.38c-19.58 21.11-29.12 49.8-26.88 80.78C156.76 206.28 203.27 256 256 256s99.16-49.71 103.67-110.82c2.27-30.7-7.33-59.33-27.03-80.6M432 480H80a31 31 0 0 1-24.2-11.13c-6.5-7.77-9.12-18.38-7.18-29.11C57.06 392.94 83.4 353.61 124.8 326c36.78-24.51 83.37-38 131.2-38s94.42 13.5 131.2 38c41.4 27.6 67.74 66.93 76.18 113.75c1.94 10.73-.68 21.34-7.18 29.11A31 31 0 0 1 432 480"
              ></path>
            </svg>
            <h3 className="text-3xl font-medium">Welcome</h3>
            <h5 className="text-md">Login</h5>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="relative mb-4">
              <input
                type="email"
                id="email"
                placeholder="Email"
                className="w-full px-10 py-2 rounded-md text-black outline-none"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Invalid email format",
                  },
                  validate: {
                    notAdmin: (fieldValue) =>
                      fieldValue !== "admin@example.com" ||
                      "Enter a different email address",
                  },
                })}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={25}
                height={25}
                viewBox="0 0 24 24"
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              >
                <path
                  fill="#737373"
                  d="M12 12q-1.65 0-2.825-1.175T8 8t1.175-2.825T12 4t2.825 1.175T16 8t-1.175 2.825T12 12m-8 8v-2.8q0-.85.438-1.562T5.6 14.55q1.55-.775 3.15-1.162T12 13t3.25.388t3.15 1.162q.725.375 1.163 1.088T20 17.2V20z"
                ></path>
              </svg>
              <p className="text-red-600 text-[13px] mt-1">
                {errors.email?.message}
              </p>
            </div>
            <div className="relative mb-4">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Password"
                className="w-full px-10 py-2 rounded-md text-black outline-none"
                {...register("password", {
                  required: "Password is required",
                  pattern: {
                    value:
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+=[\]{};':"\\|,.<>/?-]).{8,}$/,
                    message: "Invalid password format",
                  },
                  validate: {
                    notAdmin: (fieldValue) =>
                      fieldValue !== "admin" || "Enter a different password",
                  },
                })}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                viewBox="0 0 24 24"
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              >
                <path
                  fill="#8a8a8a"
                  d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2m-6 9c-1.1 0-2-.9-2-2s.9-2 2-2s2 .9 2 2s-.9 2-2 2m3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1s3.1 1.39 3.1 3.1z"
                ></path>
              </svg>
              <div
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
              <p className="text-red-600 text-[13px] mt-1">
                {errors.password?.message}
              </p>
            </div>
            <button
              type="submit"
              className="bg-[#002A47]  w-full py-2 text-white rounded-md hover:bg-[#112737] dark:bg-[#071218] hover:dark:bg-[#0c1920]   transition duration-300"
            >
              {isLoading ? <p>Loading</p> : <p>Login</p>}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
