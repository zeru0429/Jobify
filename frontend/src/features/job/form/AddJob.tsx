import { useForm, SubmitHandler } from "react-hook-form";
import {
  ErrorResponseType,
  RegisterJobFormType,
} from "../../../_types/form_types";
import CustomInputField from "../../../component/ui/CustomInputField";
import { useAuth } from "../../../context/AuthContext";
import { useToast } from "../../../context/ToastContext";
import { useCreateJobMutation } from "../../../services/job_service";
import { useRequestGeminiMutation } from "../../../services/ai_service";
import CustomTextArea from "../../../component/ui/CustomeTextArea";
import CustomButton from "../../../component/ui/CustomButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CustomDropdownField from "../../../component/ui/CustomDropDown";
import { useGetAllCompanyQuery } from "../../../services/company_service";
import Loader from "../../../component/Loading";
import { useNavigate } from "react-router-dom";
import { Box, CircularProgress, IconButton, Typography } from "@mui/material";
import { Keyboard } from "@mui/icons-material";

interface AddJobProps {}

const AddJob: React.FC<AddJobProps> = () => {
  const navigator = useNavigate();
  const { setToastData } = useToast();
  const { userData } = useAuth();
  const {
    isError: isErrorCompany,
    isLoading: isLoadingCompany,
    isSuccess: isSuccessCompany,
    data: companies,
    error: errorCompany,
  } = useGetAllCompanyQuery("companyApi");
  const [createJob, { isLoading }] = useCreateJobMutation();
  const [createAiRequest, { isLoading: aiIsLoading }] =
    useRequestGeminiMutation();
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<RegisterJobFormType>();

  const onSubmit: SubmitHandler<RegisterJobFormType> = async (data) => {
    try {
      data.createdBy = userData?.id.toString();
      console.log(data);

      const response = await createJob(data).unwrap();
      console.log(response);
      setToastData({
        message: "Job created successfully",
        success: true,
      });
      navigator(-1);
    } catch (error: any) {
      console.log(error);
      const res: ErrorResponseType = error;
      setToastData({
        message: res.data.message,
        success: false,
      });
    }
  };
  const handleTextGeneration = async () => {
    console.log("here");
    console.log(aiIsLoading);
    if (!aiIsLoading) {
      const title = getValues("title");
      const type = getValues("type");
      const description = getValues("description");
      const location = getValues("location");
      const salary = getValues("salary");
      const contactEmail = getValues("contactEmail");
      const company = getValues("company");
      const createdAt = getValues("createdAt");
      const createdBy = getValues("createdBy");

      //  if all of the form input empty return
      if (
        !title &&
        !type &&
        !description &&
        !location &&
        !salary &&
        !contactEmail
      ) {
        return;
      } else {
        console.log({
          title,
          type,
          description,
          location,
          salary,
          contactEmail,
          company,

          createdAt,
          createdBy,
        });
        try {
          const response = await createAiRequest({
            title,
            type,
            description,
            location,
            salary,
            contactEmail,
            company,

            createdAt,
            createdBy,
          });
          const { data } = response;

          setValue("description", `${data}`);
        } catch (error) {
          console.log(error);
        }
      }
    }
  };

  return (
    <div className="w-full">
      <br />
      <br />
      {/* Close icon to close the modal */}
      <ArrowBackIcon onClick={() => window.history.back()} />
      <br />
      <div className="w-full max-w-md p-6 shadow-md rounded-lg text-center m-auto">
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          {/* Companies Name */}
          {isErrorCompany && (
            <p className="text-red-500">Error: {errorCompany.toString()}</p>
          )}
          {isLoadingCompany && (
            <div>
              <Loader />
            </div>
          )}
          {isSuccessCompany && (
            <CustomDropdownField
              id="company"
              options={companies.map((company: any) => ({
                value: company._id,
                label: company.name,
              }))}
              placeholder="Select an option"
              register={register("company", {
                required: "This field is required",
              })}
              error={errors.company}
              iconPath="M12 2L3.5 6.5v5.8c0 4.7 3.2 9.3 8.5 10.7 5.3-1.4 8.5-6 8.5-10.7V6.5L12 2z"
            />
          )}
          {/* Job Title Field */}
          <CustomInputField
            id="title"
            type="text"
            placeholder="Job Title"
            register={register("title", {
              required: "Job title is required",
            })}
            error={errors.title}
            iconPath="M12 12q-1.65 0-2.825-1.175T8 8t1.175-2.825T12 4t2.825 1.175T16 8t-1.175 2.825T12 12m-8 8v-2.8q0-.85.438-1.562T5.6 14.55q1.55-.775 3.15-1.162T12 13t3.25.388t3.15 1.162q.725.375 1.163 1.088T20 17.2V20z"
          />
          {/* Job Type Field */}
          <CustomInputField
            id="type"
            type="text"
            placeholder="Job Type (e.g., Full-time, Part-time)"
            register={register("type", {
              required: "Job type is required",
            })}
            error={errors.type}
            iconPath="M12 12q-1.65 0-2.825-1.175T8 8t1.175-2.825T12 4t2.825 1.175T16 8t-1.175 2.825T12 12m-8 8v-2.8q0-.85.438-1.562T5.6 14.55q1.55-.775 3.15-1.162T12 13t3.25.388t3.15 1.162q.725.375 1.163 1.088T20 17.2V20z"
          />
          {/* Job Location Field */}
          <CustomInputField
            id="location"
            type="text"
            placeholder="Job Location"
            register={register("location", {
              required: "Job location is required",
            })}
            error={errors.location}
            iconPath="M12 2C10.34 2 8.78 2.68 7.5 3.96C6.22 5.24 5.5 6.8 5.5 8.5C5.5 10.25 6.53 12.59 9.66 16.26L12 19l2.34-2.74C17.47 12.59 18.5 10.25 18.5 8.5C18.5 6.8 17.78 5.24 16.5 3.96C15.22 2.68 13.66 2 12 2M12 11.5C10.62 11.5 9.5 10.38 9.5 9C9.5 7.62 10.62 6.5 12 6.5C13.38 6.5 14.5 7.62 14.5 9C14.5 10.38 13.38 11.5 12 11.5Z"
          />
          {/* Salary Field */}
          <CustomInputField
            id="salary"
            type="number"
            placeholder="Salary"
            register={register("salary", {
              required: "Salary is required",
              min: {
                value: 0,
                message: "Salary must be a positive number",
              },
            })}
            error={errors.salary}
            iconPath="M19 3H5c-1.1 0-1.99.9-1.99 2L3 19c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 14H7v-2h10v2zm0-4H7V9h10v4z"
          />
          {/* Email Field */}
          <CustomInputField
            id="email"
            type="email"
            placeholder="Email"
            register={register("contactEmail", {
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Invalid email format",
              },
            })}
            error={errors.contactEmail}
            iconPath="M12 2C10.3 2 9 3.3 9 5V5.1L2.2 10.3C1.8 10.7 1.8 11.3 2.2 11.7L9 17.5C9.4 17.8 10 18 10.5 18H13.5C14 18 14.6 17.8 15 17.5L21.8 11.7C22.2 11.3 22.2 10.7 21.8 10.3L15 5.1V5C15 3.3 13.7 2 12 2ZM12 4C12.6 4 13 4.4 13 5V10.2L17.3 13L12 18L6.7 13L11 10.2V5C11 4.4 11.4 4 12 4Z"
          />

          {/* Job Description Field */}
          <CustomTextArea
            id="jobDescription"
            placeholder="Job Description"
            register={register("description", {
              required: "Job description is required",
            })}
            error={errors.description}
            iconPath="M3 3h18v2H3V3zm0 4h18v2H3V7zm0 4h18v2H3v-2zm0 4h10v2H3v-2zm0 4h18v2H3v-2z"
          />
          <Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography variant="body1" sx={{ marginBottom: 1 }}></Typography>
              {aiIsLoading ? (
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Typography variant="body1" sx={{ marginRight: 1 }}>
                    AI is generating...
                  </Typography>
                  <CircularProgress size="1rem" />
                </Box>
              ) : (
                <Box>
                  <IconButton
                    onClick={handleTextGeneration}
                    sx={{ display: "flex", alignItems: "center" }}
                  >
                    <Typography variant="body1" sx={{ marginRight: 1 }}>
                      Generate Text
                    </Typography>
                    <Keyboard />
                  </IconButton>
                </Box>
              )}
            </Box>
          </Box>
          <br />
          <CustomButton type="submit" isLoading={isLoading}>
            Add Job
          </CustomButton>
        </form>
      </div>
    </div>
  );
};
export default AddJob;
