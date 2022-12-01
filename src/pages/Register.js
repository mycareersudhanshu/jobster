import React, { useEffect, useState } from "react";
import Wrapper from "../assets/wrappers/RegisterPage";
import { Logo, FormRow } from "../components";
import { toast } from "react-toastify";
import { loginUser, registerUser } from "../features/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const initialState = {
  name: "",
  email: "",
  password: "",
  isMember: true,
};
const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isLoading } = useSelector((store) => store.user);
  const [values, setValues] = useState(initialState);
  const handleChange = (e) => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    setValues({ ...values, [name]: value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    const { name, password, email, isMember } = values;
    if (!email || !password || (!isMember && !name)) {
      toast.error("Please fill all values");
      return;
    }
    if (isMember) {
      dispatch(loginUser({ email: email, password: password }));
      return;
    }
    dispatch(registerUser({ name, email, password }));
  };

  const toggleMember = () => {
    setValues({ ...values, isMember: !values.isMember });
  };
  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate("/");
      }, 2000);
    }
  }, [user]);
  return (
    <Wrapper className="full-name">
      <form className="form" onSubmit={onSubmit}>
        <Logo />
        <h3>{values.isMember ? "Login" : "Register"}</h3>
        {/* {name field} */}

        {!values.isMember && (
          <FormRow
            name="name"
            type="text"
            values={values.name}
            handleChange={handleChange}
          />
        )}
        {/* {email field} */}
        <FormRow
          name="email"
          type="email"
          values={values.email}
          handleChange={handleChange}
        />
        {/* password field} */}
        <FormRow
          name="password"
          type="password"
          values={values.password}
          handleChange={handleChange}
        />
        <button className="btn btn-block" type="submit" disabled={isLoading}>
          {isLoading ? "Loading..." : "submit"}
        </button>
        {/* test user for stat */}

        <button
          type="button"
          className="btn btn-block btn-hipster"
          disabled={isLoading}
          onClick={() => {
            dispatch(
              loginUser({ email: "testUser@test.com", password: "secret" })
            );
          }}
        >
          {isLoading ? "loading..." : "demo"}
        </button>
        {/* test user for stat */}

        <p>
          {values.isMember ? "Not a member yet?" : "Already a member"}
          <button onClick={toggleMember} className="member-btn" type="button">
            {values.isMember ? "Register" : "Login"}
          </button>
        </p>
      </form>
    </Wrapper>
  );
};

export default Register;
