import { useState } from "react";
import toast from "react-hot-toast";
import AnimationWrapper from "../common/page-animation";
import InputComponent from "../components/input.component";
import { changePassword } from "../validations";
import { changeUserPassword } from "../services/auth-endpoints";

import { useAuth } from "../context/auth-context";

const ChangePasswordPage = () => {
  const { syncUser } = useAuth();
  const [errors, setErrors] = useState(null);
  //   const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    toast.loading("Changing Password...");
    e.preventDefault();

    const formData = new FormData(e.target);
    const form = Object.fromEntries(formData.entries());

    changePassword
      .validate(form)
      .then(() => {
        changeUserPassword(form)
          .then((response) => {
            toast.dismiss();
            toast.success(response.data.message);
            console.log(response.data);
            syncUser({ token: response.data.token, user: response.data.user });
            setErrors(null);
          })
          .catch(({ response }) => {
            console.log(response);
            toast.dismiss();

            setErrors(response.data.errors.message);
          });
      })
      .catch((errors) => {
        console.log(errors);
        toast.dismiss();
        toast.error(errors.errors[0]);
      });
  };

  return (
    <AnimationWrapper>
      <h1 className="max-md:hidden text-xl"> Change Password </h1>

      <div className="w-fit my-4">
        {errors && (
          <ul className="p-4 text-red bg-red/10 list-disc list-inside">
            {Array.isArray(errors) &&
              errors.map((error, index) => (
                <li key={index}> {Object.values(error)[0]} </li>
              ))}

            {!Array.isArray(errors) && <li> {errors} </li>}
          </ul>
        )}
      </div>

      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4 md:max-w-[400px]">
          <InputComponent
            name="current-password"
            type="password"
            placeholder="Current Password"
            icon="lock"
          />
          <InputComponent
            name="new-password"
            type="password"
            placeholder="New Password"
            icon="lock"
          />

          <button className="btn-dark px-4 py-2">Change Password</button>
        </div>
      </form>
    </AnimationWrapper>
  );
};

export default ChangePasswordPage;
