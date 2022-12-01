import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { user } = useSelector((store) => store.user);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("calling useeffect");
    if (!user) navigate("/landing");
  }, );
  console.log("protected route :", user);
  if (!user) {
    console.log("inside :", user);
    //navigate("/landing");
    return;
  }
  return children;
};

export default ProtectedRoute;
