import React from 'react';
import { useEffect, useState } from 'react';
import { auth, db } from '../../firebase.config'; // Adjust the path to your Firebase configuration
import { getDoc, doc } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const [userType, setUserType] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserType = async () => {
      const user = auth.currentUser;
      if (user) {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          setUserType(userDoc.data().type);
        }
      }
    };
    fetchUserType();
  }, []);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      window.location.href = '/login.html'; // Redirect to the login page
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const handleOpenForm = (e) => {
    if (userType !== 'org') {
      e.preventDefault();
      alert('You need to register as an organization to access this form.');
    }
  };

  const handleProfileClick = () => {
    navigate('/profile');
  };

  return (
    <div className='h-20 flex items-center justify-between w-full text-white bg-blue-500'>
      <div className='text-3xl pl-20 font-bold'>heart2help</div>
      <div className='flex items-center'>
        <a 
          href="../../../JobForm.html" 
          className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-4'
          target="_blank" // Remove this if you want to open in the same tab
          onClick={handleOpenForm}
        >
          Open Form
        </a>
        <button 
          onClick={handleProfileClick} 
          className='bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded mr-4'
        >
          My Profile
        </button>
        <button 
          onClick={handleLogout} 
          className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-20'
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Navbar;
