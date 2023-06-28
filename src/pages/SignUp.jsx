import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useEffect, useState } from "react";
import { auth, db } from "../firebase/firebaseConfig";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
} from "firebase/auth";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

const schema = yup.object().shape({
  email: yup.string().email().required("Vui lòng nhập email"),
  password: yup.string().required("Vui lòng nhập mật khẩu"),
  username: yup.string().required("Vui lòng nhập tên đăng nhập"),
});
const SignUp = () => {
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = async (data) => {
    // handle confirm password
    if (data.password !== data.rpassword) {
      setError("Mật khẩu không khớp");
      return;
    }
    setError(null);

    // handle signup with firebase
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      const user = userCredential.user;
      setUser(user);

      // add user to firestore
      await addDoc(collection(db, "users"), {
        email: user.email,
        username: data.username,
        avatar: "",
        createdAt: serverTimestamp(),
      });

      // update profile
      await updateProfile(user, {
        displayName: data.username,
      });
      // reset form
      reset({
        email: "",
        password: "",
        rpassword: "",
        username: "",
      });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, [user]);

  return (
    <div className="max-w-[600px] w-full bg-white shadow-md rounded-lg mx-auto mt-20 p-3">
      {user && (
        <p className="text-green-500">{user?.displayName} Đăng ký thành công</p>
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-2 mb-2">
          <label className="text-slate-500">Username</label>
          <input
            type="text"
            placeholder="Enter your email"
            className="w-full border border-slate-200 rounded-lg py-3 px-5 outline-none  bg-transparent focus:border-slate-500"
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
            className="w-full border border-slate-200 rounded-lg py-3 px-5 outline-none  bg-transparent focus:border-slate-500"
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
            className="w-full border border-slate-200 rounded-lg py-3 px-5 outline-none  bg-transparent focus:border-slate-500"
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
            className="w-full border border-slate-200 rounded-lg py-3 px-5 outline-none  bg-transparent focus:border-slate-500"
            name="rpassword"
            {...register("rpassword")}
          />
          {error && <p className="text-red-500">{error}</p>}
        </div>
        <button className="inline-flex items-center justify-center px-8 py-4 font-sans font-semibold tracking-wide text-white bg-blue-500 rounded-lg w-full">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUp;
