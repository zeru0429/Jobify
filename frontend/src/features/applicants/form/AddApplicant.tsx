import { SubmitHandler, useForm } from "react-hook-form";
import { useToast } from "../../../context/ToastContext";
import {
  ApplicationFormType,
  ErrorResponseType,
} from "../../../_types/form_types";
import { useCreateApplicantMutation } from "../../../services/applicants_service";
import CustomInputField from "../../../component/ui/CustomInputField";

const AddApplication = () => {
  const { setToastData } = useToast();
  const [createApplication, { isLoading }] = useCreateApplicantMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ApplicationFormType>();

  const onSubmit: SubmitHandler<ApplicationFormType> = async (data) => {
    try {
      data.status = "applied"; // Set the default status
      console.log(data);
      const response = await createApplication(data).unwrap();
      console.log(response);
      setToastData({
        message: "Application submitted successfully",
        success: true,
      });
    } catch (error: any) {
      const res: ErrorResponseType = error;
      setToastData({
        message: res.data.message,
        success: res.data.success,
      });
    }
  };

  return (
    <div className="w-full">
      <div className="w-full max-w-md p-6 shadow-md rounded-lg text-center m-auto">
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          {/* Job ID Field */}
          <CustomInputField
            id="job"
            type="text"
            placeholder="Job ID"
            register={register("job", {
              required: "Job ID is required",
            })}
            error={errors.job}
          />

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

          {/* Applicant Email Field */}
          <CustomInputField
            id="applicantEmail"
            type="email"
            placeholder="Applicant Email"
            register={register("applicantEmail", {
              required: "Applicant email is required",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Invalid email format",
              },
            })}
            error={errors.applicantEmail}
          />

          {/* Resume Field */}
          <CustomInputField
            id="resume"
            type="url"
            placeholder="Resume URL (optional)"
            register={register("resume")}
            error={errors.resume}
          />

          {/* Cover Letter Field */}
          <CustomInputField
            id="coverLetter"
            type="url"
            placeholder="Cover Letter URL (optional)"
            register={register("coverLetter")}
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
  );
};
export default AddApplication;
