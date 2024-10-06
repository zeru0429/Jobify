import { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Avatar,
  Collapse,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

interface Company {
  _id: string;
  name: string;
  type: string;
  companyType: string;
  isActive: boolean;
  avatar: string;
  avatarPublicId: string;
  address: string;
  admin: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface JobLandingPageType {
  _id: string;
  isAvailable: boolean;
  title: string;
  type: string;
  description: string;
  location: string;
  salary: number;
  contactEmail: string;
  createdBy: string;
  company: Company | null; // Allow company to be null
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface JobLandingPageProps {
  jobs: JobLandingPageType[];
}

const JobLandingPage: React.FC<JobLandingPageProps> = ({ jobs }) => {
  const navigate = useNavigate();

  const handleApplyClick = (job: JobLandingPageType) => {
    navigate(`/apply/`, { state: job });
  };

  // Function to format the date
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom align="center">
        Job Openings
      </Typography>

      {jobs.map((job: JobLandingPageType) => {
        const [showFullDescription, setShowFullDescription] = useState(false);

        return (
          <Card key={job._id} sx={{ boxShadow: 3, marginBottom: 2 }}>
            <CardContent>
              <Box display="flex" alignItems="center" mb={2}>
                <Avatar
                  src={job.company?.avatar} // Use optional chaining
                  alt={job.company?.name || "Company Avatar"} // Fallback for alt text
                  sx={{ mr: 2 }}
                />
                <Typography variant="h6">
                  {job.company?.name || "Unknown Company"}
                </Typography>{" "}
                {/* Fallback for company name */}
              </Box>
              <Typography variant="h5" component="div">
                {job.title}
              </Typography>
              <Typography color="text.secondary">{job.type}</Typography>
              <Typography color="text.secondary">{job.location}</Typography>
              <Typography color="text.secondary">
                Posted on: {formatDate(job.createdAt)}{" "}
                {/* Display posted date */}
              </Typography>

              <Collapse in={showFullDescription}>
                <Typography variant="body2" color="text.secondary">
                  {job.description}
                </Typography>
              </Collapse>

              <Button
                variant="text"
                color="primary"
                onClick={() => setShowFullDescription(!showFullDescription)}
                sx={{ mt: 1 }}
              >
                {showFullDescription ? "Show Less" : "See All"}
              </Button>

              <Button
                variant="contained"
                color="primary"
                sx={{ marginTop: 2 }}
                onClick={() => handleApplyClick(job)}
              >
                Apply
              </Button>
            </CardContent>
          </Card>
        );
      })}
    </Box>
  );
};

export default JobLandingPage;
