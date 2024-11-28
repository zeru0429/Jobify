import { Box, Button, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useLocation } from "react-router-dom";
export interface ApplicantListType {
  _id: string;
  job: {
    _id: string;
    isAvailable: boolean;
    title: string;
    type: string;
    description: string;
    location: string;
    salary: number;
    contactEmail: string;
    createdBy: string;
    company: string;
    createdAt: string;
    updatedAt: string;
  };
  applicantName: string;
  applicantEmail: string;
  resume?: string;
  resumePublicId?: string;
  coverLetter?: string;
  coverLetterPublicId?: string;
  status: string;
  appliedAt: string;
}

const ApplicantDetailPage = () => {
  const location = useLocation();
  const state: ApplicantListType = location.state;

  const handleDownload = (link: string | undefined) => {
    if (link) {
      window.open(link, "_blank");
    }
  };

  return (
    <div>
      <Box>
        {/* Back icon to go to the previous page */}
        <ArrowBackIcon
          sx={{ cursor: "pointer" }}
          onClick={() => window.history.back()}
        />
        <Box sx={{ ml: 10 }}>
          <Typography variant="h5" sx={{ mt: 2, mb: 2 }}>
            Applicant and Job Details
          </Typography>

          {/* Applicant Info */}
          <Typography variant="h6">Applicant Information</Typography>
          <Typography variant="body1">
            <strong>Name:</strong> {state.applicantName}
          </Typography>
          <Typography variant="body1">
            <strong>Email:</strong> {state.applicantEmail}
          </Typography>

          {/* Buttons to download resume and cover letter */}
          <Box sx={{ mt: 3, display: "flex", gap: 2 }}>
            <Button
              variant="outlined"
              color="info"
              onClick={() => handleDownload(state.resume)}
              disabled={!state.resume}
            >
              Download Resume
            </Button>
            <Button
              variant="outlined"
              color="success"
              onClick={() => handleDownload(state.coverLetter)}
              disabled={!state.coverLetter}
            >
              Download Cover Letter
            </Button>
          </Box>

          <br />
          {/* Job Info */}
          <Typography variant="h6">Job Information</Typography>
          <Typography variant="body1">
            <strong>Title:</strong> {state.job.title || "N/A"}
          </Typography>
          <Typography variant="body1">
            <strong>Type:</strong> {state.job.type}
          </Typography>
          <Typography variant="body1">
            <strong>Location:</strong> {state.job.location}
          </Typography>
          <Typography variant="body1">
            <strong>Salary:</strong> ${state.job.salary}
          </Typography>
          <Typography variant="body1">
            <strong>Contact Email:</strong> {state.job.contactEmail}
          </Typography>

          {/* Job Description */}
          <Box sx={{ mt: 2 }}>
            <Typography variant="h6">Job Description</Typography>
            <Typography variant="body2">{state.job.description}</Typography>
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default ApplicantDetailPage;
