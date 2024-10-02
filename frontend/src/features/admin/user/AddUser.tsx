import { SubmitHandler, useForm } from "react-hook-form";
import {
  ErrorResponseType,
  RegisterUserFormType,
} from "../../../_types/form_types";
import { useAuth } from "../../../context/AuthContext";
import { useToast } from "../../../context/ToastContext";
import { useCreateUserMutation } from "../../../services/user_service";
import CustomInputField from "../../../component/CustomInputField";
import CustomPasswordInput from "../../../component/CustomPasswordInput";

const AddUser = () => {
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
      console.log(data);
      const response: ResponseType = await createUser(data).unwrap();
      console.log(response);
      setToastData({
        message: "login successful",
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
    <>
      <div className=" w-full ">
        <div className="w-full max-w-md p-6 shadow-md rounded-lg text-center m-auto">
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
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
              iconPath="M12 12q-1.65 0-2.825-1.175T8 8t1.175-2.825T12 4t2.825 1.175T16 8t-1.175 2.825T12 12m-8 8v-2.8q0-.85.438-1.562T5.6 14.55q1.55-.775 3.15-1.162T12 13t3.25.388t3.15 1.162q.725.375 1.163 1.088T20 17.2V20z"
            />
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
