import { useMemo, useState } from "react";

// MRT Imports
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from "material-react-table";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { useToast } from "../../context/ToastContext";

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

// Icons Imports
import { DeleteForever } from "@mui/icons-material";
import { useDeleteJobMutation } from "../../services/job_service";
import { ErrorResponseType } from "../../_types/form_types";
import Warning from "../../component/Warning";
import { useNavigate } from "react-router-dom";

// Mock Data

export type JobListType = {
  _id: string;
  isAvailable: boolean;
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
  const navigator = useNavigate();
  const { setToastData } = useToast();

  const [openDelete, setOpenDelete] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState<JobListType | null>(
    null
  );
  const [deleteJob, { isLoading, isSuccess }] = useDeleteJobMutation();

  const handleClickOpenDelete = (row: JobListType) => {
    setSelectedRowData(row);
    setOpenDelete(true);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  const handleDeleteJob = async () => {
    if (selectedRowData?._id != null) {
      try {
        await deleteJob({ params: selectedRowData?._id }).unwrap();
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
  const titleSuggestions = Array.from(new Set(jobs.map((job) => job.title)));
  const typeSuggestions = Array.from(new Set(jobs.map((job) => job.type)));

  const locationSuggestions = Array.from(
    new Set(jobs.map((job) => job.location))
  );

  const salarySuggestions = Array.from(new Set(jobs.map((job) => job.salary)));
  const availabilitySuggestions = Array.from(
    new Set(jobs.map((job) => job.isAvailable))
  );
  const allSuggestions = Array.from(
    new Set([
      ...titleSuggestions,
      ...typeSuggestions,
      ...locationSuggestions,
      ...salarySuggestions,
      ...availabilitySuggestions,
    ])
  );
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
            Filter: ({ column }) => (
              <Autocomplete
                options={titleSuggestions}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Filter by Title"
                    variant="outlined"
                    size="small"
                  />
                )}
                onChange={(_event, value) => column.setFilterValue(value)}
              />
            ),
          },
          {
            accessorKey: "location",
            header: "Location",
            size: 200,
            Filter: ({ column }) => (
              <Autocomplete
                options={locationSuggestions}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Filter by Location"
                    variant="outlined"
                    size="small"
                  />
                )}
                onChange={(_event, value) => column.setFilterValue(value)}
              />
            ),
          },
          {
            accessorKey: "salary",
            filterFn: "between",
            header: "Salary",
            size: 150,
            Filter: ({ column }) => (
              <Autocomplete
                options={salarySuggestions}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Filter by Salary"
                    variant="outlined"
                    size="small"
                  />
                )}
                onChange={(_event, value) => column.setFilterValue(value)}
              />
            ),
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
            Filter: ({ column }) => (
              <Autocomplete
                options={typeSuggestions}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Filter by Type"
                    variant="outlined"
                    size="small"
                  />
                )}
                onChange={(_event, value) => column.setFilterValue(value)}
              />
            ),
          },
          {
            accessorKey: "isAvailable",
            header: "Availability",
            Filter: ({ column }) => (
              <Autocomplete
                options={[true, false]} // Options for boolean values
                getOptionLabel={(option) =>
                  option ? "Available" : "Unavailable"
                } // Display labels
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Filter by Availability"
                    variant="outlined"
                    size="small"
                  />
                )}
                onChange={(_event, value) => {
                  column.setFilterValue(value); // Set the filter value directly to boolean
                }}
              />
            ),
            Cell: ({ cell }) => (
              <Box
                component="span"
                sx={{
                  backgroundColor: cell.getValue<boolean>() ? "green" : "red",
                  borderRadius: "0.25rem",
                  color: "#fff",
                  maxWidth: "6ch",
                  p: "0.25rem",
                  textAlign: "center",
                }}
              >
                {cell.getValue<boolean>() ? "Available" : "Unavailable"}
              </Box>
            ),
          },
        ],
      },
      {
        id: "additionalInfo",
        header: "Additional Info",
        columns: [
          {
            accessorFn: (row) => new Date(row.createdAt),
            id: "createdAt",
            header: "Created At",
            filterVariant: "date",
            filterFn: "lessThan",
            sortingFn: "datetime",
            Cell: ({ cell }) => cell.getValue<Date>()?.toLocaleDateString(),
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

    renderRowActionMenuItems: ({ row, closeMenu }) => [
      <MenuItem
        key={`edit-${row.original._id}`}
        onClick={() => {
          // navigate to UpdateJob page by passing this job data
          navigator(`/admin/update-job`, { state: row.original });

          closeMenu();
        }}
        sx={{ m: 0 }}
      >
        <ListItemIcon>
          <PersonAddIcon />
        </ListItemIcon>
        Edit Job
      </MenuItem>,
      <MenuItem
        key={`reset-${row.original._id}`}
        onClick={() => {
          navigator(`/admin/applicants`, { state: row.original._id });

          closeMenu();
        }}
        sx={{ m: 0 }}
      >
        <ListItemIcon>
          <VpnKeyIcon />
        </ListItemIcon>
        View Applicants list
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
      {/* Delete */}
      <Box>
        <MaterialReactTable table={table} />
      </Box>
      <Dialog open={openDelete}>
        <Warning
          handleClose={handleCloseDelete}
          handleAction={handleDeleteJob}
          message={`Are You Sure Do You Want to delete ${selectedRowData?.title} `}
          isLoading={isLoading}
          isSuccess={isSuccess}
        />
      </Dialog>
    </>
  );
};

export default JobListTable;
