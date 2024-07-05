import React, { useEffect, useState } from 'react';
import { collection, query, orderBy, onSnapshot, addDoc, serverTimestamp, getDoc, doc } from "firebase/firestore";
import { auth, db } from '../../firebase.config';
import { useParams } from 'react-router-dom';
import Navbar from '../Navbar';

const Chat = () => {
  const { orgId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [orgName, setOrgName] = useState('');
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const fetchOrgName = async () => {
      const orgDoc = await getDoc(doc(db, 'users', orgId));
      if (orgDoc.exists()) {
        setOrgName(orgDoc.data().orgName);
      }
    };

    const fetchUserName = async () => {
      const user = auth.currentUser;
      if (user) {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          setUserName(userDoc.data().fullname || userDoc.data().orgName);
        }
      }
    };

    fetchOrgName();
    fetchUserName();
  }, [orgId]);

  useEffect(() => {
    const q = query(collection(db, 'chats', orgId, 'messages'), orderBy('timestamp'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const messagesData = [];
      querySnapshot.forEach((doc) => {
        messagesData.push({ id: doc.id, ...doc.data() });
      });
      setMessages(messagesData);
    });

    return () => unsubscribe();
  }, [orgId]);

  const sendMessage = async (e) => {
    e.preventDefault();
    const user = auth.currentUser;
    if (user) {
      await addDoc(collection(db, 'chats', orgId, 'messages'), {
        text: newMessage,
        sender: user.uid,
        timestamp: serverTimestamp()
      });
      setNewMessage('');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <Navbar />
      <h2 className="text-2xl font-bold mb-4 text-white">Chat:</h2>
      <div className="bg-white shadow-md rounded p-4 mb-4" style={{ height: '400px', overflowY: 'scroll' }}>
        {messages.map((message) => (
          <div key={message.id} className="mb-2">
            <strong>{message.sender === auth.currentUser.uid ? 'You' : 'Them'}:</strong> {message.text}
          </div>
        ))}
      </div>
      <form onSubmit={sendMessage} className="flex">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message"
          className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-2"
        />
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Send
        </button>
      </form>
    </div>
  );
};

export default Chat;
