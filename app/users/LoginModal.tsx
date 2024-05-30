'use client';

import { useState, useEffect } from 'react';
import Modal from '../components/Modal';

interface LoginProps {
  isVisible: boolean;
  onClose: () => void;
  onLogin: () => void;
}

export default function LoginModal({ isVisible, onClose, onLogin }: LoginProps) {
  // State variables for form entry  
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  // State variable to track error with username or password
  const [passwordError, setPasswordError] = useState<boolean>(false);

  // Array of usernames from server
  const [listOfUsers, setListOfUsers] = useState<string[]>([]);

  // State variable to store filtered usernames
  const [filteredUserNames, setFilteredUserNames] = useState<string[]>([]);

  // State variable to show check icon
  const [showCheckIcon, setShowCheckIcon] = useState<boolean>(false);

  // Fetch and set usernames from server
  useEffect(() => {
    const fetchUsernames = async () => {
      try {
        const response = await fetch('/api/fetchUserNames');
        const data = await response.json();
        setListOfUsers(data);
        console.log(data);
      } catch (error) {
        console.error('Failed to fetch usernames', error);
      }
    };

    fetchUsernames();
  }, []);

  // Function to handle changes in input and filter usernames
  const handleUserNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPasswordError(false);
    setUserName(value);

    if (value.length > 0) {
      const filtered = listOfUsers.filter(username =>
        username.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredUserNames(filtered);

      // Check if the entered username matches any of the filtered usernames
      if (filtered.includes(value.toLowerCase())) {
        setShowCheckIcon(true);
        setFilteredUserNames([]); // Clear the filtered usernames
      } else {
        setShowCheckIcon(false);
      }
    } else {
      setFilteredUserNames([]);
      setShowCheckIcon(false);
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordError(false);
    setPassword(e.target.value);
  };

  const handleUserNameClick = (username: string) => {
    setUserName(username);
    setFilteredUserNames([]);
    setShowCheckIcon(true); // Show the check icon when a username is clicked
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: userName, password }),
    });

    const result = await response.json();
    if (response.ok) {
      console.log('Token received from API:', result.token); // Log the token
      localStorage.setItem('token', result.token);
      localStorage.setItem('userId', result.userId);
      localStorage.setItem('username', result.username);
      localStorage.setItem('permissionLevel', result.permissionLevel);
      onLogin();
    } else {
      setPasswordError(true);
    }
  };

  return (

    <Modal isVisible={isVisible} onClose={onClose} label="login">

      <div className="flex flex-col items-start py-2 mr-4">
        <p className='text-md py-2'>Welcome to the Bloms Bulbs Admin Suite, please enter your username and password below. If you do not know your details, please contact an administrator.</p>
        {passwordError &&
          <p className='text-sm text-red pb-2'>PLEASE CHECK YOUR USERNAME OR PASSWORD AND TRY AGAIN</p>
        }
        <div className='flex'>
          {filteredUserNames.map(username => (
            <span className="bg-lightpurple rounded-sm text-md p-2 mr-2 mb-2 cursor-pointer hover:text-white" key={username} onClick={() => handleUserNameClick(username)}>
              {username}
            </span>
          ))}
        </div>

        <form className="grid grid-cols-6 mt-2" onSubmit={handleSubmit}>

          <div className='col-span-1 flex items-center mb-2'>
            <label>USERNAME</label>
            {showCheckIcon && (
              <span className="material-symbols-outlined text-lightpurple ml-2">
                check_circle
              </span>
            )}
          </div>

          <div className='col-span-5 flex-items-center ml-4 mb-2'>
            <input
              type="text"
              value={userName}
              onChange={handleUserNameChange}
              className="p-2 rounded-sm shadow-md border focus:outline-none focus:ring-2 focus:ring-lightpurple"
            />
          </div>

          <div className='col-span-1 flex items-center'>
            <label>PASSWORD</label>
          </div>

          <div className='col-span-5 flex-items-center ml-4 mb-2'>
            <input
              type="password"
              value={password}
              onChange={handlePasswordChange}
              className="p-2 rounded-sm shadow-md border focus:outline-none focus:ring-2 focus:ring-lightpurple"
            />
          </div>

          <button className="bg-darkpurple text-white font-medium py-2 px-4 my-2 rounded-sm hover:bg-lightpurple" type="submit">LOGIN</button>
        </form>
      </div>
    </Modal>
  );
}
