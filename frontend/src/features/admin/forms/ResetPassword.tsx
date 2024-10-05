import { SubmitHandler, useForm } from "react-hook-form";
import {
  RegisterUserFormType,
  ErrorResponseType,
} from "../../../_types/form_types";
import CustomPasswordInput from "../../../component/ui/CustomPasswordInput";
import { useToast } from "../../../context/ToastContext";
import { UserListType } from "../../../_types/user_table";
import { useResetUserPasswordMutation } from "../../../services/user_service";
import CustomButton from "../../../component/ui/CustomButton";

interface ResetPasswordProps {
  handleClose: () => void;
  selectedRowData: UserListType | null;
}
const ResetPassword: React.FC<ResetPasswordProps> = ({
  handleClose,
  selectedRowData,
}) => {
  const { setToastData } = useToast();
  const [resetPassword, { isLoading }] = useResetUserPasswordMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterUserFormType>({});

  const onSubmit: SubmitHandler<RegisterUserFormType> = async (body) => {
    try {
      if (!selectedRowData?._id) {
        setToastData({
          message: "User ID is missing",
          success: false,
        });
        return;
      }
      const response = await resetPassword({
        body,
        params: selectedRowData?._id,
      }).unwrap();
      console.log(response);
      setToastData({
        message: "User created successfully",
        success: true,
      });
      handleClose();
    } catch (error: any) {
      const res: ErrorResponseType = error;
      setToastData({
        message: res.data.message,
        success: false,
      });
    }
  };
  return (
    <>
      <div className=" w-full ">
        {/* close icon to close the modal */}
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
            {/* Password Field */}
            <CustomPasswordInput
              register={register}
              errors={errors}
              id="password"
              placeholder="Password"
            />
            {/* confirm password  Field */}
            <CustomPasswordInput
              register={register}
              errors={errors}
              id="confirmPassword"
              placeholder="Confirm Password"
            />
            <CustomButton
              type="submit"
              isLoading={isLoading}
              onClick={() => console.log("Button Clicked")}
            >
              Reset User password
            </CustomButton>
          </form>
        </div>
      </div>
    </>
  );
};
export default ResetPassword;
