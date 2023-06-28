import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../firebase/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { collection, onSnapshot, query, where } from "firebase/firestore";

const AuthContext = createContext();

function AuthProvider(props) {
  const [user, setUser] = useState(null);
  const value = { user, setUser };
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const docRef = query(
          collection(db, "users"),
          where("emai", "==", user.email)
        );
        onSnapshot(docRef, (querySnapshot) => {
          querySnapshot.forEach((doc) => {
            setUser({
              ...user,
              id: doc.id,
              ...doc.data(),
            });
          });
        });
      } else {
        setUser(null);
      }
    });
  }, []);
  return <AuthContext.Provider value={value} {...props} />;
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
}

export { AuthProvider, useAuth };
