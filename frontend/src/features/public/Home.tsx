import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useThemeData } from "../../context/them_context";
import JobLandingPage from "./JobLandingPage";
import { useLazyGetIndexPageQuery } from "../../services/public_service";
import Loader from "../../component/Loading";
import HomeHeader from "../../component/HomeHeader";

const Home = () => {
  const navigator = useNavigate();
  const { themeData, setThemeData } = useThemeData();
  const { isLoggedIn, setUserData, fetchData } = useAuth();

  const [getIndexPage, { data: jobs, isLoading, isError }] =
    useLazyGetIndexPageQuery();
  const [page, setPage] = useState(0);
  const [hasMoreJobs, setHasMoreJobs] = useState(true);

  const toggleThemeData = () => {
    setThemeData(themeData === "light" ? "dark" : "light");
  };

  const handleLogOut = () => {
    localStorage.removeItem("token");
    setUserData({ firstName: "", id: 0, role: "", token: null });
    fetchData();
    navigator("/login");
  };

  const loadMoreJobs = () => {
    if (hasMoreJobs && !isLoading) {
      getIndexPage({ take: 10, skip: (page + 1) * 10 }).then((result) => {
        if (result.data && result.data.length === 0) {
          setHasMoreJobs(false); // Stop loading if no more jobs
        }
      });
      setPage((prev) => prev + 1);
    }
  };

  useEffect(() => {
    // Initial load
    if (page === 0) {
      getIndexPage({ take: 10, skip: 0 });
    }
  }, [getIndexPage, page]);

  return (
    <Box sx={{ height: "100vh", overflowY: "auto" }}>
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
      {jobs && (
        <JobLandingPage
          initialJobs={jobs}
          loadMoreJobs={loadMoreJobs}
          hasMoreJobs={hasMoreJobs}
        />
      )}
    </Box>
  );
};

export default Home;
