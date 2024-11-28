import { SubmitHandler, useForm } from "react-hook-form";
import { useToast } from "../../../context/ToastContext";
import {
  ApplicationFormType,
  ErrorResponseType,
} from "../../../_types/form_types";
import { useUpdateApplicantStatusMutation } from "../../../services/applicants_service";
import { ApplicantListType } from "../ApplicantListTable";
import CustomButton from "../../../component/ui/CustomButton";
import CustomDropdownField from "../../../component/ui/CustomDropDown";

interface UpdateApplicationProps {
  handleClose: () => void;
  selectedRowData: ApplicantListType | null;
}

const UpdateApplication: React.FC<UpdateApplicationProps> = ({
  handleClose,
  selectedRowData,
}) => {
  const { setToastData } = useToast();
  const [updateApplication, { isLoading }] = useUpdateApplicantStatusMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ApplicationFormType>();

  const onSubmit: SubmitHandler<ApplicationFormType> = async (data) => {
    if (selectedRowData?._id) {
      try {
        const response = await updateApplication({
          body: data,
          params: selectedRowData?._id,
        }).unwrap();
        console.log(response);
        handleClose();
        setToastData({
          message: "Application status updated successfully",
          success: true,
        });
      } catch (error: any) {
        const res: ErrorResponseType = error;
        setToastData({
          message: res.data.message,
          success: res.data.success,
        });
      }
    } else {
      setToastData({
        message: "Applicant ID is missing",
        success: false,
      });
    }
  };

  return (
    <div className="w-full">
      <div className="w-full max-w-md p-6 shadow-md rounded-lg text-center m-auto">
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          {/* Applicant status */}
          <CustomDropdownField
            id="status"
            options={[
              { label: "Applied", value: "applied" },
              { label: "Interviewed", value: "interviewed" },
              { label: "Offered", value: "offered" },
              { label: "Rejected", value: "rejected" },
            ]}
            placeholder="Select an option"
            register={register("status", {
              required: "This field is required",
            })}
            error={errors.status}
            iconPath="M12 2L3.5 6.5v5.8c0 4.7 3.2 9.3 8.5 10.7 5.3-1.4 8.5-6 8.5-10.7V6.5L12 2z"
          />

          <CustomButton
            type="submit"
            isLoading={isLoading}
            onClick={() => console.log("Button Clicked")}
          >
            Update Status
          </CustomButton>
        </form>
      </div>
    </div>
  );
};
export default UpdateApplication;
