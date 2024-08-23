import React, { useState } from 'react';
import './styles/Login.css';
import img from './LI-Logo.png';
import { auth } from './firebase/firebase';
import { useDispatch } from 'react-redux';
import { login } from '../features/userSlice';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [profilePic, setProfilePic] = useState('');
    const [isSignUp, setIsSignUp] = useState(false); // Add state to toggle between login and signup forms
    const dispatch = useDispatch();

    const logIntoApp = (e) => {
        e.preventDefault();
        auth.signInWithEmailAndPassword(email, password)
            .then((userAuth) => {
                dispatch(
                    login({
                        email: userAuth.user.email,
                        uid: userAuth.user.uid,
                        displayName: userAuth.user.displayName,
                        photoURL: userAuth.user.photoURL,
                    })
                );
            })
            .catch((error) => alert(error));
    };

    const register = (e) => {
        e.preventDefault();
        if (!name) {
            return alert('Please enter a full name!');
        }
        auth.createUserWithEmailAndPassword(email, password)
            .then((userAuth) => {
                return userAuth.user.updateProfile({
                    displayName: name,
                    photoURL: profilePic,
                });
            })
            .then(() => {
                dispatch(
                    login({
                        email: auth.currentUser.email,
                        uid: auth.currentUser.uid,
                        displayName: name,
                        photoURL: profilePic,
                    })
                );
            })
            .catch((error) => alert(error));
    };

    return (
        <div className="login">
            <img src={img} alt="LinkedIn Logo" />
            <form>
                {isSignUp ? (
                    <>
                        <input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Full Name (required if not registered)"
                            type="text"
                        />
                        <input
                            value={profilePic}
                            onChange={(e) => setProfilePic(e.target.value)}
                            placeholder="Profile Pic URL (optional)"
                            type="text"
                        />
                    </>
                ) : null}
                <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="dummyemail@gmail.com"
                    type="email"
                />
                <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    type="password"
                />
                <button type="submit" onClick={isSignUp ? register : logIntoApp}>
                    {isSignUp ? 'Sign Up' : 'Sign In'}
                </button>
            </form>
            <p>
                {isSignUp ? 'Already have an account?' : 'Not a member?'}
                <span
                    className="login_register"
                    onClick={() => setIsSignUp(!isSignUp)} // Toggle between login and sign-up forms
                >
                    {isSignUp ? '  Sign In' : ' Register Now'}
                </span>
            </p>
        </div>
    );
}

export default Login;
