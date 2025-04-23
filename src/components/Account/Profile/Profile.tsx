import React from "react";
import "./Profile.css";
import { useSelector } from "react-redux";
import { RootState } from "../../../states/redux/store";

const Profile = ({ children }: { children: React.ReactNode }) => {
  const { user } = useSelector((state: RootState) => state.userReducer);
  return (
    <main className="prof-container">
      <div>
        <p>Name:</p>
        <p>
          {user.firstName} {user.lastName}
        </p>
      </div>
      <div>
        <p>Email:</p>
        <p>{user.email}</p>
      </div>
      <div>
        <p>Phone Number:</p>
        <p>{user.phoneNumber}</p>
      </div>
      <div>
        <p>Apartment:</p>
        <p>{user.apartment}</p>
      </div>
      <div>
        <p>Home Address:</p>
        <p>{user.address}</p>
      </div>
      <div>
        <p>City:</p>
        <p>{user.city}</p>
      </div>
      <div>
        <p>Apartment:</p>
        <p>{user.apartment}</p>
      </div>
      <div>
        <p>User Id:</p>
        <p>{user.id}</p>
      </div>
      <aside className="pro-child">{children}</aside>
    </main>
  );
};

export default Profile;
