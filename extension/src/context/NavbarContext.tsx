import React, { ReactNode, createContext, useContext, useState } from "react";

interface ChildrenProps {
  children: ReactNode;
}

interface NavbarContext {
  isMinimized: boolean;
  setIsMinimized: React.Dispatch<React.SetStateAction<boolean>>;
  isChat: boolean;
  setIsChat: React.Dispatch<React.SetStateAction<boolean>>;
}

const Navbar = createContext<NavbarContext>({
  isMinimized: false,
  setIsMinimized: () => {},
  isChat: true,
  setIsChat: () => {},
});

export const NavbarProvider: React.FC<ChildrenProps> = ({ children }) => {
  const [isMinimized, setIsMinimized] = useState(() => {
    const storedValue = localStorage.getItem("extension-minimized");
    return storedValue ? JSON.parse(storedValue) : false;
  });

  const [isChat, setIsChat] = useState(true);

  return (
    <Navbar.Provider value={{ isMinimized, setIsMinimized, isChat, setIsChat }}>
      {children}
    </Navbar.Provider>
  );
};

export const useNavbar = () => useContext(Navbar);
