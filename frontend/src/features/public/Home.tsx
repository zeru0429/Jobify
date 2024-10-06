import { Box } from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useThemeData } from "../../context/them_context";
import { MdNightlight, MdLightMode, MdBrightnessAuto } from "react-icons/md";
import JobLandingPage from "./JobLandingPage";
import { useGetIndexPageMutation } from "../../services/public_service";
import Loader from "../../component/Loading";
import HomeHeader from "../../component/HomeHeader";

const Home = () => {
  const navigator = useNavigate();
  const { themeData, setThemeData } = useThemeData();

  const navigate = useNavigate();
  const { isLoggedIn, setUserData, fetchData } = useAuth();
  const [getIndexPage, { data: jobs, isLoading, isError }] =
    useGetIndexPageMutation();

  useEffect(() => {
    getIndexPage({ take: 10, skip: 0 });
  }, [getIndexPage]);

  const toggleThemeData = () => {
    if (themeData === "light") {
      setThemeData("dark");
    } else if (themeData === "dark") {
      setThemeData("light");
    } else if (themeData === "system") {
      setThemeData("dark");
    }
  };

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

  const handleLogOut = () => {
    localStorage.removeItem("token");
    setUserData({ firstName: "", id: 0, role: "", token: null });
    fetchData();
    navigate("/login");
  };
  console.log(jobs);
  return (
    <Box sx={{ height: "100vh" }}>
      <HomeHeader
        isLoggedIn={isLoggedIn}
        toggleThemeData={toggleThemeData}
        themeData={themeData}
        handleLogOut={handleLogOut}
        navigate={navigator}
      />

      {isLoading && <Loader />}
      {isError && (
        <div className="flex justify-center items-center min-h-[100vh]">
          <h1 className="text-3xl text-red-500">Error occurred: {isError}</h1>
        </div>
      )}
      {jobs && <JobLandingPage jobs={jobs} />}
    </Box>
  );
};

export default Home;
