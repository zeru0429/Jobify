import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { Box } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import ApplicantListTable from "./ApplicantListTable";
import RectangularButton from "../../component/ui/RectangularButton";
import { useGetAllApplicantQuery } from "../../services/applicants_service";
import Loader from "../../component/Loading";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
const ApplicantsList = () => {
  const location = useLocation();
  const jobId = location.state;
  console.log(jobId);

  const {
    data: applicants,
    isError,
    isLoading,
    isSuccess,
    error,
  } = useGetAllApplicantQuery({ params: jobId });

  // Navigation to add applicant form
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/admin/add-applicant");
  };
  console.log(applicants);
  return (
    <div>
      {/* Close icon to close the modal */}
      <ArrowBackIcon onClick={() => window.history.back()} />
      <br />
      <br />
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
          Add Applicants
        </RectangularButton>
      </Box>
      <br />
      <br />
      {isLoading && <Loader />}
      {isError && <div>Error loading applicants: {error.toString()}</div>}{" "}
      {/* Error handling */}
      {isSuccess && applicants && (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <ApplicantListTable applicants={applicants} />
        </LocalizationProvider>
      )}
    </div>
  );
};

export default ApplicantsList;
