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
import { Box, Button, ListItemIcon, MenuItem, lighten } from "@mui/material";

// Icons Imports
import { AccountCircle, Send } from "@mui/icons-material";
// Mock Data

export type JobListType = {
  title: string;
  type: string;
  description: string;
  location: string;
  createdAt: string;
  salary: number;
  contactEmail: string;
  createdBy: string;
  company: string;
  updatedAt: string;
};

type JobListTableProps = {
  jobs: JobListType[];
};
const JobListTable: React.FC<JobListTableProps> = ({ jobs }) => {
  const columns = useMemo<MRT_ColumnDef<JobListType>[]>(
    () => [
      {
        id: "job",
        header: "Job Details",
        columns: [
          {
            accessorKey: "title",
            header: "Job Title",
            size: 250,
          },
          {
            accessorKey: "location",
            header: "Location",
            size: 200,
          },
          {
            accessorKey: "salary",
            filterFn: "between",
            header: "Salary",
            size: 150,
            Cell: ({ cell }) => (
              <Box
                component="span"
                sx={(theme) => ({
                  backgroundColor:
                    cell.getValue<number>() < 50_000
                      ? theme.palette.error.dark
                      : cell.getValue<number>() >= 50_000 &&
                        cell.getValue<number>() < 75_000
                      ? theme.palette.warning.dark
                      : theme.palette.success.dark,
                  borderRadius: "0.25rem",
                  color: "#fff",
                  maxWidth: "9ch",
                  p: "0.25rem",
                })}
              >
                {cell.getValue<number>()?.toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                })}
              </Box>
            ),
          },
          {
            accessorKey: "type",
            header: "Job Type",
            size: 150,
          },
        ],
      },
      {
        id: "additionalInfo",
        header: "Additional Info",
        columns: [
          {
            accessorFn: (row) => new Date(row.createdAt), // convert to Date for sorting and filtering
            id: "createdAt",
            header: "Created At",
            filterVariant: "date",
            filterFn: "lessThan",
            sortingFn: "datetime",
            Cell: ({ cell }) => cell.getValue<Date>()?.toLocaleDateString(), // render Date as a string
          },
          {
            accessorKey: "contactEmail",
            enableClickToCopy: true,
            filterVariant: "autocomplete",
            header: "Contact Email",
            size: 300,
          },
        ],
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data: jobs,
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

    renderRowActionMenuItems: ({ closeMenu }) => [
      <MenuItem
        key={0}
        onClick={() => {
          // View job details logic...
          closeMenu();
        }}
        sx={{ m: 0 }}
      >
        <ListItemIcon>
          <AccountCircle />
        </ListItemIcon>
        View Job Details
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
    renderTopToolbar: ({ table }) => {
      const handleDeactivate = () => {
        table.getSelectedRowModel().flatRows.map((row) => {
          alert("deactivating job " + row.getValue("title"));
        });
      };

      const handleActivate = () => {
        table.getSelectedRowModel().flatRows.map((row) => {
          alert("activating job " + row.getValue("title"));
        });
      };

      return (
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
          <Box>
            <Box sx={{ display: "flex", gap: "0.5rem" }}>
              <Button
                color="error"
                disabled={!table.getIsSomeRowsSelected()}
                onClick={handleDeactivate}
                variant="contained"
              >
                Deactivate
              </Button>
              <Button
                color="success"
                disabled={!table.getIsSomeRowsSelected()}
                onClick={handleActivate}
                variant="contained"
              >
                Activate
              </Button>
            </Box>
          </Box>
        </Box>
      );
    },
  });

  return <MaterialReactTable table={table} />;
};

export default JobListTable;
