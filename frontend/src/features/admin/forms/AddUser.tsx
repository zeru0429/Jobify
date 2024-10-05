import { SubmitHandler, useForm } from "react-hook-form";
import {
  RegisterUserFormType,
  ErrorResponseType,
} from "../../../_types/form_types";
import CustomDropdownField from "../../../component/CustomDropDown";
import CustomInputField from "../../../component/CustomInputField";
import CustomPasswordInput from "../../../component/CustomPasswordInput";
import { useToast } from "../../../context/ToastContext";

interface AddUserProps {
  handleClose: () => void;
}
const AddUser: React.FC<AddUserProps> = ({ handleClose }) => {
  const { setToastData } = useToast();
  const { userData } = useAuth();
  const [createUser, { isLoading }] = useCreateUserMutation();

  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm<RegisterUserFormType>();

  const onSubmit: SubmitHandler<RegisterUserFormType> = async (data) => {
    try {
      data.createdBy = userData?.id;

      const response: ResponseType = await createUser(data).unwrap();
      console.log(response);
      setToastData({
        message: "user created successfully",
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
        <div className="w-full max-w-md p-6 shadow-md rounded-lg text-center m-auto">
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            {/* First Name Field */}
            <CustomInputField
              id="firstName"
              type="text"
              placeholder="First Name"
              register={register("firstName", {
                required: "First name is required",
                pattern: {
                  value: /^[A-Za-z]+$/, // Allow only alphabetic characters
                  message: "Only alphabetic characters are allowed",
                },
              })}
              error={errors.firstName}
              iconPath="M12 12q-1.65 0-2.825-1.175T8 8t1.175-2.825T12 4t2.825 1.175T16 8t-1.175 2.825T12 12m-8 8v-2.8q0-.85.438-1.562T5.6 14.55q1.55-.775 3.15-1.162T12 13t3.25.388t3.15 1.162q.725.375 1.163 1.088T20 17.2V20z"
            />

            {/* Last Name Field */}
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
            {/* Role */}
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
            {/* Email Field */}
            <CustomInputField
              id="email"
              type="email"
              placeholder="Email"
              register={register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Invalid email format",
                },
              })}
              error={errors.email}
              iconPath="M12 2C10.3 2 9 3.3 9 5V5.1L2.2 10.3C1.8 10.7 1.8 11.3 2.2 11.7L9 17.5C9.4 17.8 10 18 10.5 18H13.5C14 18 14.6 17.8 15 17.5L21.8 11.7C22.2 11.3 22.2 10.7 21.8 10.3L15 5.1V5C15 3.3 13.7 2 12 2ZM12 4C12.6 4 13 4.4 13 5V10.2L17.3 13L12 18L6.7 13L11 10.2V5C11 4.4 11.4 4 12 4Z"
            />

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
              id="confirm-password"
              placeholder="Confirm Password"
            />

            <button
              type="submit"
              className="bg-[#002A47]  w-full py-2 text-white rounded-md hover:bg-[#112737] dark:bg-[#071218] hover:dark:bg-[#0c1920]   transition duration-300"
            >
              {isLoading ? <p>Loading</p> : <p>Add User</p>}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
export default AddUser;
function useAuth(): { userData: any } {
  throw new Error("Function not implemented.");
}

function useCreateUserMutation(): [any, { isLoading: any }] {
  throw new Error("Function not implemented.");
}
