import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import UsersListTable from "./UserListTable";
import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useGetAllUsersQuery } from "../../services/user_service";

const UserList = () => {
  const navigator = useNavigate();
  const {
    isError,
    isLoading,
    isSuccess,
    data: users,
    error,
  } = useGetAllUsersQuery("userApi");
  const handleClick = () => {
    navigator("/admin/add-user");
  };

  return (
    <div>
      <Box>
        <Button
          className="dark:text-white dark:bg-slate-600 text-white bg-[#011e32] "
          onClick={handleClick}
          variant="contained"
        >
          Add admin
        </Button>
        <br />
        <br />
        <br />
      </Box>
      {isError && <Box>Error occurred</Box>}
      {isLoading && <Box>Loading...</Box>}
      {isSuccess && (
        <Box>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <UsersListTable users={users} />
          </LocalizationProvider>
        </Box>
      )}
    </div>
  );
};

export default UserList;
