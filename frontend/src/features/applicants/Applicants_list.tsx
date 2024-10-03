import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ApplicantsList = () => {
  const navigator = useNavigate();
  const handleClick = () => {
    navigator("/admin/add-applicants");
  };
  return (
    <div>
      <Box>
        <Button
          className="dark:text-white dark:bg-slate-600 text-white bg-[#011e32] "
          onClick={handleClick}
          variant="contained"
        >
          Add Applicants
        </Button>
        <br />
        <br />
        <br />
      </Box>
      <Box>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          {/* <UsersListTable /> */}
        </LocalizationProvider>
      </Box>
    </div>
  );
};

export default ApplicantsList;
