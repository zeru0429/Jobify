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
import CustomButton from "../../../component/ui/CustomButton";
import CustomTextArea from "../../../component/ui/CustomeTextArea";

interface AddCompanyProps {
  handleClose: () => void;
}

const AddCompany: React.FC<AddCompanyProps> = ({ handleClose }) => {
  const { setToastData } = useToast();
  useAuth();
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
      formData.append("name", data.name);
      formData.append("type", data.type);
      formData.append("companyType", data.companyType);
      formData.append("address", data.address);
      formData.append("description", data.description || "");

      // Append logo if present
      if (data.logo && data.logo[0]) {
        formData.append("file", data.logo[0]);
      }
      console.log(data.logo);

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
  /*
    const onSubmit: SubmitHandler<RegisterCompanyFormType> = async (data) => {
    try {
      const formData = new FormData();
      formData.append("admin", userData?.id.toString() || "");
      formData.append("name", data.name);
      formData.append("type", data.type);
      formData.append("companyType", data.companyType);
      formData.append("address", data.address);
      formData.append("description", data.description || "");

      // Handle file upload
      if (data.logo && data.logo[0]) {
        formData.append("file", data.logo[0]);
      }

      await createCompany(formData).unwrap();
      setToastData({ message: "Company created successfully", success: true });
      handleClose();
    } catch (error: any) {
      const res: ErrorResponseType = error;
      setToastData({ message: res.data.message.toString(), success: false });
    }
  };
   */

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

          {/* Company Type Field */}
          <CustomInputField
            id="companyType"
            type="text"
            placeholder="Company Type"
            register={register("companyType", {
              required: "Company type is required",
            })}
            error={errors.companyType}
          />
          <CustomInputField
            id="sector"
            type="text"
            placeholder="Company Sector"
            register={register("type", {
              required: "Company Sector is required",
            })}
            error={errors.type}
          />

          {/* Company Logo Field */}
          <CustomFileInputField
            id="logo"
            placeholder="Company Logo"
            isSingle={true}
            register={register("logo", {
              required: "Logo is required",
              validate: {
                validImage: (value: File[] | null | undefined) => {
                  if (!value) {
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
            error={Array.isArray(errors.logo) ? errors.logo[0] : errors.logo}
          />

          {/* Company Address Field */}
          <CustomInputField
            id="address"
            type="text"
            placeholder="Company Address"
            register={register("address", {
              required: "Address is required",
            })}
            error={errors.address}
          />

          {/* Job Description Field */}
          <CustomTextArea
            id="description"
            placeholder="Company Description"
            register={register("description")}
            error={errors.description}
            iconPath="M3 3h18v2H3V3zm0 4h18v2H3V7zm0 4h18v2H3v-2zm0 4h10v2H3v-2zm0 4h18v2H3v-2z"
          />

          <CustomButton
            type="submit"
            isLoading={isLoading}
            onClick={() => console.log("Button Clicked")}
          >
            Add Company
          </CustomButton>
        </form>
      </div>
    </div>
  );
};

export default AddCompany;
