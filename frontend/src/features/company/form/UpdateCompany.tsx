import { useForm, SubmitHandler } from "react-hook-form";
import {
  ErrorResponseType,
  RegisterCompanyFormType,
} from "../../../_types/form_types";
import CustomInputField from "../../../component/ui/CustomInputField";
import { useToast } from "../../../context/ToastContext";
import { useUpdateCompanyProfileMutation } from "../../../services/company_service";
import CustomButton from "../../../component/ui/CustomButton";
import CustomTextArea from "../../../component/ui/CustomeTextArea";
import { CompanyListType } from "../CompanyListTable";

interface UpdateCompanyProps {
  handleClose: () => void;
  selectedRowData: CompanyListType | null;
}

const UpdateCompany: React.FC<UpdateCompanyProps> = ({
  handleClose,
  selectedRowData,
}) => {
  const { setToastData } = useToast();

  const [updateCompany, { isLoading }] = useUpdateCompanyProfileMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterCompanyFormType>({
    defaultValues: {
      address: selectedRowData?.address || "",
      companyType: selectedRowData?.companyType || "",
      description: selectedRowData?.description || "",
      name: selectedRowData?.name || "",
      type: selectedRowData?.type || "",
    },
  });

  const onSubmit: SubmitHandler<RegisterCompanyFormType> = async (data) => {
    if (selectedRowData) {
      try {
        console.log({
          body: data,
          params: selectedRowData._id,
        });
        await updateCompany({
          body: data,
          params: selectedRowData._id,
        }).unwrap();

        setToastData({
          message: "Company updated successfully",
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
            Update Company
          </CustomButton>
        </form>
      </div>
    </div>
  );
};

export default UpdateCompany;
