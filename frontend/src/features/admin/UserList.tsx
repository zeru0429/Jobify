import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import UsersListTable from "./UserListTable";
import { Box, Button, Dialog } from "@mui/material";
import { useGetAllUsersQuery } from "../../services/user_service";
import { useState } from "react";
import AddUser from "./forms/AddUser";

const UserList = () => {
  const [open, setOpen] = useState(false);
  const {
    isError,
    isLoading,
    isSuccess,
    data: users,
    error,
  } = useGetAllUsersQuery("userApi");

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Box>
        <Button
          className="dark:text-white dark:bg-slate-600 text-white bg-[#011e32]"
          onClick={handleClickOpen}
          variant="contained"
        >
          Add admin
        </Button>
        <br />
        <br />
        <br />
      </Box>
      {isError && <Box>Error occurred {error.toString()}</Box>}
      {isLoading && <Box>Loading...</Box>}
      {isSuccess && (
        <Box>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <UsersListTable users={users} />
          </LocalizationProvider>
        </Box>
      )}
      {/* Dialog for Adding User */}
      <Dialog open={open}>
        <AddUser handleClose={handleClose} />
      </Dialog>
    </div>
  );
};

export default UserList;
