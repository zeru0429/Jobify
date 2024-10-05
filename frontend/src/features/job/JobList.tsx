import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { Box } from "@mui/material";
import JobListTable from "./JobListTable";
import RectangularButton from "../../component/ui/RectangularButton";
import { useNavigate } from "react-router-dom";
import { useGetAllJobQuery } from "../../services/job_service";
import Loader from "../../component/Loading";
import UsersListTable from "../admin/UserListTable";

const JobList = () => {
  const navigator = useNavigate();
  const {
    isError,
    isLoading,
    isSuccess,
    data: jobs,
    error,
  } = useGetAllJobQuery("userApi");

  const handleClick = () => {
    navigator("/admin/add-job");
  };

  return (
    <div>
      <Box
        sx={{
          width: "200px",
          display: "flex",
          flexDirection: "row",
          alignItems: "end",
          placeItems: "end",
        }}
      >
        <RectangularButton type="primary" onClick={handleClick}>
          Add Job
        </RectangularButton>
      </Box>
      <br />
      <Box>
        <br />
      </Box>
      {isError && <Box>Error occurred {error.toString()}</Box>}
      {isLoading && (
        <Box>
          <Loader />
        </Box>
      )}
      {isSuccess && (
        <Box>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <JobListTable jobs={jobs} />
          </LocalizationProvider>
        </Box>
      )}

      {/* Dialog for Adding User */}
    </div>
  );
};

export default JobList;
