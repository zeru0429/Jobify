import { useMemo, useState } from "react";

// MRT Imports
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from "material-react-table";

// Material UI Imports // Icons Imports
import { Box, Dialog, ListItemIcon, MenuItem, lighten } from "@mui/material";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

// Mock Data
import { UserListType } from "../../_types/user_table";
import EditProfile from "./forms/EditProfile";
import ResetPassword from "./forms/ResetPassword";
import { DeleteForever } from "@mui/icons-material";
import Warning from "../../component/Warning";
import { useDeleteUserMutation } from "../../services/user_service";
import { ErrorResponseType } from "../../_types/form_types";

// Define user list table props type
type UserListTableProps = {
  users: UserListType[];
};

const UsersListTable = ({ users }: UserListTableProps) => {
  const [selectedRowData, setSelectedRowData] = useState<UserListType | null>(
    null
  );
  const [deleteUser, { isLoading, isSuccess }] = useDeleteUserMutation();

  const [openEdit, setOpenEdit] = useState(false);
  const [openReset, setOpenReset] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const handleClickOpenEdit = (row: UserListType) => {
    setSelectedRowData(row);
    setOpenEdit(true);
  };
  const handleCloseEdit = () => {
    setOpenEdit(false);
  };
  const handleClickOpenReset = (row: UserListType) => {
    setSelectedRowData(row);
    setOpenReset(true);
  };
  const handleCloseReset = () => {
    setOpenReset(false);
  };
  const handleClickOpenDelete = (row: UserListType) => {
    setSelectedRowData(row);
    setOpenDelete(true);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  const handleDeleteUser = async () => {
    if (selectedRowData?._id != null) {
      try {
        await deleteUser({ params: selectedRowData?._id }).unwrap();
        setToastData({
          message: "User deleted successfully",
          success: true,
        });
        handleCloseDelete();
      } catch (error: any) {
        handleCloseDelete();
        const res: ErrorResponseType = error;
        setToastData({
          message: res.data.message,
          success: false,
        });
      }
    } else {
      handleCloseDelete();
      setToastData({
        message: "User not selected is missing",
        success: false,
      });
    }
  };

  const columns = useMemo<MRT_ColumnDef<UserListType>[]>(
    () => [
      {
        id: "employee",
        header: "Employee",
        columns: [
          {
            accessorFn: (row) => `${row.firstName} ${row.lastName}`,
            id: "name",
            header: "Name",
            size: 250,
          },
          {
            accessorKey: "email",
            enableClickToCopy: true,
            filterVariant: "autocomplete",
            header: "Email",
            size: 300,
          },
        ],
      },
      {
        id: "details",
        header: "Details",
        columns: [
          {
            accessorKey: "role",
            header: "Role",
            size: 200,
            Cell: ({ cell }) => (
              <Box
                component="span"
                sx={(theme) => ({
                  backgroundColor:
                    cell.getValue<String>() == "super_admin"
                      ? theme.palette.error.dark
                      : cell.getValue<String>() == "super_admin"
                      ? theme.palette.warning.dark
                      : theme.palette.success.dark,
                  borderRadius: "0.25rem",
                  color: "#fff",
                  maxWidth: "9ch",
                  p: "0.25rem",
                })}
              >
                {cell.getValue<number>()?.toLocaleString?.("en-US", {
                  style: "currency",
                  currency: "USD",
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                })}
              </Box>
            ),
          },
          {
            accessorFn: (row) => new Date(row.createdAt),
            id: "createdAt",
            header: "Created At",
            filterVariant: "date",
            sortingFn: "datetime",
            Cell: ({ cell }) => cell.getValue<Date>()?.toLocaleDateString(), // Render Date as string
          },
          {
            accessorFn: (row) => new Date(row.updatedAt),
            id: "updatedAt",
            header: "Updated At",
            filterVariant: "date",
            sortingFn: "datetime",
            Cell: ({ cell }) => cell.getValue<Date>()?.toLocaleDateString(), // Render Date as string
          },
        ],
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data: users, // Assuming the users prop contains the data
    enableColumnFilterModes: true,
    enableColumnOrdering: true,
    enableGrouping: true,
    enableColumnPinning: true,
    enableFacetedValues: true,
    enableRowActions: true,
    enableRowSelection: true,
    initialState: {
      showGlobalFilter: true,
      columnPinning: {
        left: ["mrt-row-expand", "mrt-row-select"],
        right: ["mrt-row-actions"],
      },
    },
    paginationDisplayMode: "pages",
    positionToolbarAlertBanner: "bottom",
    muiSearchTextFieldProps: {
      size: "small",
      variant: "outlined",
    },
    muiPaginationProps: {
      color: "secondary",
      rowsPerPageOptions: [5, 10, 20, 30],
      shape: "rounded",
      variant: "outlined",
    },
    renderRowActionMenuItems: ({ row, closeMenu }) => [
      <MenuItem
        key={`edit-${row.original._id}`}
        onClick={() => {
          handleClickOpenEdit(row.original);
          closeMenu();
        }}
        sx={{ m: 0 }}
      >
        <ListItemIcon>
          <PersonAddIcon />
        </ListItemIcon>
        Edit profile
      </MenuItem>,
      <MenuItem
        key={`reset-${row.original._id}`}
        onClick={() => {
          handleClickOpenReset(row.original);
          closeMenu();
        }}
        sx={{ m: 0 }}
      >
        <ListItemIcon>
          <VpnKeyIcon />
        </ListItemIcon>
        Reset Password
      </MenuItem>,
      <MenuItem
        key={`delete-${row.original._id}`}
        onClick={() => {
          handleClickOpenDelete(row.original);
          closeMenu();
        }}
        sx={{ m: 0 }}
      >
        <ListItemIcon>
          <DeleteForever />
        </ListItemIcon>
        Delete
      </MenuItem>,
    ],

    renderTopToolbar: ({ table }) => {
      return (
        <Box
          sx={(theme) => ({
            backgroundColor: lighten(theme.palette.background.default, 0.05),
            display: "flex",
            gap: "0.5rem",
            p: "8px",
            justifyContent: "space-between",
          })}
        ></Box>
      );
    },
  });

  return (
    <Box>
      <MaterialReactTable table={table} />
      <Box>
        {/* Dialog for Adding User */}
        <Dialog open={openEdit}>
          <EditProfile
            handleClose={handleCloseEdit}
            selectedRowData={selectedRowData}
          />
        </Dialog>
        {/* Dialog for Reset Password */}
        <Dialog open={openReset}>
          <ResetPassword
            handleClose={handleCloseReset}
            selectedRowData={selectedRowData}
          />
        </Dialog>
        {/* Delete */}
        <Dialog open={openDelete}>
          <Warning
            handleClose={handleCloseDelete}
            handleAction={handleDeleteUser}
            message={`Are You Sure Do You Want to delete ${selectedRowData?.firstName} ${selectedRowData?.lastName}`}
            isLoading={isLoading}
            isSuccess={isSuccess}
          />
        </Dialog>
      </Box>
    </Box>
  );
};

export default UsersListTable;
function setToastData(arg0: { message: string; success: boolean }) {
  throw new Error("Function not implemented.");
}
