import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { Box, Dialog } from "@mui/material";
import CompanyListTable from "./CompanyListTable";
import RectangularButton from "../../component/ui/RectangularButton";
import AddCompany from "./form/AddCompany";
import { useState } from "react";

const CompanyList = () => {
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleClick = () => {
    handleClickOpen();
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
          Add Company
        </RectangularButton>
      </Box>
      <br />

      <Box>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <CompanyListTable />
        </LocalizationProvider>
      </Box>
      {/* Dialog for Adding User */}
      <Dialog open={open}>
        <AddCompany handleClose={handleClose} />
      </Dialog>
    </div>
  );
};

export default CompanyList;
