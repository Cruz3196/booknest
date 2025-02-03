import React, { useState } from "react";
import { auth } from "../../firebase/firebaseConfig";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import "bootstrap/dist/css/bootstrap.min.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate(); // Initialize navigation

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isSignUp) {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        await updateProfile(user, { displayName: name, photoURL: "https://via.placeholder.com/150" });

        await sendEmailVerification(user);
        setMessage("Verification email sent! Please check your inbox.");

        setTimeout(() => {
          navigate("/profile"); // Redirect to profile after signup
        }, 1500);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        setMessage("Login successful!");

        setTimeout(() => {
          navigate("/profile"); // Redirect to profile after login
        }, 1000);
      }
    } catch (error) {
      setMessage(error.message);
      console.error("Authentication error:", error.message);
    }
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      setMessage(`Welcome ${result.user.displayName}!`);

      setTimeout(() => {
        navigate("/profile"); // Redirect to profile after Google login
      }, 1000);
    } catch (error) {
      setMessage(error.message);
      console.error("Google Sign-In error:", error.message);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow-sm" style={{ width: "350px" }}>
        <h2 className="text-center mb-3">{isSignUp ? "Sign Up" : "Login"}</h2>

        {message && <div className="alert alert-info">{message}</div>}

        <form onSubmit={handleSubmit}>
          {isSignUp && (
            <div className="mb-3">
              <label className="form-label">Full Name</label>
              <input type="text" className="form-control" placeholder="Enter full name" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
          )}

          <div className="mb-3">
            <label className="form-label">Email</label>
            <input type="email" className="form-control" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input type="password" className="form-control" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>

          <button type="submit" className="btn btn-primary w-100">{isSignUp ? "Sign Up" : "Login"}</button>
        </form>

        <div className="text-center my-3">
          <button onClick={handleGoogleSignIn} className="btn btn-danger w-100">Sign in with Google</button>
        </div>

        <p className="text-center">
          <span className="text-primary cursor-pointer" style={{ cursor: "pointer" }} onClick={() => setIsSignUp(!isSignUp)}>
            {isSignUp ? "Already have an account? Login" : "Don't have an account? Sign Up"}
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;
