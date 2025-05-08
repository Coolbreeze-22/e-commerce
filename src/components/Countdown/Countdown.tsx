import React, { useState } from "react";
import "./Countdown.css";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../states/redux/store";
import {
  createCountdown,
  deleteCountdown,
} from "../../controller/countdownController";
import { CountdownType } from "../../states/redux/reducerTypes";
import { MdDeleteOutline } from "react-icons/md";
import { initialState } from "../../constants/countdown";

const Countdown = () => {
  const { user } = useSelector((state: RootState) => state.userReducer);
  const allCountdown = useSelector(
    (state: RootState) => state.countdownReducer.countdowns
  );

  const [formData, setFormData] = useState<CountdownType>(initialState);
  const [warning, setWarning] = useState<string>("");
  console.log("check", allCountdown);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleCountdown = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!setFormData.name) {
      setWarning("select name");
    } else if (!formData.startDate) {
      setWarning("select start date");
    } else if (!formData.endDate) {
      setWarning("select end date");
    } else {
      createCountdown({ countdown: formData, isAdmin: user.isAdmin, dispatch });
      setFormData(initialState);
      setWarning("");
    }
  };
  const handleDeleteCountdown = (id: string) => {
    deleteCountdown(id, dispatch), setFormData(initialState);
  };

  return (
    <Navbar>
      <main className="count-container">
        <div className="count-routes">
          <aside className="count-route1" onClick={() => navigate("/")}>
            Home
          </aside>
          <aside className="count-route-slash">/</aside>
          <aside className="count-route2">countdown</aside>
        </div>
        <section className="count-body">
          <div className="count-info">
            <aside className="count-red"></aside>
            <span className="count-header">Countdown</span>
          </div>

          <div className="count-content">
            <form className="count-form" onSubmit={handleCountdown}>
              <div>
                <label>Countdown Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Countdown Name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, name: e.target.value }))
                  }
                />
              </div>
              <time>
                <label>Start Date</label>
                <input
                  type="datetime-local"
                  name="startDate"
                  placeholder="Start Date"
                  value={formData.startDate}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      startDate: e.target.value,
                    }))
                  }
                />
              </time>
              <time>
                <label>End Date</label>
                <input
                  type="datetime-local"
                  name="endDate"
                  placeholder="End Date"
                  value={formData.endDate}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      endDate: e.target.value,
                    }))
                  }
                />
              </time>
              <div className="count-btn-wrapper">
                <p style={{ color: "#db4444", fontSize: "italic" }}>
                  {warning}
                </p>
                <button type="submit">Create</button>
              </div>
            </form>

            <div className="count-all-counts-wrapper">
              {allCountdown.map((countdown, index) => (
                <div key={index} className="count-all-counts">
                  <span className="count-delete">
                    <MdDeleteOutline
                      size={25}
                      style={{color:"#db4444"}}
                      onClick={() => handleDeleteCountdown(countdown.id)}
                    />
                  </span>
                  <time>
                    <p>Name:</p>
                    <p>{countdown.name}</p>
                  </time>
                  <time>
                    <p>Start:</p>
                    <p>{countdown.startDate}</p>
                  </time>
                  <aside>
                    <p>End:</p>
                    <p>{countdown.endDate}</p>
                  </aside>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </Navbar>
  );
};

export default Countdown;
