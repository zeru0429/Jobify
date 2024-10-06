import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ApplicantListTable from "./ApplicantListTable";
import RectangularButton from "../../component/ui/RectangularButton";

const ApplicantsList = () => {
  const navigator = useNavigate();
  const handleClick = () => {
    navigator("/admin/add-applicant");
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
          Add Applicants
        </RectangularButton>
      </Box>
      <br />
      <br />
      <Box>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <ApplicantListTable />
        </LocalizationProvider>
      </Box>
    </div>
  );
};

export default ApplicantsList;
