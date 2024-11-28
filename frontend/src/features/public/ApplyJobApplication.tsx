import { SubmitHandler, useForm } from "react-hook-form";
import { useToast } from "../../context/ToastContext";
import {
  ApplicationFormType,
  ErrorResponseType,
} from "../../_types/form_types";
import CustomInputField from "../../component/ui/CustomInputField";
import { useLocation, useNavigate } from "react-router-dom";
import { JobLandingPageType } from "./JobLandingPage";
import HomeHeader from "../../component/HomeHeader";
import { useThemeData } from "../../context/them_context";
import { useApplyJobMutation } from "../../services/public_service";
import { useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { Box, Typography, Avatar, Button } from "@mui/material";
import CustomFileInputField from "../../component/ui/CustomeFileInput";
import { useLazyGetIndexPageQuery } from "../../services/public_service";

const ApplyJobApplication = () => {
  const navigate = useNavigate();
  const { themeData, setThemeData } = useThemeData();
  const { isLoggedIn, setUserData, fetchData } = useAuth();
  const [getIndexPage] = useLazyGetIndexPageQuery();
  const { setToastData } = useToast();
  const [applyJob, { isLoading }] = useApplyJobMutation();

  const location = useLocation();
  const state: JobLandingPageType = location.state;

  useEffect(() => {
    getIndexPage({ take: 10, skip: 0 });
  }, [getIndexPage]);

  const handleLogOut = () => {
    localStorage.removeItem("token");
    setUserData({ firstName: "", id: 0, role: "", token: null });
    fetchData();
    navigate("/login");
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ApplicationFormType>({
    defaultValues: {
      job: state._id,
    },
  });

  const onSubmit: SubmitHandler<ApplicationFormType> = async (data) => {
    try {
      const formData = new FormData();
      formData.append("job", data.job);
      formData.append("applicantName", data.applicantName);
      formData.append("applicantEmail", data.applicantEmail);
      if (data.coverLetter?.[0]) formData.append("files", data.coverLetter[0]);
      if (data.resume?.[0]) formData.append("files", data.resume[0]);

      await applyJob(formData).unwrap();
      setToastData({
        message: "Application submitted successfully",
        success: true,
      });
      navigate(-1);
    } catch (error: any) {
      const res: ErrorResponseType = error;
      setToastData({
        message: res.data.message,
        success: res.data.success,
      });
    }
  };

  return (
    <Box sx={{ padding: 4 }}>
      <HomeHeader
        isLoggedIn={isLoggedIn}
        toggleThemeData={() =>
          setThemeData(themeData === "light" ? "dark" : "light")
        }
        themeData={themeData}
        handleLogOut={handleLogOut}
        navigate={navigate}
      />
      <br />

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: 4,
        }}
      >
        <Avatar
          src={state.company?.avatar}
          alt={state.company?.name || "Company Avatar"}
          sx={{ mr: 2 }}
        />
        <Typography variant="h6">
          {state.company?.name || "Unknown Company"}
        </Typography>{" "}
        <Typography variant="h4" gutterBottom>
          {state.title}
        </Typography>
        <Typography variant="h6" color="text.secondary">
          {state.type} | {state.location}
        </Typography>
        <Typography color="text.secondary">
          Posted on: {new Date(state.createdAt).toLocaleDateString()}
        </Typography>
        <Box
          sx={{
            width: "100%",
            maxWidth: 500,
            marginTop: 4,
            padding: 3,
            boxShadow: 2,
            borderRadius: 2,
          }}
        >
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <CustomInputField
              id="applicantName"
              type="text"
              placeholder="Applicant Name"
              register={register("applicantName", {
                required: "Applicant name is required",
              })}
              error={errors.applicantName}
            />
            <CustomInputField
              id="applicantEmail"
              type="email"
              placeholder="Applicant Email"
              register={register("applicantEmail", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: "Invalid email address",
                },
              })}
              error={errors.applicantEmail}
            />
            <CustomFileInputField
              id="resume"
              placeholder="Upload Resume"
              isSingle={true}
              register={register("resume", {
                required: "Resume is required",
                validate: {
                  validFile: (value: File[] | null | undefined) => {
                    const validFileTypes = [
                      "application/pdf",
                      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                      "application/msword",
                    ];
                    if (!value || !value[0]) return "Resume is required";
                    if (!validFileTypes.includes(value[0].type))
                      return "Please upload a valid file (PDF, DOC, DOCX)";
                    return true;
                  },
                },
              })}
              error={
                Array.isArray(errors.resume) ? errors.resume[0] : errors.resume
              }
            />
            <CustomFileInputField
              id="coverLetter"
              placeholder="Upload Cover Letter"
              isSingle={true}
              register={register("coverLetter", {
                required: "Cover letter is required",
                validate: {
                  validFile: (value: File[] | null | undefined) => {
                    const validFileTypes = [
                      "application/pdf",
                      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                      "application/msword",
                    ];
                    if (!value || !value[0]) return "Cover letter is required";
                    if (!validFileTypes.includes(value[0].type))
                      return "Please upload a valid file (PDF, DOC, DOCX)";
                    return true;
                  },
                },
              })}
              error={
                Array.isArray(errors.coverLetter)
                  ? errors.coverLetter[0]
                  : errors.coverLetter
              }
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ marginTop: 2, width: "100%" }}
            >
              {isLoading ? "Loading..." : "Submit Application"}
            </Button>
          </form>
        </Box>
      </Box>
    </Box>
  );
};

export default ApplyJobApplication;
