import React from 'react';
import { auth } from '../../firebase.config'; // Adjust the path to your Firebase configuration

function Navbar() {
  const handleLogout = async () => {
    try {
      await auth.signOut();
      window.location.href = '/login.html'; // Redirect to the login page
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <div className='h-20 flex items-center justify-between w-full text-white bg-blue-500'>
      <div className='text-3xl pl-20 font-bold'>heart2help</div>
      <div className='flex items-center'>
        <a 
          href="../../../JobForm.html" 
          className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-4'
          target="_blank" // Remove this if you want to open in the same tab
        >
          Open Form
        </a>
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
