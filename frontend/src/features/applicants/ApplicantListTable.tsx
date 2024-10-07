import { useMemo, useState } from "react";

// MRT Imports
import {
  MaterialReactTable,
  type MRT_ColumnDef,
  MRT_GlobalFilterTextField,
  MRT_ToggleFiltersButton,
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

// Icons Imports
import { AccountCircle, DeleteForever, Send } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import Warning from "../../component/Warning";
import { useDeleteApplicantMutation } from "../../services/applicants_service";
import { useToast } from "../../context/ToastContext";
import { ErrorResponseType } from "../../_types/form_types";
import UpdateApplication from "./form/UpdateApplicant";

// Mock Data
export type ApplicantListType = {
  _id: string;
  job: string;
  applicantName: string;
  applicantEmail: string;
  resume: string;
  coverLetter?: string;
  status: string;
  appliedAt: Date;
};

interface ApplicantListTableProps {
  applicants: ApplicantListType[];
}

const ApplicantListTable: React.FC<ApplicantListTableProps> = ({
  applicants,
}) => {
  const { setToastData } = useToast();
  const navigator = useNavigate();
  const [openDelete, setOpenDelete] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [selectedRowData, setSelectedRowData] =
    useState<ApplicantListType | null>(null);
  const [deleteApplicant, { isLoading, isSuccess }] =
    useDeleteApplicantMutation();
  const handleClickOpenEdit = (row: ApplicantListType) => {
    setSelectedRowData(row);
    setOpenEdit(true);
  };
  const handleCloseEdit = () => {
    setOpenEdit(false);
  };
  const handleClickOpenDelete = (row: ApplicantListType) => {
    setSelectedRowData(row);
    setOpenDelete(true);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };
  const handleDeleteApplicant = async () => {
    if (selectedRowData?._id != null) {
      try {
        await deleteApplicant({ params: selectedRowData?._id }).unwrap();
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
  const nameSuggestions = Array.from(
    new Set(applicants.map((applicant) => applicant.applicantName))
  );
  const emailSuggestions = Array.from(
    new Set(applicants.map((applicant) => applicant.applicantEmail))
  );
  const statusSuggestions = Array.from(
    new Set(applicants.map((applicant) => applicant.status))
  );
  const allSuggestions = Array.from(
    new Set([...nameSuggestions, ...statusSuggestions, ...emailSuggestions])
  );

  const columns = useMemo<MRT_ColumnDef<ApplicantListType>[]>(
    () => [
      {
        accessorKey: "applicantName",
        header: "Applicant Name",
        size: 200,
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
            onChange={(event, value) => column.setFilterValue(value)}
          />
        ),
      },
      {
        accessorKey: "applicantEmail",
        header: "Email",
        size: 250,
        Filter: ({ column }) => (
          <Autocomplete
            options={emailSuggestions}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Filter by Email"
                variant="outlined"
                size="small"
              />
            )}
            onChange={(event, value) => column.setFilterValue(value)}
          />
        ),
      },
      {
        accessorKey: "resume",
        header: "Resume",
        enableColumnFilter: false,
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
        enableColumnFilter: false,
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
        Filter: ({ column }) => (
          <Autocomplete
            options={statusSuggestions}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Filter by Status"
                variant="outlined"
                size="small"
              />
            )}
            onChange={(event, value) => column.setFilterValue(value)}
          />
        ),
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
    <>
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
        renderRowActionMenuItems={({ row, closeMenu }) => [
          <MenuItem
            key="view-details"
            onClick={() => {
              navigator("/admin/applicant-detail", { state: row.original });
              closeMenu();
            }}
          >
            <ListItemIcon>
              <AccountCircle />
            </ListItemIcon>
            View Details
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

          <MenuItem
            key="send-email"
            onClick={() => {
              handleClickOpenEdit(row.original);
              closeMenu();
            }}
          >
            <ListItemIcon>
              <Send />
            </ListItemIcon>
            Change status
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
              onChange={(event, value) => {
                // Set global filter based on the selected suggestion
                table.setGlobalFilter(value);
              }}
            />
          </Box>
        )}
      />
      {/* Delete */}
      <Dialog open={openDelete}>
        <Warning
          handleClose={handleCloseDelete}
          handleAction={handleDeleteApplicant}
          message={`Are You Sure Do You Want to delete ${selectedRowData?.applicantName}`}
          isLoading={isLoading}
          isSuccess={isSuccess}
        />
      </Dialog>
      {/* Dialog for update Company Profile */}
      <Dialog open={openEdit}>
        <UpdateApplication
          handleClose={handleCloseEdit}
          selectedRowData={selectedRowData}
        />
      </Dialog>
    </>
  );
};

export default ApplicantListTable;
