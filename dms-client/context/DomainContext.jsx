// src/context/DomainContext.js
import React, { createContext, useState, useContext } from "react";

// Create a context to store the domain name
const DomainContext = createContext();

// Provider component to pass domain throughout the app
export const DomainProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Store user info (email, password, etc.)
  const [domain, setDomain] = useState(""); // Store domain name here

  // Function to log in the user and set domain
  const loginUser = (email, password, domainName) => {
    setUser({ email, password });
    setDomain(domainName); // Set the domain name after login
  };

  // Function to log out the user and clear domain
  const logoutUser = () => {
    setUser(null); // Clear user info
    setDomain(""); // Clear domain on logout
  };

  return (
    <DomainContext.Provider value={{ user, loginUser, logoutUser, domain }}>
      {children}
    </DomainContext.Provider>
  );
};

// Custom hook to use domain context in any component
export const useDomain = () => {
  return useContext(DomainContext);
};
