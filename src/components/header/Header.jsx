import { useAuth } from "../../context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/firebaseConfig";
import { useNavigate } from "react-router-dom";
const Header = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const handleSignOut = () => {
    signOut(auth);
    navigate("/signin");
  };

  return (
    <div className="flex items-center justify-between p-5 bg-primary shadow-md gap-x-5">
      <img
        className="w-[40px] h-[40px] rounded-full object-cover"
        src={user?.photoURL || "https://picsum.photos/200/300"}
        alt=""
      />
      {/* <span className="border border-white py-1 px-2 rounded-md bg-white text-black">
        Hello <strong>{user?.displayName}</strong>
      </span> */}

      {user && (
        <button
          onClick={handleSignOut}
          className="inline-flex items-center justify-center px-6 py-3 font-sans font-semibold tracking-wide text-black bg-white rounded-lg "
        >
          Sign Out
        </button>
      )}
    </div>
  );
};

export default Header;
