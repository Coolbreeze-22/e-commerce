// import React from "react";
import Navbar from "../Navbar/Navbar";
import "./Contact.css";
import { IoCallOutline } from "react-icons/io5";
import { MdOutlineEmail } from "react-icons/md";
import { useState } from "react";
import CustomInput from "../CustomInput/CustomInput";
import CustomButton from "../CustomButton/CustomButton";
import { useNavigate } from "react-router-dom";

const Contact = () => {
  type FormType = {
    name: string;
    email: string;
    phone: string;
    message: string;
  };
  const initialState = {
    name: "",
    email: "",
    phone: "",
    message: "",
  };
  const [formData, setFormData] = useState<FormType>(initialState);
  const navigate = useNavigate();

  const handleSubmit = () => {};

  return (
    <Navbar>
      <main className="contact-container">
        <div className="contact-routes">
          <aside className="contact-route1" onClick={() => navigate("/")}>
            Home
          </aside>
          <aside className="contact-route-slash">/</aside>
          <aside className="contact-route2">contact</aside>
        </div>
        <div className="contact-body">
          <section className="contact-info">
            <div className="contact-reach-us">
              <aside className="contact-icon">
                <IoCallOutline className="contact-call-icon" />
              </aside>
              <p>Call Us</p>
            </div>

            <p>We are available 24/7, 7 days a week.</p>
            <p>
              Phone: <a href="tel: +2349036429879">+2349036429879</a>
            </p>

            <hr className="contact-horizontal" />

            <div className="contact-reach-us">
              <aside className="contact-icon">
                <MdOutlineEmail className="contact-email-icon" />
              </aside>
              <p>Write To US</p>
            </div>
            <p>Fill out our form and we will contact you within 24 hours.</p>
            <p>
              Emails: customer
              <a href="mailto:c0oolbreeze22@gmail.com">
                cooolbreeze22@gmail.com
              </a>
            </p>
            <p>
              Emails: support
              <a href="mailto:c0oolbreeze22@gmail.com">
                cooolbreeze22@gmail.com
              </a>
            </p>
          </section>

          <section className="contact-form">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit;
              }}
            >
              <CustomInput
                required
                autoFocus
                type="name"
                name="name"
                placeholder="Your Name *"
                className="contact-input"
                value={formData.name}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, name: e.target.value }))
                }
              />
              <CustomInput
                required
                type="email"
                name="email"
                placeholder="Your Email *"
                className="contact-input"
                value={formData.email}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    email: e.target.value,
                  }))
                }
              />
              <CustomInput
                required
                type="tel"
                name="phone"
                placeholder="Your Phone *"
                className="contact-input"
                value={formData.phone}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, phone: e.target.value }))
                }
              />
              <textarea
                required
                name="message"
                placeholder="Your Message *"
                value={formData.message}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, message: e.target.value }))
                }
              />
              <CustomButton
                type="submit"
                text="Send Massage"
                className="contact-button"
              />
            </form>
          </section>
        </div>
      </main>
    </Navbar>
  );
};

export default Contact;
