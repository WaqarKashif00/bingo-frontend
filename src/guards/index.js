import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Protect({ children }) {
  let navigate = useNavigate();
  const isAuthenticated = sessionStorage.getItem("x-bingo-token") ?? false;

  useEffect(() => {
    if (!isAuthenticated) navigate("/");

    return () => {};
  });

  return children;
}

export { Protect };
