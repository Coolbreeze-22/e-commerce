
import "./Users.css";
import Navbar from "../Navbar/Navbar";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../states/redux/store";
import { GoKebabHorizontal } from "react-icons/go";
import { MdAdminPanelSettings } from "react-icons/md";
import { useState } from "react";
import { UserProps } from "../../states/redux/reducerTypes";
import { ClickAwayListener } from "@mui/material";
import { useGetUsers } from "../../controller/userController";
import { initialState } from "../../constants/user";

const Users = () => {
  interface Hover {
    title: string;
    index: number;
  }
  const { users, user } = useSelector((state: RootState) => state.userReducer);
  const dispatch = useDispatch();
  useGetUsers({ id: user.id, dispatch, length: users.length });

  const [modal, setModal] = useState<UserProps>(initialState);
  const [hover, setHover] = useState<Hover>({
    title: "",
    index: -1,
  });
  const navigate = useNavigate();

  const handleClickAway = () => {
    setModal(initialState);
  };

  return (
    <Navbar>
      <main className="users-container">
        <div className="users-routes">
          <aside className="users-route1" onClick={() => navigate("/")}>
            Home
          </aside>
          <aside className="users-route-slash">/</aside>
          <aside className="users-route1" onClick={() => navigate(-1)}>
            admin
          </aside>
          <aside className="users-route-slash">/</aside>
          <aside className="users-route2">users</aside>
        </div>

        <div className="users-body">
          <div className="users-info">
            <aside className="users-red"></aside>
            <span className="users-header">Users</span>
          </div>

          <section className="users-content-wrapper">
            {users.map((user, index) => (
              <div key={index} className="users-content">
                <div>
                  {hover.index === index && <span>{hover.title}</span>}
                  {user.isOwner && (
                    <MdAdminPanelSettings
                      size={25}
                      className="users-owner-icon"
                      onMouseOver={() => {
                        setHover({ title: "owner", index });
                      }}
                      onMouseOut={() => {
                        setHover({ title: "", index: -1 });
                      }}
                    />
                  )}
                  {user.isAdmin && (
                    <MdAdminPanelSettings
                      size={25}
                      className="users-admin-icon"
                      onMouseOver={() => {
                        setHover({ title: "admin", index });
                      }}
                      onMouseOut={() => {
                        setHover({ title: "", index: -1 });
                      }}
                    />
                  )}
                  {user.firstName + " " + user.lastName}
                </div>
                <div>{user.email}</div>
                <GoKebabHorizontal size={25} onClick={() => setModal(user)} />
              </div>
            ))}
          </section>

          {modal.id && (
            <ClickAwayListener onClickAway={handleClickAway}>
              <section className="user-modal-wrapper">
                <div className="user-modal">
                  <div>
                    <p>User ID:</p>
                    <p>{modal.id}</p>
                  </div>
                  <div>
                    <p>First Name:</p>
                    <p>{modal.firstName}</p>
                  </div>
                  <div>
                    <p>Last Name:</p>
                    <p>{modal.lastName}</p>
                  </div>
                  <div>
                    <p>Email:</p>
                    <p>{modal.email}</p>
                  </div>
                  <div>
                    <p>Email Verified:</p>
                    <p>{modal.emailVerified.toString()}</p>
                  </div>
                  <div>
                    <p>Phone Number:</p>
                    <p>{modal.phoneNumber}</p>
                  </div>
                  <div>
                    <p>City:</p>
                    <p>{modal.city}</p>
                  </div>
                  <div>
                    <p>Address:</p>
                    <p>{modal.address}</p>
                  </div>
                  <div>
                    <p>Apartment:</p>
                    <p>{modal.apartment}</p>
                  </div>
                  <div>
                    <p>Company Name:</p>
                    <p>{modal.companyName}</p>
                  </div>
                  <div>
                    <p>Photo:</p>
                    <p>{modal.photoUrl}</p>
                  </div>
                  <div>
                    <p>Admin:</p>
                    <p>{modal.isAdmin.toString()}</p>
                  </div>
                  <div>
                    <p>Owner:</p>
                    <p>{modal.isOwner.toString()}</p>
                  </div>
                  <div>
                    <p>Signed In:</p>
                    <p>{modal.isSignedIn.toString()}</p>
                  </div>
                  <div>
                    <p>Last Login:</p>
                    <p>{new Date(Number(modal.lastLoginAt)).toISOString()}</p>
                  </div>
                  <div>
                    <p>Last Logout:</p>
                    <p>{new Date(Number(modal.lastLogoutAt)).toISOString()}</p>
                  </div>
                  <div>
                    <p>Created On:</p>
                    <p>{new Date(Number(modal.createdAt)).toISOString()}</p>
                  </div>
                  <div>
                    <p>Updated On:</p>
                    <p>{new Date(Number(modal.updatedAt)).toISOString()}</p>
                  </div>
                </div>
              </section>
            </ClickAwayListener>
          )}
        </div>
      </main>
    </Navbar>
  );
};

export default Users;
