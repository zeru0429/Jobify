import { useMemo } from "react";

// MRT Imports
import {
  MaterialReactTable,
  type MRT_ColumnDef,
  MRT_GlobalFilterTextField,
  MRT_ToggleFiltersButton,
} from "material-react-table";

// Material UI Imports
import { Box, ListItemIcon, MenuItem, lighten } from "@mui/material";

// Icons Imports
import { AccountCircle, Send } from "@mui/icons-material";

// Mock Data
export type ApplicantListType = {
  job: string;
  applicantName: string;
  applicantEmail: string;
  resume: string;
  coverLetter?: string;
  status: string;
  appliedAt: Date;
};

interface CompanyListTableProps {
  applicants: ApplicantListType[];
}

const ApplicantListTable: React.FC<CompanyListTableProps> = ({
  applicants,
}) => {
  const columns = useMemo<MRT_ColumnDef<ApplicantListType>[]>(
    () => [
      {
        accessorKey: "applicantName",
        header: "Applicant Name",
        size: 200,
      },
      {
        accessorKey: "applicantEmail",
        header: "Email",
        size: 250,
      },
      {
        accessorKey: "resume",
        header: "Resume",
        Cell: ({ cell }) => (
          <a
            href={cell.getValue<string>()}
            target="_blank"
            rel="noopener noreferrer"
          >
            View Resume
          </a>
        ),
        size: 150,
      },
      {
        accessorKey: "coverLetter",
        header: "Cover Letter",
        Cell: ({ cell }) =>
          cell.getValue<string>() ? (
            <a
              href={cell.getValue<string>()}
              target="_blank"
              rel="noopener noreferrer"
            >
              View Cover Letter
            </a>
          ) : (
            "No Cover Letter"
          ),
        size: 150,
      },
      {
        accessorFn: (row) => new Date(row.appliedAt),
        id: "appliedAt",
        header: "Applied At",
        filterVariant: "date",
        filterFn: "lessThan",
        sortingFn: "datetime",
        Cell: ({ cell }) => cell.getValue<Date>()?.toLocaleDateString(),
        size: 150,
      },
      {
        accessorKey: "status",
        header: "Status",
        size: 100,
        Cell: ({ cell }) => {
          const status = cell.getValue<string>();
          const color =
            status.toLowerCase() === "applied"
              ? "#FFC107" // Yellow
              : status.toLowerCase() === "interviewed"
              ? "#2196F3" // Blue
              : status.toLowerCase() === "offered"
              ? "#4CAF50" // Green
              : status.toLowerCase() === "rejected"
              ? "#F44336" // Red
              : "default";

          return (
            <Box
              component="span"
              sx={{
                backgroundColor: color,
                borderRadius: "0.25rem",
                color: "#fff",
                padding: "0.25rem 0.5rem",
                textAlign: "center",
                display: "inline-block",
              }}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </Box>
          );
        },
      },
    ],
    []
  );

  return (
    <MaterialReactTable
      columns={columns}
      data={applicants}
      enableColumnFilterModes
      enableColumnOrdering
      enableGrouping
      enableColumnPinning
      enableFacetedValues
      enableRowActions
      enableRowSelection
      initialState={{
        showGlobalFilter: true,
        columnPinning: {
          left: ["mrt-row-expand", "mrt-row-select"],
          right: ["mrt-row-actions"],
        },
      }}
      paginationDisplayMode="pages"
      positionToolbarAlertBanner="bottom"
      muiSearchTextFieldProps={{
        size: "small",
        variant: "outlined",
      }}
      muiPaginationProps={{
        color: "secondary",
        rowsPerPageOptions: [10, 20, 30],
        shape: "rounded",
        variant: "outlined",
      }}
      renderRowActionMenuItems={({ closeMenu }) => [
        <MenuItem
          key="view-details"
          onClick={() => {
            // Implement your logic to view applicant details
            closeMenu();
          }}
        >
          <ListItemIcon>
            <AccountCircle />
          </ListItemIcon>
          View Details
        </MenuItem>,
        <MenuItem
          key="send-email"
          onClick={() => {
            // Implement your logic to send an email
            closeMenu();
          }}
        >
          <ListItemIcon>
            <Send />
          </ListItemIcon>
          Send Email
        </MenuItem>,
      ]}
      renderTopToolbar={({ table }) => (
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
      )}
    />
  );
};

export default ApplicantListTable;
