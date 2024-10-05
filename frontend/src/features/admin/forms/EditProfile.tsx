import { SubmitHandler, useForm } from "react-hook-form";
import {
  RegisterUserFormType,
  ErrorResponseType,
} from "../../../_types/form_types";
import CustomDropdownField from "../../../component/CustomDropDown";
import CustomInputField from "../../../component/CustomInputField";
import { useToast } from "../../../context/ToastContext";
import { useUpdateUserProfileMutation } from "../../../services/user_service";
import { UserListType } from "../../../_types/user_table";

interface EditProfileProps {
  handleClose: () => void;
  selectedRowData: UserListType | null;
}

const EditProfile: React.FC<EditProfileProps> = ({
  handleClose,
  selectedRowData,
}) => {
  const { setToastData } = useToast();
  const [updateProfileUser, { isLoading }] = useUpdateUserProfileMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterUserFormType>({
    defaultValues: {
      firstName: selectedRowData?.firstName || "",
      lastName: selectedRowData?.lastName || "",
      role: selectedRowData?.role,
    },
  });
  const onSubmit: SubmitHandler<RegisterUserFormType> = async (body) => {
    try {
      if (!selectedRowData?._id) {
        setToastData({
          message: "User ID is missing",
          success: false,
        });
        return;
      }
      const response = await updateProfileUser({
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
    <div className="w-full">
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
          <CustomInputField
            id="firstName"
            type="text"
            placeholder="First Name"
            register={register("firstName", {
              required: "First name is required",
              pattern: {
                value: /^[A-Za-z]+$/,
                message: "Only alphabetic characters are allowed",
              },
            })}
            error={errors.firstName}
            iconPath="M12 12q-1.65 0-2.825-1.175T8 8t1.175-2.825T12 4t2.825 1.175T16 8t-1.175 2.825T12 12m-8 8v-2.8q0-.85.438-1.562T5.6 14.55q1.55-.775 3.15-1.162T12 13t3.25.388t3.15 1.162q.725.375 1.163 1.088T20 17.2V20z"
          />
          <CustomInputField
            id="lastName"
            type="text"
            placeholder="Last Name"
            register={register("lastName", {
              required: "Last name is required",
              pattern: {
                value: /^[A-Za-z]+$/,
                message: "Only alphabetic characters are allowed",
              },
            })}
            error={errors.lastName}
            iconPath="M12 12q-1.65 0-2.825-1.175T8 8t1.175-2.825T12 4t2.825 1.175T16 8t-1.175 2.825T12 12m-8 8v-2.8q0-.85.438-1.562T5.6 14.55q1.55-.775 3.15-1.162T12 13t3.25.388t3.15 1.162q.725.375 1.163 1.088T20 17.2V20z"
          />
          <CustomDropdownField
            id="role"
            options={[
              { value: "admin", label: "ADMIN" },
              { value: "super_admin", label: "SUPER_ADMIN" },
            ]}
            placeholder="Select an option"
            register={register("role", {
              required: "This field is required",
            })}
            error={errors.role}
            iconPath="M12 2L3.5 6.5v5.8c0 4.7 3.2 9.3 8.5 10.7 5.3-1.4 8.5-6 8.5-10.7V6.5L12 2z"
          />
          <button
            type="submit"
            className="bg-[#002A47] w-full py-2 text-white rounded-md hover:bg-[#112737] dark:bg-[#071218] hover:dark:bg-[#0c1920] transition duration-300"
          >
            {isLoading ? <p>Loading</p> : <p>Update Profile</p>}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
