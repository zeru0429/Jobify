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
import {
  useApplyJobMutation,
  useGetIndexPageMutation,
} from "../../services/public_service";
import { useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { Box, Typography } from "@mui/material";
import CustomFileInputField from "../../component/ui/CustomeFileInput";

const ApplyJobApplication = () => {
  const navigator = useNavigate();
  const { themeData, setThemeData } = useThemeData();

  const navigate = useNavigate();
  const { isLoggedIn, setUserData, fetchData } = useAuth();
  const [getIndexPage, { data: jobs }] = useGetIndexPageMutation();

  useEffect(() => {
    getIndexPage({ take: 10, skip: 0 });
  }, [getIndexPage]);

  const toggleThemeData = () => {
    if (themeData === "light") {
      setThemeData("dark");
    } else if (themeData === "dark") {
      setThemeData("light");
    } else if (themeData === "system") {
      setThemeData("dark");
    }
  };

  const handleLogOut = () => {
    localStorage.removeItem("token");
    setUserData({ firstName: "", id: 0, role: "", token: null });
    fetchData();
    navigate("/login");
  };

  const location = useLocation();

  const state: JobLandingPageType = location.state;

  console.log(state);
  const { setToastData } = useToast();
  const [applyJob, { isLoading }] = useApplyJobMutation();

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
      data.status = "applied";
      console.log(data);
      const response = await applyJob(data).unwrap();
      console.log(response);
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
    <Box>
      <HomeHeader
        isLoggedIn={isLoggedIn}
        toggleThemeData={toggleThemeData}
        themeData={themeData}
        handleLogOut={handleLogOut}
        navigate={navigator}
      />
      <br />
      {/* center header */}
      <Box
        sx={{ height: "100px", display: "flex", justifyContent: "center" }}
      ></Box>
      <Box>
        <Typography variant="h5" component="div">
          {state.title}
        </Typography>
        <Typography color="text.secondary">{state.type}</Typography>
        <Typography color="text.secondary">{state.location}</Typography>
        <br />
      </Box>

      <div className="w-full h-full">
        <div className="w-full max-w-md p-6 shadow-md rounded-lg text-center m-auto">
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            {/* Applicant Name Field */}
            <CustomInputField
              id="applicantName"
              type="text"
              placeholder="Applicant Name"
              register={register("applicantName", {
                required: "Applicant name is required",
              })}
              error={errors.applicantName}
            />
            {/* Email Field */}
            <CustomInputField
              id="applicantEmail"
              type="text"
              placeholder="Applicant Name"
              register={register("applicantEmail", {
                required: "Applicant name is required",
              })}
              error={errors.applicantEmail}
            />

            {/* Resume Field */}

            <CustomFileInputField
              id="resume"
              placeholder="Company resume"
              isSingle={true}
              register={register("resume", {
                required: "Resume is required",
                validate: {
                  validFile: (value: File | null | undefined) => {
                    if (!value) {
                      return "Resume is required";
                    }
                    const validFileTypes = [
                      "application/pdf", // PDF
                      "application/vnd.ms-powerpoint", // PPT
                      "application/vnd.openxmlformats-officedocument.presentationml.presentation", // PPTX
                      "application/msword", // DOC
                      "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // DOCX
                    ];
                    const file: any = value;
                    if (file) {
                      const data: File = file[0];
                      if (!validFileTypes.includes(data.type)) {
                        return "Please upload a valid file (PDF, PPT, DOC)";
                      }
                    }
                    return true;
                  },
                },
              })}
              error={errors.resume}
            />

            {/* Cover Letter Field */}
            <CustomFileInputField
              id="coverLetter"
              placeholder="Company CoverLetter"
              isSingle={true}
              register={register("coverLetter", {
                required: "CoverLetter is required",
                validate: {
                  validFile: (value: File | null | undefined) => {
                    if (!value) {
                      return "Resume is required";
                    }
                    const validFileTypes = [
                      "application/pdf", // PDF
                      "application/vnd.ms-powerpoint", // PPT
                      "application/vnd.openxmlformats-officedocument.presentationml.presentation", // PPTX
                      "application/msword", // DOC
                      "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // DOCX
                    ];
                    const file: any = value;
                    if (file) {
                      const data: File = file[0];
                      if (!validFileTypes.includes(data.type)) {
                        return "Please upload a valid file (PDF, PPT, DOC)";
                      }
                    }
                    return true;
                  },
                },
              })}
              error={errors.coverLetter}
            />

            <button
              type="submit"
              className="bg-[#002A47] w-full py-2 text-white rounded-md hover:bg-[#112737] dark:bg-[#071218] hover:dark:bg-[#0c1920] transition duration-300"
            >
              {isLoading ? <p>Loading</p> : <p>Submit Application</p>}
            </button>
          </form>
        </div>
      </div>
    </Box>
  );
};
export default ApplyJobApplication;
