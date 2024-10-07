import { useMemo, useState } from "react";

// MRT Imports
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from "material-react-table";

// Material UI Imports
import {
  Autocomplete,
  Box,
  Dialog,
  ListItemIcon,
  MenuItem,
  TextField,
  lighten,
} from "@mui/material";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { DeleteForever } from "@mui/icons-material";
import { useToast } from "../../context/ToastContext";
import { useDeleteCompanyMutation } from "../../services/company_service";
import { ErrorResponseType } from "../../_types/form_types";

import Warning from "../../component/Warning";
import UpdateCompany from "./form/UpdateCompany";
import ChangeCompanyLogo from "./form/ChangeCompanyLogo";
// Icons Imports

// Mock Data

export type CompanyListType = {
  _id: string;
  name: string;
  logo?: string;
  avatar?: string;
  admin: string;
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
  type?: string;
  companyType?: string;
  address?: string;
  description?: string;
};

interface CompanyListTableProps {
  companies: CompanyListType[];
}

const CompanyListTable: React.FC<CompanyListTableProps> = ({ companies }) => {
  const [openDelete, setOpenDelete] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openChangeLogo, setOpenChangeLogo] = useState(false);
  const { setToastData } = useToast();
  const [selectedRowData, setSelectedRowData] =
    useState<CompanyListType | null>(null);

  const [deleteCompany, { isLoading, isSuccess }] = useDeleteCompanyMutation();
  const handleClickOpenDelete = (row: CompanyListType) => {
    setSelectedRowData(row);
    setOpenDelete(true);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  const handleClickOpenEdit = (row: CompanyListType) => {
    setSelectedRowData(row);
    setOpenEdit(true);
  };
  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  const handleClickOpenChangeLogo = (row: CompanyListType) => {
    setSelectedRowData(row);
    setOpenChangeLogo(true);
  };
  const handleCloseChangeLogo = () => {
    setOpenChangeLogo(false);
  };

  const handleDeleteCompany = async () => {
    if (selectedRowData?._id != null) {
      try {
        await deleteCompany({ params: selectedRowData?._id }).unwrap();
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
  const nameSuggestions = companies.map((company) => company.name);
  const typeSuggestions = Array.from(
    new Set(companies.map((company) => company.type))
  );
  const addressSuggestions = Array.from(
    new Set(companies.map((company) => company.address))
  );
  const companyTypeSuggestions = Array.from(
    new Set(companies.map((company) => company.companyType))
  );
  const allSuggestions = Array.from(
    new Set([
      ...nameSuggestions,
      ...typeSuggestions,
      ...companyTypeSuggestions,
      ...addressSuggestions,
    ])
  );
  const columns = useMemo<MRT_ColumnDef<CompanyListType>[]>(
    () => [
      {
        id: "companyDetails",
        header: "Company Details",
        columns: [
          {
            accessorKey: "name",
            header: "Company Name",
            size: 250,
            Filter: ({ column }) => (
              <Autocomplete
                options={nameSuggestions}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Filter by Name"
                    variant="outlined"
                    size="small"
                  />
                )}
                onChange={(_event, value) => column.setFilterValue(value)}
              />
            ),
          },
          {
            accessorKey: "avatar",
            header: "Avatar",
            size: 100,
            enableSorting: false,
            enableColumnFilter: false,
            Cell: ({ cell }) => {
              const avatarUrl = cell.getValue<string>();
              const isValidUrl = avatarUrl && !avatarUrl.includes("undefined");
              return (
                <img
                  src={
                    isValidUrl
                      ? avatarUrl
                      : "https://via.placeholder.com/50x50?text=No+Avatar"
                  }
                  alt="Company Avatar"
                  style={{ width: "50px", height: "50px", borderRadius: "4px" }}
                />
              );
            },
          },
          {
            accessorKey: "address",
            header: "Address",
            size: 200,
            Filter: ({ column }) => (
              <Autocomplete
                options={addressSuggestions}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Filter by Address"
                    variant="outlined"
                    size="small"
                  />
                )}
                onChange={(_event, value) => column.setFilterValue(value)}
              />
            ),
          },
          {
            accessorKey: "type",
            header: "Type",
            size: 150,
            Filter: ({ column }) => (
              <Autocomplete
                options={typeSuggestions}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Filter by type"
                    variant="outlined"
                    size="small"
                  />
                )}
                onChange={(_event, value) => column.setFilterValue(value)}
              />
            ),
          },
          {
            accessorKey: "companyType",
            header: "Company Type",
            size: 150,
            Filter: ({ column }) => (
              <Autocomplete
                options={companyTypeSuggestions}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Filter by Company type"
                    variant="outlined"
                    size="small"
                  />
                )}
                onChange={(_event, value) => column.setFilterValue(value)}
              />
            ),
          },
        ],
      },
      {
        id: "additionalInfo",
        header: "Additional Info",
        columns: [
          {
            accessorKey: "createdAt",
            header: "Created At",
            filterVariant: "date",
            sortingFn: "datetime",
            Cell: ({ cell }) =>
              new Date(cell.getValue<string>()).toLocaleDateString(),
          },
        ],
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data: companies,
    enableColumnFilterModes: true,
    enableColumnOrdering: true,
    enableGrouping: true,
    enableColumnPinning: true,
    enableFacetedValues: true,
    enableRowActions: true,
    enableRowSelection: true,
    initialState: {
      pagination: {
        pageSize: 5,
        pageIndex: 0,
      },
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
        Edit company profile
      </MenuItem>,
      <MenuItem
        key={`changeLogo-${row.original._id}`}
        onClick={() => {
          handleClickOpenChangeLogo(row.original);
          closeMenu();
        }}
        sx={{ m: 0 }}
      >
        <ListItemIcon>
          <VpnKeyIcon />
        </ListItemIcon>
        changeLogo Password
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

    renderTopToolbar: ({ table }) => (
      <Box
        sx={(theme) => ({
          backgroundColor: lighten(theme.palette.background.default, 0.05),
          display: "flex",
          gap: "0.5rem",
          p: "8px",
          justifyContent: "space-between",
        })}
      >
        <Autocomplete
          options={allSuggestions}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Search..."
              variant="outlined"
              size="small"
              sx={{ width: "300px" }} // Adjust the width as needed
            />
          )}
          onChange={(_event, value) => {
            // Set global filter based on the selected suggestion
            table.setGlobalFilter(value);
          }}
          onInputChange={(_event, value) => {
            // Update the global filter as the user types
            table.setGlobalFilter(value);
          }}
          clearOnEscape
          freeSolo // Allows users to input values that are not in the options
        />
      </Box>
    ),
  });

  return (
    <>
      <Box>
        <MaterialReactTable table={table} />
      </Box>
      <Box>
        {/* Dialog for update Company Profile */}
        <Dialog open={openEdit}>
          <UpdateCompany
            handleClose={handleCloseEdit}
            selectedRowData={selectedRowData}
          />
        </Dialog>
        {/* Dialog for change logo */}
        <Dialog open={openChangeLogo}>
          <ChangeCompanyLogo
            handleClose={handleCloseChangeLogo}
            selectedRowData={selectedRowData}
          />
        </Dialog>
        {/* Delete */}
        <Dialog open={openDelete}>
          <Warning
            handleClose={handleCloseDelete}
            handleAction={handleDeleteCompany}
            message={`Are You Sure Do You Want to delete ${selectedRowData?.name}`}
            isLoading={isLoading}
            isSuccess={isSuccess}
          />
        </Dialog>
      </Box>
    </>
  );
};

export default CompanyListTable;
