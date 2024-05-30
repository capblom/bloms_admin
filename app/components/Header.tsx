'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Modal from './Modal';

interface HeaderProps {
  toggleSidebar: () => void;
  handleLogout: () => void;
}

export default function Header({ toggleSidebar, handleLogout }: HeaderProps) {
  const [isAccountModalVisible, setIsAccountModalVisible] = useState(false);
  const [isNewModalVisible, setIsNewModalVisible] = useState(false);
  const [username, setUsername] = useState<string | null>(null);

  const router = useRouter(); // Initialize the router

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const toggleAccountModal = () => {
    setIsAccountModalVisible(!isAccountModalVisible);
  };

  const toggleNewModal = () => {
    setIsNewModalVisible(!isNewModalVisible);
  };

  const handleOptionClick = (action: string) => {
    if (action === 'LOGOUT') {
      handleLogout();
    } else if (action === 'CATALOGUE REQUEST') {
      router.push('/customers/catalogueRequest');
    } else if (action === 'ORDER') {
      router.push('/customers/newOrder');
    }
    // Handle other actions
    setIsAccountModalVisible(false);
    setIsNewModalVisible(false);
  };

  const handleHomeClick = () => {
    router.push('/'); // Navigate to the root page
  };

  return (
    <header className="col-span-12 bg-darkpurple text-white p-4 flex justify-between items-center">
      <div>
        <span className="material-symbols-sharp text-3xl cursor-pointer hover:text-lightpurple" onClick={toggleSidebar}>menu</span>
      </div>

      <div>
        <h2 className='font-serif text-2xl font-semibold'>Bloms Bulbs</h2>
      </div>
      
      <nav className='hidden sm:block'>
        <h2 className='font-semibold cursor-pointer hover:text-lightpurple' onClick={handleHomeClick}>HOME</h2>
      </nav>

      <nav className="hidden sm:block">
        <h2 className='font-semibold cursor-pointer hover:text-lightpurple' onClick={toggleNewModal}>NEW</h2>
      </nav>

      <div className='flex items-center'>
        <div className='px-4'>
          <p>hello</p>
          <p className='text-lightpurple text-sm'>{username}</p>
        </div>

        <div className='mr-4'>
          <span className="material-symbols-sharp text-3xl cursor-pointer hover:text-lightpurple" onClick={toggleAccountModal}>account_circle</span>
        </div>
      </div>

      <Modal isVisible={isAccountModalVisible} onClose={toggleAccountModal} label="account">
        <div className="flex flex-col items-start py-2 mr-4 text-black">
          <button onClick={() => handleOptionClick('MANAGE ACCOUNT')} className="py-2 hover:text-lightpurple">
            MANAGE ACCOUNT
          </button>
          <button onClick={() => handleOptionClick('LOGOUT')} className="py-2 hover:text-lightpurple">
            LOGOUT
          </button>
        </div>
      </Modal>

      <Modal isVisible={isNewModalVisible} onClose={toggleNewModal} label="new">
        <div className="flex flex-col items-start py-2 mr-4 text-black">
          <button onClick={() => handleOptionClick('CATALOGUE REQUEST')} className="py-2 hover:text-lightpurple">
            CATALOGUE REQUEST
          </button>
          <button onClick={() => handleOptionClick('ORDER')} className="py-2 hover:text-lightpurple">
            ORDER
          </button>
        </div>
      </Modal>
    </header>
  );
}
