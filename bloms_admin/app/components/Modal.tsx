// components/Modal.tsx

import { ReactNode } from 'react';

interface ModalProps {
  isVisible: boolean;
  onClose: () => void;
  children: ReactNode;
  label: string;
}

export default function Modal({ isVisible, onClose, children, label }: ModalProps) {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="absolute inset-0 bg-darkpurple bg-opacity-50 backdrop-blur-sm"></div>
      <div className="bg-white p-4 rounded-lg shadow-lg z-10 relative max-w-[70vw]">
        <div className='flex justify-between items-center'>
          <h3 className='text-2xl text-lightpurple m-0 flex items-center'>{label}</h3>

          {label === "login" ? (
            <div className='flex items-center'>
              <span className='text-4xl material-symbols-sharp'>account_circle</span>
            </div>
          ) : (
            <button
              onClick={onClose}
              className="text-2xl text-darkpurple cursor-pointer hover:text-lightpurple flex items-center"
            >
              <span className="material-symbols-sharp">close</span>
            </button>
          )}
        </div>

        {children}
      </div>
    </div>
  );
}
