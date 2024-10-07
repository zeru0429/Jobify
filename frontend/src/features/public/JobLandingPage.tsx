import { useState, useEffect } from "react";
import { Box, Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useGetIndexPageMutation } from "../../services/public_service";
import { ErrorResponseType } from "../../_types/form_types";
import { useToast } from "../../context/ToastContext";
import JobCard from "./JobCard";

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
  company: {
    _id: string;
    name: string;
    avatar: string;
  } | null;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface JobLandingPageProps {
  initialJobs: JobLandingPageType[];
  loadMoreJobs: () => void;
}

const JobLandingPage: React.FC<JobLandingPageProps> = ({ initialJobs }) => {
  const [jobsList, setJobs] = useState<JobLandingPageType[]>(initialJobs);
  const [expanded, setExpanded] = useState<string | null>(null);
  const navigate = useNavigate();
  const { setToastData } = useToast();
  const [getIndexPage] = useGetIndexPageMutation();
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const handleApplyClick = (job: JobLandingPageType) => {
    navigate(`/apply/`, { state: job });
  };

  const loadMoreJobsHandler = async () => {
    if (isLoadingMore) return;
    setIsLoadingMore(true);
    try {
      const response = await getIndexPage({ take: 10, skip: jobsList.length });
      if (response.data) {
        setJobs((prevJobs) => [...prevJobs, ...response.data]);
      }
    } catch (error: any) {
      const res: ErrorResponseType = error;
      setToastData({
        message: res.data.message,
        success: res.data.success,
      });
    } finally {
      setIsLoadingMore(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const container = document.getElementById("job-list-container");
      if (container) {
        const scrolledToBottom =
          container.scrollHeight - container.scrollTop <=
          container.clientHeight + 200;
        if (scrolledToBottom && !isLoadingMore) {
          loadMoreJobsHandler();
        }
      }
    };

    const container = document.getElementById("job-list-container");
    if (container) {
      container.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll);
      }
    };
  }, [isLoadingMore, jobsList.length]);

  const handleToggleDescription = (jobId: string) => {
    setExpanded(expanded === jobId ? null : jobId);
  };

  return (
    <Box
      id="job-list-container"
      sx={{ padding: 4, height: "80vh", overflowY: "auto" }}
    >
      <Typography variant="h4" gutterBottom align="center">
        Job Openings
      </Typography>

      <Grid container spacing={3}>
        {jobsList.map((job: JobLandingPageType) => (
          <JobCard
            key={job._id}
            job={job}
            expanded={expanded}
            onToggleDescription={handleToggleDescription}
            onApplyClick={handleApplyClick}
          />
        ))}
      </Grid>

      {/* Loading Indicator */}
      {isLoadingMore && (
        <Box textAlign="center" mt={4}>
          <Typography variant="h6">Loading more jobs...</Typography>
        </Box>
      )}
    </Box>
  );
};

export default JobLandingPage;
