/* eslint-disable react-hooks/rules-of-hooks */
import { Link, useNavigate } from "react-router-dom";
import "./index.css";
import RegisterForm from "../register-form/RegisterForm.jsx";
import LoginForm from "../login-form/LoginForm.jsx";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext.jsx";
import { doSignOut } from "../../Auth.js";
import styles from "./header/Header.module.css";
import { FaUser } from "react-icons/fa";

import image_on_right from "/src/assets/write-machine.png";
import { Button } from "@chakra-ui/react";

const index = () => {
  const { user, isAuthenticated } = useAuth();
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const navigation = useNavigate();

  const handleLogout = async () => {
    await doSignOut().then(() => {
      if (window.location.pathname !== "/") {
        navigation("/");
      }
    });
  };
  return (
    <>
      <header className="header">
        {showRegisterModal && (
          <RegisterForm
            isOpen={showRegisterModal}
            onClose={() => setShowRegisterModal(false)}
          />
        )}
        {showLoginModal && (
          <LoginForm
            isOpen={showLoginModal}
            onClose={() => setShowLoginModal(false)}
          />
        )}
        <div className="container-fluid modified-container-fluid">
          <div className="row align-items-center ">
            <div className="col">
              <div className="logo">AI Blog</div>
            </div>
            <div className="col-auto  auth-buttons">
              {user ? (
                <>
                  <button className="sign-out btn" onClick={handleLogout}>
                    Sign Out
                  </button>
                  <div className={styles.FAContainer}>
                    {user && user.photoURL ? (
                      <img
                        src={user.photoURL}
                        alt="user"
                        className={styles.userImage}
                      />
                    ) : (
                      <FaUser size={50} className={styles.FA} />
                    )}
                  </div>
                </>
              ) : (
                <>
                  <button
                    className="sign-in btn"
                    onClick={() => setShowLoginModal(true)}
                  >
                    Sign In
                  </button>
                  <button
                    className="sign-up btn"
                    onClick={() => setShowRegisterModal(true)}
                  >
                    Sign Up
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      <section className="hero-section">
        <div className="container">
          <div className="row align-items-center flex-nowrap gap-5">
            <div className="col-lg-6">
              <div className="hero-content">
                <h1>
                  Al-Powered Blog Content Creation with <span>Llama 3</span>
                </h1>
                <p>
                  With the power of Llama 3, create engaging and tailored
                  articles in minutes, designed to captivate your audience.
                </p>
                <div className="hero-buttons">
                  {isAuthenticated ? (
                    <div className="row align-items-center flex-nowrap justify-content-center">
                      <Link
                        to="/dashboard"
                        style={{
                          textDecoration: "none",
                          width: "auto",
                          padding: "0",
                        }}
                      >
                        <button className="get-started">Get Started</button>
                      </Link>
                      <Link
                        to="/dashboard"
                        style={{
                          textDecoration: "none",
                          width: "auto",
                          padding: "0",
                        }}
                      >
                        <Button
                          border={"1px solid #007BFF"}
                          borderRadius={"10px"}
                          padding={"15px 30px"}
                          height={"54px"}
                          backgroundColor={"transparent"}
                          color={"#007BFF"}
                          _hover={{"backgroundColor": "#007BFF", "color": "white"}}
                        >
                          Explore Docs
                        </Button>
                      </Link>
                    </div>
                  ) : (
                    <div className="row align-items-center flex-nowrap justify-content-center">
                      <div
                          style={{
                            textDecoration: "none",
                            width: "auto",
                            padding: "0",
                          }}
                      >
                        <button
                            className="get-started"
                            onClick={() => setShowRegisterModal(true)}
                        >
                          Get Started
                        </button>
                      </div>
                      <div
                          style={{
                            textDecoration: "none",
                            width: "auto",
                            padding: "0",
                          }}
                      >
                        <Button
                            border={"1px solid #007BFF"}
                            borderRadius={"10px"}
                            padding={"15px 30px"}
                            height={"54px"}
                            backgroundColor={"transparent"}
                            color={"#007BFF"}
                            onClick={() => setShowRegisterModal(true)}
                        >
                          Explore Docs
                        </Button>
                      </div>
                    </div>
                  )}
                  {/*<Link to="/" style={{textDecoration:"none"}}>
            <button className="explore-docs">Explore Docs</button>
            </Link>*/}
                </div>
              </div>
            </div>
            <div>
              <img src={image_on_right} alt="write-machine" />
            </div>
          </div>
        </div>
      </section>

      {/* <div className="chat-box">
      <div className="chat-header">SynthMind 24/7 Global AI Support</div>
      <div className="chat-body">
        <div className="user-message">Id like to track the status of my express delivery.</div>
        <div className="synthmind-message">Sure, may I have the tracking number, please?</div>
        <div className="user-message">1A2B 3C1A 2B3C 1A3C</div>
        <div className="synthmind-message">Great news! Your package has arrived in New York and is expected to be delivered tomorrow.</div>
      </div>
      <input type="text" className="chat-input" placeholder="Message SynthMind..." />
    </div> */}
    </>
  );
};

export default index;
