import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { auth, googleProvider } from "../firebase/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import { signInWithPopup } from "firebase/auth";
const schema = yup.object().shape({
  email: yup.string().email().required("Vui lòng nhập email"),
  password: yup.string().required("Vui lòng nhập mật khẩu"),
});
const SignIn = () => {
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    formState: { isValid, errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const { user } = useAuth();
  useEffect(() => {
    if (user?.email) navigate("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);
  const handleSignIn = async (data) => {
    if (!isValid) return;
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  const handleSignInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="max-w-[600px] w-full bg-white shadow-md rounded-lg mx-auto mt-20 p-3">
      <h2 className="text-2xl font-medium text-center">Sign In</h2>
      <button
        onClick={handleSignInWithGoogle}
        className="inline-flex items-center justify-center w-full gap-2 px-8 py-4 mt-2 font-sans font-semibold tracking-wide text-white bg-green-500 rounded-lg"
      >
        <span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
        </span>
        <span>Google</span>
      </button>
      <form onSubmit={handleSubmit(handleSignIn)}>
        <div className="flex flex-col gap-2 mb-2">
          <label className="text-slate-500">Email Address</label>
          <input
            type="text"
            placeholder="Enter your email"
            className="w-full px-5 py-3 bg-transparent border rounded-lg outline-none border-slate-200 focus:border-slate-500"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}
        </div>
        <div className="flex flex-col gap-2 mb-2">
          <label className="text-slate-500">Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            className="w-full px-5 py-3 bg-transparent border rounded-lg outline-none border-slate-200 focus:border-slate-500"
            {...register("password")}
          />
          {errors.password && (
            <p className="text-red-500">{errors.password.message}</p>
          )}
        </div>

        <button className="inline-flex items-center justify-center w-full px-8 py-4 font-sans font-semibold tracking-wide text-white bg-blue-500 rounded-lg">
          Sign In
        </button>
      </form>
    </div>
  );
};

export default SignIn;
