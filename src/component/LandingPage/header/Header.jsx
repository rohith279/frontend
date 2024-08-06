import React, { useState } from "react";
import { FaUser } from "react-icons/fa";
import Button from "./button/Button.jsx";
import { useNavigate } from "react-router-dom";
import Logo from "./logo/Logo.jsx";
import {doSignOut} from "../../../Auth.js";
import RegisterForm from "../../register-form/RegisterForm.jsx";
import LoginForm from "../../login-form/LoginForm.jsx";
import {useAuth} from "../../../context/AuthContext.jsx";
import styles from "./Header.module.css";


function Header({ children }) {
  const { user } = useAuth();
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
    <header className={styles.header}>
      <div className={styles.authContainer}>
        <div className={styles.logo}>
          <Logo className={styles.logo_svg} onClick={() => navigation("/")} />
        </div>
        <div className={styles.user_container}>
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
          {user ? (
            <d>
              <div className={}>
                <Button onClick={handleLogout}>Log out</Button>
              </div>
              <div className={styles.FAContainer}>
                {console.log(user, user?.photoURL)}
                {user && user?.photoURL ? (
                  <img
                    src={user?.photoURL}
                    alt="user"
                    className={styles.userImage}
                  />
                ) : (
                  <FaUser size={50} className={styles.FA} />
                )}
              </div>
            </d>
          ) : (
            <>
              <div>
                <Button onClick={() => setShowRegisterModal(true)}>
                  Sign up
                </Button>
              </div>
              <div>
                <Button onClick={() => setShowLoginModal(true)}>Log in</Button>
              </div>
            </>
          )}
        </div>
      </div>
      {children}
    </header>
  );
}

export default Header;
