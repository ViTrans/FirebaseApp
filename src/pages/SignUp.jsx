import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { auth, db } from "../firebase/firebaseConfig";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
const schema = yup.object().shape({
  email: yup.string().email().required("Vui lòng nhập email"),
  password: yup.string().required("Vui lòng nhập mật khẩu"),
  username: yup.string().required("Vui lòng nhập tên đăng nhập"),
  rpassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Mật khẩu không khớp"),
});
const SignUp = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const handleSignUp = async (data) => {
    if (!isValid) return;
    // handle signup with firebase
    try {
      await createUserWithEmailAndPassword(auth, data.email, data.password);

      // update profile
      await updateProfile(auth.currentUser, {
        displayName: data.username,
      });
      await setDoc(doc(db, "users", auth.currentUser.uid), {
        displayName: data.username,
        email: data.email,
        password: data.password,
        createdAt: serverTimestamp(),
      });
      // reset form
      reset({
        email: "",
        password: "",
        rpassword: "",
        username: "",
      });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-[600px] w-full bg-white shadow-md rounded-lg mx-auto mt-20 p-3">
      <h2 className="text-2xl font-medium text-center">Sign Up</h2>
      <form onSubmit={handleSubmit(handleSignUp)}>
        <div className="flex flex-col gap-2 mb-2">
          <label className="text-slate-500">Username</label>
          <input
            type="text"
            placeholder="Enter your email"
            className="w-full px-5 py-3 bg-transparent border rounded-lg outline-none border-slate-200 focus:border-slate-500"
            {...register("username")}
          />
          {errors.username && (
            <p className="text-red-500">{errors.username.message}</p>
          )}
        </div>
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
        <div className="flex flex-col gap-2 mb-2">
          <label className="text-slate-500">Confirm Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            className="w-full px-5 py-3 bg-transparent border rounded-lg outline-none border-slate-200 focus:border-slate-500"
            name="rpassword"
            {...register("rpassword")}
          />
          {errors.rpassword && (
            <p className="text-red-500">{errors.rpassword.message}</p>
          )}
        </div>
        <button className="inline-flex items-center justify-center w-full px-8 py-4 font-sans font-semibold tracking-wide text-white bg-blue-500 rounded-lg">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUp;
