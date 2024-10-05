import { useForm, SubmitHandler } from "react-hook-form";
import {
  ErrorResponseType,
  RegisterJobFormType,
} from "../../_types/form_types";
import CustomInputField from "../../component/ui/CustomInputField";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../context/ToastContext";
import { useCreateJobMutation } from "../../services/job_service";
import { useRequestGeminiMutation } from "../../services/ai_service";
import CustomTextArea from "../../component/ui/CustomeTextArea";

const AddJob = () => {
  const { setToastData } = useToast();
  const { userData } = useAuth();
  const [createJob, { isLoading }] = useCreateJobMutation();
  const [createAiRequest, { isLoading: aiIsLoading, isError: aiIsError }] =
    useRequestGeminiMutation();
  const {
    register,
    handleSubmit,
    getValues,
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
    } catch (error: any) {
      const res: ErrorResponseType = error;
      setToastData({
        message: res.data.message,
        success: res.data.success,
      });
    }
  };
  const handleFocus = async () => {
    if (!aiIsLoading && !aiIsError) {
      const title = getValues("title");
      const type = getValues("type");
      const description = getValues("description");
      const location = getValues("location");
      const salary = getValues("salary");
      const contactEmail = getValues("contactEmail");

      if (title.length > 3) {
        // Prepare a detailed prompt for the AI
        const prompt = `Generate a job description for a ${title} position. 
      Job Type: ${type}. 
      Job Description: ${description}. 
      Location: ${location}. 
      Salary: ${salary}. 
      Contact Email: ${contactEmail}. 
      Please include key responsibilities, qualifications, and any additional requirements.`;
        console.log(prompt);
        const response = await createAiRequest({
          contents: [
            {
              parts: [
                { text: prompt }, // Use the prepared prompt
              ],
            },
          ],
        }).unwrap();

        console.log(response);
      }
    }
  };

  const handleBlur = () => {
    console.log("Text area blurred");
    if (aiIsLoading) {
    } else if (aiIsError) {
    }
  };

  return (
    <div className="w-full">
      <div className="w-full max-w-md p-6 shadow-md rounded-lg text-center m-auto">
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          {/* Job Title Field */}
          <CustomInputField
            id="title"
            type="text"
            placeholder="Job Title"
            register={register("title", {
              required: "Job title is required",
            })}
            error={errors.title}
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
          />

          {/* Job Description Field */}
          <CustomTextArea
            id="jobDescription"
            placeholder="Job Description"
            onFocus={handleFocus}
            onBlur={handleBlur}
            register={register("description", {
              required: "Job description is required",
            })}
            error={errors.description}
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
          />

          {/* Contact Email Field */}
          <CustomInputField
            id="contactEmail"
            type="email"
            placeholder="Contact Email"
            register={register("contactEmail", {
              required: "Contact email is required",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Invalid email format",
              },
            })}
            error={errors.contactEmail}
          />

          <button
            type="submit"
            className="bg-[#002A47] w-full py-2 text-white rounded-md hover:bg-[#112737] dark:bg-[#071218] hover:dark:bg-[#0c1920] transition duration-300"
          >
            {isLoading ? <p>Loading</p> : <p>Add Job</p>}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddJob;
