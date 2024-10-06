import { useForm, SubmitHandler } from "react-hook-form";
import {
  ErrorResponseType,
  RegisterCompanyFormType,
} from "../../../_types/form_types";
import { useToast } from "../../../context/ToastContext";
import { useChangeCompanyLogoMutation } from "../../../services/company_service";
import CustomFileInputField from "../../../component/ui/CustomeFileInput";
import CustomButton from "../../../component/ui/CustomButton";
import { CompanyListType } from "../CompanyListTable";

interface ChangeCompanyLogoProps {
  handleClose: () => void;
  selectedRowData: CompanyListType | null;
}

const ChangeCompanyLogo: React.FC<ChangeCompanyLogoProps> = ({
  handleClose,
  selectedRowData,
}) => {
  const { setToastData } = useToast();
  const [changeCompanyLogo, { isLoading }] = useChangeCompanyLogoMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterCompanyFormType>();

  const onSubmit: SubmitHandler<RegisterCompanyFormType> = async (data) => {
    if (selectedRowData?._id) {
      try {
        // Create a FormData object for file uploads
        const formData = new FormData();
        // Append logo if present
        if (data.logo) {
          formData.append("file", data.logo);
        }

        await changeCompanyLogo({
          formData: formData,
          params: selectedRowData?._id,
        }).unwrap();

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
    } else {
      setToastData({
        message: "Company ID is missing",
        success: false,
      });
      handleClose();
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
          {/* Company Logo Field */}
          <CustomFileInputField
            id="logo"
            placeholder="Company Logo"
            isSingle={true}
            register={register("logo", {
              required: "Logo is required",
              validate: {
                validImage: (value: File | null | undefined) => {
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
            error={errors.logo}
          />

          <CustomButton
            type="submit"
            isLoading={isLoading}
            onClick={() => console.log("Button Clicked")}
          >
            Change Logo
          </CustomButton>
        </form>
      </div>
    </div>
  );
};

export default ChangeCompanyLogo;
