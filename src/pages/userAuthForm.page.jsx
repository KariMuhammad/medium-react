import googleIcon from "../imgs/google.png";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import InputBox from "../components/input.component";
import AnimationWrapper from "../common/page-animation";
import { loginSchema, signupSchema } from "../validations";

import useAuthAction from "../hooks/use-auth-action";
import { toast } from "react-hot-toast";
import { useEffect } from "react";
import { handleAuthGoogle } from "../common/firebase";

const UserAuthForm = ({ type }) => {
  const navigate = useNavigate();

  const { data, loading, errors: authErrors, post } = useAuthAction();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(type === "sign-up" ? signupSchema : loginSchema),
  });

  const onSubmit = (data) => post(`/${type}`, data);

  const signWithGoogle = async () => {
    try {
      const { accessToken } = await handleAuthGoogle();
      // Get User Credentials from Google
      console.log("[Google]", accessToken);
      // Send Credentials to Server to Verify
      await post("/google-auth", { access_token: accessToken });
    } catch (error) {
      console.error("Google Auth Error", error);
    }
  };

  useEffect(() => {
    if (authErrors) {
      toast.dismiss();
      toast.error(authErrors?.message);
    }
  }, [authErrors?.message]);

  useEffect(() => {
    toast.dismiss();

    if (type === "sign-up" && data) {
      toast.success("Account created successfully");
      navigate("/auth/sign-in");
    }

    if (type === "sign-in" && data) {
      toast.success("Welcome back");
      navigate("/");
    }
  }, [data]);

  return (
    <AnimationWrapper keyDiff={type}>
      <section className="h-cover flex items-center justify-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-[80%] max-w-[400px]"
        >
          <h1 className="text-4xl font-gelasio text-center mb-4">
            {type === "sign-up" ? "Join us Today" : "Welcome back"}
          </h1>

          {type === "sign-up" && (
            <InputBox
              type="text"
              {...register("fullname")}
              value=""
              placeholder="Full Name"
              id="fullname"
              icon="user"
              errorMessage={errors.fullname?.message ?? ""}
            />
          )}

          <InputBox
            type="email"
            {...register("email")}
            value=""
            placeholder="email@example.com"
            id="email"
            icon="envelope"
            errorMessage={errors.email?.message ?? ""}
          />

          <InputBox
            type="password"
            {...register("password")}
            value=""
            placeholder="*******"
            id="password"
            icon="key"
            errorMessage={errors.password?.message ?? ""}
          />

          <button className="btn-dark center my-10">
            {loading ? "Loading..." : type.replace("-", " ")}
          </button>

          <div className="relative w-full flex items-center gap-4 font-bold text-black my-10 opacity-10 uppercase">
            <hr className="w-1/2 border-black"></hr>
            <p>or</p>
            <hr className="w-1/2 border-black"></hr>
          </div>

          <button
            onClick={signWithGoogle}
            className="btn-dark flex items-center center justify-center gap-2 w-[90%] text-center"
          >
            <img src={googleIcon} className="w-7 h-7" />
            Continue with Google
          </button>

          {type === "sign-up" ? (
            <p className="text-dark=grey text-center text-xl mt-5">
              Already a member?{" "}
              <Link to="/auth/sign-in" className="text-black underline text-xl">
                Sign in
              </Link>
            </p>
          ) : (
            <p className="text-dark=grey text-center text-xl mt-5">
              Join us now{" "}
              <Link to="/auth/sign-up" className="text-black underline text-xl">
                Sign up
              </Link>
            </p>
          )}
        </form>
      </section>
    </AnimationWrapper>
  );
};

export default UserAuthForm;
