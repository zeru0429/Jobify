import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import UsersListTable from "./UserListTable";

const UserList = () => (
  <LocalizationProvider dateAdapter={AdapterDayjs}>
    <UsersListTable />
  </LocalizationProvider>
);

export default UserList;
