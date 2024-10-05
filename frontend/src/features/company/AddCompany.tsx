import { useForm, SubmitHandler } from "react-hook-form";
import {
  ErrorResponseType,
  RegisterCompanyFormType,
} from "../../_types/form_types";
import CustomInputField from "../../component/ui/CustomInputField";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../context/ToastContext";
import { useCreateCompanyMutation } from "../../services/company_service";

const AddCompany = () => {
  const { setToastData } = useToast();
  const { userData } = useAuth();
  const [createCompany, { isLoading }] = useCreateCompanyMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterCompanyFormType>();

  const onSubmit: SubmitHandler<RegisterCompanyFormType> = async (data) => {
    try {
      data.adminId = userData?.id;
      console.log(data);
      const response = await createCompany(data).unwrap();
      console.log(response);
      setToastData({
        message: "Company created successfully",
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
          {/* Company Name Field */}
          <CustomInputField
            id="name"
            type="text"
            placeholder="Company Name"
            register={register("name", {
              required: "Company name is required",
            })}
            error={errors.name}
          />

          {/* Company Logo Field */}
          <CustomInputField
            id="logo"
            type="url"
            placeholder="Company Logo URL"
            register={register("logo", {
              required: false, // Make it optional depending on your requirements
              pattern: {
                value: /^(http|https):\/\/[^ "]+$/,
                message: "Invalid URL format",
              },
            })}
            error={errors.logo}
          />

          <button
            type="submit"
            className="bg-[#002A47] w-full py-2 text-white rounded-md hover:bg-[#112737] dark:bg-[#071218] hover:dark:bg-[#0c1920] transition duration-300"
          >
            {isLoading ? <p>Loading</p> : <p>Add Company</p>}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCompany;
