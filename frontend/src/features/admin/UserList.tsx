import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import UsersListTable from "./UserListTable";
import { Box, Dialog } from "@mui/material";
import { useGetAllUsersQuery } from "../../services/user_service";
import { useState } from "react";
import AddUser from "./forms/AddUser";
import Loader from "../../component/Loading";
import RectangularButton from "../../component/ui/RectangularButton";
import { useAuth } from "../../context/AuthContext";
import UnauthorizedPage from "../../component/UnauthorizedPage";

const UserList = () => {
  const { isSuperAdmin } = useAuth();
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

  if (isSuperAdmin) {
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
            Add admin
          </RectangularButton>
        </Box>
        <br />

        {isError && <Box>Error occurred {error.toString()}</Box>}
        {isLoading && (
          <Box>
            <Loader />
          </Box>
        )}
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
  } else {
    return <UnauthorizedPage />;
  }
};

export default UserList;
