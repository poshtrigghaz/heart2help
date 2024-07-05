import React, { useEffect, useState } from 'react';
import { collection, query, where, getDocs } from "firebase/firestore";
import { auth, db } from '../../firebase.config';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar';

const ChatList = () => {
  const [orgs, setOrgs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrgs = async () => {
      const q = query(collection(db, 'users'), where('type', '==', 'org'));
      const querySnapshot = await getDocs(q);
      const orgData = [];
      querySnapshot.forEach((doc) => {
        orgData.push({ id: doc.id, ...doc.data() });
      });
      setOrgs(orgData);
    };

    fetchOrgs();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <Navbar />
      <h2 className="text-2xl font-bold mb-4 text-white">Chat with:</h2>
      <ul className="bg-white shadow-md rounded p-4">
        {orgs.map((org) => (
          <li 
            key={org.id} 
            className="p-2 border-b border-gray-200 cursor-pointer hover:bg-gray-100"
            onClick={() => navigate(`/chats/${org.id}`)}
          >
            {org.orgName}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatList;
