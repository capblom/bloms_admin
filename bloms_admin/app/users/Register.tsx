'use client';

import { useState, useEffect } from 'react';

export default function Register() {
  // State variables for form inputs
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [customUsername, setCustomUsername] = useState<string>('');
  const [userName, setUserName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');
  const [adminUser, setAdminUser] = useState<boolean>(false);

  // Array of usernames from server
  const [listOfUsers, setListOfUsers] = useState<string[]>([]);

  // State to control custom username input
  const [isCustomUsername, setIsCustomUsername] = useState<boolean>(false);

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

  const capitalizeAndValidate = (value: string) => {
    const regex = /^[a-zA-Z\s-]*$/;
    if (value.length > 24 || !regex.test(value)) {
      return '';
    }
    return value.charAt(0).toUpperCase() + value.slice(1);
  };

  const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = capitalizeAndValidate(e.target.value);
    setFirstName(value);
  };

  const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = capitalizeAndValidate(e.target.value);
    setLastName(value);
  };

  const validatePassword = (password: string) => {
    const minLength = 8;
    const maxLength = 20;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    return (
      password.length >= minLength &&
      password.length <= maxLength &&
      hasUpperCase &&
      hasLowerCase &&
      hasNumbers &&
      hasSpecialChar
    );
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);

    if (!validatePassword(value)) {
      setPasswordError(
        'Password must be between 8 and 20 characters long, and include an uppercase letter, a number, and a special character.'
      );
    } else {
      setPasswordError('');
    }
  };

  // Autofill username
  useEffect(() => {
    if (firstName && lastName) {
      const cleanedLastName = lastName.replace(/\s+/g, ''); // Remove spaces
      const generatedUsername = `${firstName.charAt(0).toLowerCase()}.${cleanedLastName.toLowerCase()}`;

      if (listOfUsers.includes(generatedUsername)) {
        setIsCustomUsername(true);
        setUserName(`${customUsername}.${cleanedLastName.toLowerCase()}`);
      } else {
        setIsCustomUsername(false);
        setUserName(generatedUsername);
      }
    }
  }, [firstName, lastName, listOfUsers, customUsername]);

  const handleCustomUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCustomUsername(value);
    const cleanedLastName = lastName.replace(/\s+/g, ''); // Remove spaces
    setUserName(`${value}.${cleanedLastName}`);
  };

  const handleAdminUserChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAdminUser(e.target.checked);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName,
          lastName,
          username: userName,
          password,
          adminUser,
        }),
      });
  
      const result = await response.json();
  
      if (response.ok) {
        // Handle successful registration (e.g., redirect to login page, show success message, etc.)
        console.log('User registered:', result);
      } else {
        // Handle errors (e.g., show error message)
        console.error('Registration failed:', result.error);
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  
    // Reset form fields after submission
    setFirstName('');
    setLastName('');
    setCustomUsername('');
    setUserName('');
    setPassword('');
    setAdminUser(false);
  };  

  return (
    <div>
      <h1>REGISTER</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>First Name</label>
          <input
            type="text"
            value={firstName}
            onChange={handleFirstNameChange}
          />
        </div>
        <div>
          <label>Last Name</label>
          <input
            type="text"
            value={lastName}
            onChange={handleLastNameChange}
          />
        </div>
        <div>
          {userName}
        </div>
        <div>
          <label>User Name</label>
          <input
            type="text"
            value={customUsername}
            onChange={handleCustomUsernameChange}
            disabled={!isCustomUsername} // Disable the input if not custom
          />
          {isCustomUsername && (
            <p>
              The suggested username is taken. Please enter a different one.
            </p>
          )}
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
          {passwordError && (
            <p style={{ color: 'red' }}>{passwordError}</p>
          )}
        </div>
        <div>
          <input
            type="checkbox"
            checked={adminUser}
            onChange={handleAdminUserChange}
          />
          <label>Admin User</label>
        </div>
        <div>
          <button type="submit" disabled={!!passwordError}>Register</button>
        </div>
      </form>
    </div>
  );
}
