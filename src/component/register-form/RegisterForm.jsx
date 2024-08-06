import {useState} from "react";
import styles from './RegisterForm.module.css';
import Visibility from "../visibility/Visibility.jsx";
import VisibilityOff from "../visibility/VisibilityOff.jsx";
import Google from "../social-buttons/Google.jsx";
import LoginForm from "../login-form/LoginForm.jsx";
import {doCreateUserWithEmailAndPasswordAndUsername, doSignInWithGoogle} from "../../Auth.js";
import ModalForm from "../modal/ModalForm.jsx";
import {useNavigate} from "react-router-dom";

const RegisterForm = ({isOpen, onClose}) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [redirectToLogin, setRedirectToLogin] = useState(false);
    const navigation = useNavigate();
    const SignUpWithGoogle = async () => {
        await doSignInWithGoogle().then(() => {
            navigation("/dashboard");
            onClose();
        })
    };
    /*const SignUpWithGithub = async () => {
        await doSignInWithGithub().then(() => {
            toast.success("Logged in successfully!");
            onClose();
        })
    };*/
    const handleSignUp = async (event) => {
        event.preventDefault();
        if (!email || !password || !username) {
            alert("Please fill in all the fields!");
            return;
        }
        if (!email.includes("@")) {
            alert("Please enter a valid email address!");
            return;
        }
        if (password.length < 6) {
            alert("Password must be at least 6 characters long!");
            return;
        }
        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }
       const res = await doCreateUserWithEmailAndPasswordAndUsername(
            email, password, username
        )
        if (res) {
            navigation("/dashboard");
            onClose();
        }
    }
    return (
        <>
        {
            redirectToLogin ?
                <LoginForm isOpen={true} onClose={() => {
                    setRedirectToLogin(false)
                    onClose();
                }}/>
                :
                <>
        <ModalForm isOpen={
            isOpen
        } onClose={() => {
            onClose();
        }}
                   headerChildren={<h1 className={styles.title}>
                       Sign Up
                   </h1>
                   }
                   contentClassName={styles.content}
                   bodyClassName={styles.body}
                   closeButton={true}
                   closeOnOverlayClick={false}
                   closeOnEsc={false}
        >
            <form className={styles.form}>
                <div className={styles.input_group}>
                    <label className={styles.input_label}> Username
                        <input type="text" placeholder="Enter your username"  className={styles.input} value={username}
                               onChange={(event) => setUsername(event.target.value)}/>
                    </label>
                    <label className={styles.input_label}> Email address
                        <input type="email" placeholder="Enter your email"  className={styles.input}
                               value={email} onChange={(event) => setEmail(event.target.value)}/>
                    </label>
                    <label className={styles.input_label}> Password
                        <div className={styles.password_input_container}>
                            <input type={
                                isPasswordVisible ? "text" : "password"
                            } placeholder="Enter your password"  className={styles.input}
                                   value={password} onChange={(event) => setPassword(event.target.value)}/>
                            {isPasswordVisible ?
                                <Visibility onClick={() => setIsPasswordVisible(!isPasswordVisible)}  className={styles.visibility}/> :
                                <VisibilityOff onClick={() => setIsPasswordVisible(!isPasswordVisible)}  className={styles.visibility} />}
                        </div>
                    </label>
                    <label className={styles.input_label}> Confirm Password
                        <div className={styles.password_input_container}>
                            <input type={
                                isConfirmPasswordVisible ? "text" : "password"
                            } placeholder="Confirm your password"  className={styles.input}
                                   value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)}/>
                            {isConfirmPasswordVisible ?
                                <Visibility onClick={() => setIsConfirmPasswordVisible(!isConfirmPasswordVisible)} className={styles.visibility}/> :
                                <VisibilityOff onClick={() => setIsConfirmPasswordVisible(!isConfirmPasswordVisible)}  className={styles.visibility} />}
                        </div>
                    </label>
                </div>
                <button type="submit" className={styles.submit_button}
                        onClick={handleSignUp}
                >Sign Up</button>
                <div className={styles.seperator}>
                    <span className={styles.seperator_line}/>
                    <span className={styles.seperator_text}>or</span>
                    <span className={styles.seperator_line}/>
                </div>
                <div className={styles.social_buttons}>
                    <button type="button" className={styles.social_button}
                            onClick={SignUpWithGoogle}
                    > <Google className={styles.google_icon}/>
                        Sign up with Google</button>
                    {/*<button type="button" className={styles.social_button}
                            onClick={SignUpWithGithub}
                    > <Github className={styles.github_icon}/>
                        Sign up with Github</button>*/}
                </div>
                <div className={styles.footer}>
                    <span>Already have an account?</span>
                    <button type="button" className={styles.footer_button}
                            onClick={() => setRedirectToLogin(true)}
                    >Log in</button>
                </div>
            </form>
        </ModalForm>
        </>}
        </>
    );
}

export default RegisterForm;