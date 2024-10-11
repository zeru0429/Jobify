// JobCard.tsx
import React from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Avatar,
  Collapse,
  Grid,
} from "@mui/material";
import { JobLandingPageType } from "./JobLandingPage"; // Adjust the import based on your file structure

interface JobCardProps {
  job: JobLandingPageType;
  expanded: string | null;
  onToggleDescription: (jobId: string) => void;
  onApplyClick: (job: JobLandingPageType) => void;
}

const JobCard: React.FC<JobCardProps> = ({
  job,
  expanded,
  onToggleDescription,
  onApplyClick,
}) => {
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <Grid item xs={12} sm={12} md={6} key={job._id}>
      <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
        <CardContent>
          <Box display="flex" alignItems="center" mb={2}>
            <Avatar
              src={job.company?.avatar}
              alt={job.company?.name || "Company Avatar"}
              sx={{ mr: 2 }}
            />
            <Typography variant="h6">
              {job.company?.name || "Unknown Company"}
            </Typography>
          </Box>
          <Typography variant="h5" component="div">
            {job.title}
          </Typography>
          <Typography variant="h6" color={job.isAvailable ? "green" : "red"}>
            {job.isAvailable ? "Available" : "Not Available"}
          </Typography>
          <Typography color="text.secondary">{job.type}</Typography>
          <Typography color="text.secondary">{job.location}</Typography>
          <Typography color="text.secondary">
            Posted on: {formatDate(job.createdAt)}
          </Typography>

          <Collapse in={expanded === job._id}>
            <Typography variant="body2" color="text.secondary">
              {job.description}
            </Typography>
          </Collapse>

          <Button
            variant="text"
            color="primary"
            onClick={() => onToggleDescription(job._id)}
            sx={{ mt: 1 }}
          >
            {expanded === job._id ? "Show Less" : "See All"}
          </Button>

          <Button
            variant="contained"
            color="primary"
            sx={{ marginTop: 2 }}
            disabled={!job.isAvailable}
            onClick={() => onApplyClick(job)}
          >
            Apply
          </Button>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default JobCard;
