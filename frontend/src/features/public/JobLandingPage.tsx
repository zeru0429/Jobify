import { useState, useEffect } from "react";
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
import { useNavigate } from "react-router-dom";
import { useGetIndexPageMutation } from "../../services/public_service";
import { ErrorResponseType } from "../../_types/form_types";
import { useToast } from "../../context/ToastContext";

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
  initialJobs: JobLandingPageType[];
  loadMoreJobs: () => void;
}

const JobLandingPage: React.FC<JobLandingPageProps> = ({ initialJobs }) => {
  const [jobsList, setJobs] = useState<JobLandingPageType[]>(initialJobs);
  const [skip, setSkip] = useState(0);
  const [expanded, setExpanded] = useState<string | null>(null); // Track which job description is expanded
  const navigate = useNavigate();
  const { setToastData } = useToast();
  const [getIndexPage] = useGetIndexPageMutation();
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const handleApplyClick = (job: JobLandingPageType) => {
    navigate(`/apply/`, { state: job });
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const loadMoreJobsHandler = async () => {
    if (isLoadingMore) return;
    setIsLoadingMore(true);
    try {
      const response = await getIndexPage({ take: 10, skip });
      if (response.data) {
        setJobs((prevJobs) => [...prevJobs, ...response.data]);
        setSkip((prevSkip) => prevSkip + 10);
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
  }, [skip, isLoadingMore]);

  const handleToggleDescription = (jobId: string) => {
    setExpanded(expanded === jobId ? null : jobId); // Toggle the expanded state
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
          <Grid
            item
            xs={12}
            sm={12}
            md={6}
            key={`job-${job._id} -${
              Math.floor(Math.random() * 100) + 1
            } - ${new Date()}`}
          >
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
                  onClick={() => handleToggleDescription(job._id)}
                  sx={{ mt: 1 }}
                >
                  {expanded === job._id ? "Show Less" : "See All"}
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
          </Grid>
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
