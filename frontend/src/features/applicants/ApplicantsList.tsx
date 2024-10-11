import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { Box } from "@mui/material";
import { useLocation } from "react-router-dom";
import ApplicantListTable from "./ApplicantListTable";
import { useLazyGetAllApplicantQuery } from "../../services/applicants_service";
import Loader from "../../component/Loading";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useEffect } from "react";
const ApplicantsList = () => {
  const location = useLocation();
  const jobId = location.state;
  console.log(jobId);

  const [trigger, { data: applicants, isError, isLoading, isSuccess, error }] =
    useLazyGetAllApplicantQuery();

  useEffect(() => {
    trigger({ params: jobId });
  }, [trigger]);
  // Navigation to add applicant form
  console.log(applicants);
  return (
    <div>
      {/* Close icon to close the modal */}
      <ArrowBackIcon onClick={() => window.history.back()} />
      <br />
      <br />
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "end",
          placeItems: "end",
        }}
      >
        <p className="text-2xl font-bold">List of Applicants</p>
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
