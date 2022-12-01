import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Wrapper from "../../assets/wrappers/DashboardFormPage";
import { FormRow } from "../../components";
import { updateUser } from "../../features/user/userSlice";

const Profile = () => {
  const { isLoading, user } = useSelector((store) => store.user);

  const dispatch = useDispatch();
  const [userData, setUserData] = useState({
    name: user?.name || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    location: user?.location || "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, lastName, location } = user;
    if ((!name, !email, !lastName, !location)) {
      toast.error("please fill all the fields");
    }
    dispatch(updateUser(userData));
  };

  const handleChange = (e) => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    setUserData({ ...userData, [name]: value });
  };
  return (
    <Wrapper>
      <form onSubmit={handleSubmit} className="form">
        <h3>Profile</h3>
        <div className="form-center">
          {/* {name field} */}
          <FormRow
            name="name"
            type="text"
            value={userData.name}
            labelText="name"
            handleChange={handleChange}
          />
          {/* {last name field} */}
          <FormRow
            name="lastName"
            type="text"
            value={userData.lastName}
            labelText="last name"
            handleChange={handleChange}
          />
          {/* {name email} */}
          <FormRow
            name="email"
            type="email"
            value={userData.email}
            labelText="email"
            handleChange={handleChange}
          />
          {/* {location field} */}
          <FormRow
            name="location"
            type="text"
            value={userData.location}
            labelText="location"
            handleChange={handleChange}
          />
          <button className="btn btn-block" type="submit" disabled={isLoading}>
            {isLoading ? "Please Wait..." : "save changes"}
          </button>
        </div>
      </form>
    </Wrapper>
  );
};

export default Profile;
