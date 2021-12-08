import { createContext, useState, useEffect } from "react";

const AuthContext = createContext({ token: "", user: {} });

function AuthContextComponent(props) {
  const [loggedInUser, setLoggedInUser] = useState({ token: "", user: {} });

  useEffect(() => {
    const json = localStorage.getItem("loggedInUser");
    const storedUser = JSON.parse(json || '""');

    if (storedUser) {
      setLoggedInUser({ ...storedUser });
    }
  }, []);

  function logout() {
    setLoggedInUser({ token: "", user: {} });
    localStorage.removeItem("loggedInUser");
    
  }

  return (
    <AuthContext.Provider value={{ loggedInUser, setLoggedInUser, logout }}>
      {props.children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthContextComponent };
