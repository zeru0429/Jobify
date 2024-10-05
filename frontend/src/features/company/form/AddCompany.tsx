import { useForm, SubmitHandler } from "react-hook-form";
import {
  ErrorResponseType,
  RegisterCompanyFormType,
} from "../../../_types/form_types";
import CustomInputField from "../../../component/ui/CustomInputField";
import { useAuth } from "../../../context/AuthContext";
import { useToast } from "../../../context/ToastContext";
import { useCreateCompanyMutation } from "../../../services/company_service";
import CustomFileInputField from "../../../component/ui/CustomeFileInput";

interface AddCompanyProps {
  handleClose: () => void;
}

const AddCompany: React.FC<AddCompanyProps> = ({ handleClose }) => {
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
      // Create a FormData object for file uploads
      const formData = new FormData();
      formData.append("admin", userData?.id.toString() || "");
      formData.append("name", data.name);

      // Append logo if present
      if (data.logo && data.logo) {
        formData.append("logo", data.logo);
      }

      await createCompany(formData).unwrap();

      setToastData({
        message: "Company created successfully",
        success: true,
      });
      handleClose();
    } catch (error: any) {
      const res: ErrorResponseType = error;
      setToastData({
        message: res.data.message.toString(),
        success: false,
      });
    }
  };

  return (
    <div className="w-full">
      {/* Close icon to close the modal */}
      <div
        className="absolute top-1 left-0 right-0 m-2 p-2 cursor-pointer text-red-800"
        onClick={handleClose}
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M6 18L18 6M6 6l12 12"
          ></path>
        </svg>
      </div>
      <br />
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
          <CustomFileInputField
            id="logo"
            placeholder="Company Logo URL"
            isSingle={true}
            register={register("logo", {
              required: "Logo is required",
              validate: {
                validUrl: (value: File | null | undefined) => {
                  // Check if value is empty (no file uploaded)
                  if (!value || value === null || value === undefined) {
                    return "Logo is required";
                  }
                  const validImageTypes = [
                    "image/jpeg",
                    "image/png",
                    "image/gif",
                    "image/webp",
                  ];
                  const file: any = value;
                  if (file) {
                    const data: File = file[0];
                    if (!validImageTypes.includes(data.type)) {
                      return "Please upload a valid image (JPEG, PNG, GIF, WEBP)";
                    }
                  }

                  return true;
                },
              },
            })}
            error={errors.logo}
          />

          <button
            type="submit"
            className="bg-[#002A47] w-full py-2 text-white rounded-md hover:bg-[#112737] dark:bg-[#071218] hover:dark:bg-[#0c1920] transition duration-300"
          >
            {isLoading ? <p>Loading...</p> : <p>Add Company</p>}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCompany;
