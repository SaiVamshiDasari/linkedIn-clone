import React, { useEffect } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Newfeed from './components/Newfeed'
import './App.css';
import { login, logout,selectUser } from './features/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import Login from './components/Login';
import { auth } from './components/firebase/firebase';
import Widgets from './components/Widgets';


function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
      if (userAuth) {
        // User is logged in
        dispatch(
          login({
            email: userAuth.email,
            uid: userAuth.uid,
            displayName: userAuth.displayName,
            photoUrl: userAuth.photoURL, // Corrected from `photoUrl` to `photoURL`
          })
        );
      } else {
        // User is logged out
        dispatch(logout());
      }
    });
  
    return unsubscribe; // Cleanup on unmount
  }, [dispatch]);
  return (
    <div className="app">
      
      
      {user? (
        <div>
          <Header />
        <div className='app_body'>
        
       <Sidebar />
       <Newfeed />
       <Widgets />
     </div></div>):<Login />
    }
      
    </div>
  );
}

export default App;
