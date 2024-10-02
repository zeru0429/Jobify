import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import UsersListTable from "./UserListTable";
import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const UserList = () => {
  const navigator = useNavigate();
  const handleClick = () => {
    navigator("/admin/add-user");
  };
  return (
    <>
      <Box>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <UsersListTable />
        </LocalizationProvider>
      </Box>
      <Box>
        <Button onClick={handleClick}>Add User</Button>
      </Box>
    </>
  );
};

export default UserList;
