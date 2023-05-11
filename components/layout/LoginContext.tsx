import { User } from "@/values/types";
import { useMemo, useState, createContext, Dispatch, SetStateAction, useEffect } from "react";

export const UserContext = createContext<{
  user: User | null;
  setUser: React.Dispatch<SetStateAction<User | null>>;
}>({
  user: null,
  setUser: () => {},
});

export default function UserProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);

  const userProviderValue = useMemo(() => ({ user, setUser }), [user, setUser]);

  useEffect(()=>{
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      setUser(foundUser);
    }
  },[])

  useEffect(()=>{
    if(user) {
      localStorage.setItem('user', JSON.stringify(user))
    }
    else {
      localStorage.clear();
    }
  },[user])

  return (
    <>
      <UserContext.Provider value={userProviderValue}>
        {children}
      </UserContext.Provider>
    </>
  );
}
