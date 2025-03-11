import React, { createContext, useContext } from "react";

const userLogin = createContext<any>(null);

export const LoginUser = ({ children }: { children: any }) => {
  const [user, setUser] = React.useState<{
    username: string;
    password: string;
  }>();

  return (
    <userLogin.Provider value={{ user, setUser }}>
      {children}
    </userLogin.Provider>
  );
};

export const useLogin = () => useContext(userLogin);
