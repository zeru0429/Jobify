import { useMemo } from "react";

// MRT Imports
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
  MRT_GlobalFilterTextField,
  MRT_ToggleFiltersButton,
} from "material-react-table";

// Material UI Imports
import { Box, ListItemIcon, MenuItem, lighten } from "@mui/material";

// Icons Imports
import { AccountCircle, Send } from "@mui/icons-material";

// Mock Data

export type CompanyListType = {
  _id: string;
  name: string;
  logo: string;
  admin: string;
  createdAt: string; // Change to string to match the actual data
  updatedAt: string; // Change to string to match the actual data
};
interface CompanyListTableProps {
  companies: CompanyListType[];
}

const CompanyListTable: React.FC<CompanyListTableProps> = ({ companies }) => {
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
          },
          {
            accessorKey: "logo",
            header: "Logo",
            size: 100,
            Cell: ({ cell }) => {
              const logoUrl = cell.getValue<string>();
              const isValidUrl = logoUrl && !logoUrl.includes("undefined");
              return (
                <img
                  src={
                    isValidUrl
                      ? logoUrl
                      : "https://via.placeholder.com/50x50?text=No+Logo"
                  }
                  alt="Company Logo"
                  style={{ width: "50px", height: "50px", borderRadius: "4px" }}
                />
              );
            },
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
          {
            accessorKey: "admin",
            header: "Admin ID",
            size: 200,
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
      rowsPerPageOptions: [10, 20, 30],
      shape: "rounded",
      variant: "outlined",
    },

    renderRowActionMenuItems: ({ closeMenu }) => [
      <MenuItem
        key={0}
        onClick={() => {
          // View company details logic...
          closeMenu();
        }}
        sx={{ m: 0 }}
      >
        <ListItemIcon>
          <AccountCircle />
        </ListItemIcon>
        View Details
      </MenuItem>,
      <MenuItem
        key={1}
        onClick={() => {
          // Send email logic...
          closeMenu();
        }}
        sx={{ m: 0 }}
      >
        <ListItemIcon>
          <Send />
        </ListItemIcon>
        Send Email
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
        <Box sx={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
          <MRT_GlobalFilterTextField table={table} />
          <MRT_ToggleFiltersButton table={table} />
        </Box>
      </Box>
    ),
  });

  return <MaterialReactTable table={table} />;
};

export default CompanyListTable;
