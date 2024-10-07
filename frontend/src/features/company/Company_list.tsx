import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { Box, Dialog, DialogTitle, DialogContent } from "@mui/material";
import CompanyListTable from "./CompanyListTable";
import RectangularButton from "../../component/ui/RectangularButton";
import AddCompany from "./form/AddCompany";
import { useState, useEffect } from "react";
import { useLazyGetAllCompanyQuery } from "../../services/company_service";
import Loader from "../../component/Loading";

const CompanyList = () => {
  const [open, setOpen] = useState(false);
  const [trigger, { isError, isLoading, isSuccess, data: companies, error }] =
    useLazyGetAllCompanyQuery();

  useEffect(() => {
    trigger({});
  }, [trigger]);

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
        <RectangularButton type="primary" onClick={handleClickOpen}>
          Add Company
        </RectangularButton>
      </Box>
      <br />
      {isError && (
        <Box color="error.main">Error occurred: {error.toString()}</Box>
      )}
      {isLoading && (
        <Box>
          <Loader />
        </Box>
      )}
      {isSuccess && companies && (
        <Box>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <CompanyListTable companies={companies} />
          </LocalizationProvider>
        </Box>
      )}
      <Dialog open={open} onClose={handleClose} fullWidth scroll="paper">
        <DialogTitle>Add a New Company</DialogTitle>
        <DialogContent>
          <AddCompany handleClose={handleClose} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CompanyList;
