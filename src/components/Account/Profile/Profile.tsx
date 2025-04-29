import React from "react";
import "./Profile.css";
import { useSelector } from "react-redux";
import { RootState } from "../../../states/redux/store";

const Profile = ({ children }: { children: React.ReactNode }) => {
  const { user } = useSelector((state: RootState) => state.userReducer);
  return (
    <main className="prof-container">
      <div>
        <p>
          {user.firstName} {user.lastName}
        </p>
      </div>
      <div>
        <p>{user.email}</p>
      </div>
      <div>
        <p>{user.phoneNumber}</p>
      </div>
      <div>
        <p>{user.apartment}</p>
      </div>
      <div>
        <p>{user.address}</p>
      </div>
      <div>
        <p>{user.city}</p>
      </div>
      <div>
        <p>{user.apartment}</p>
      </div>
      <div>
        <p>User Id: <span>{user.id}</span></p>
      </div>
      <aside className="pro-child">{children}</aside>
    </main>
  );
};

export default Profile;
