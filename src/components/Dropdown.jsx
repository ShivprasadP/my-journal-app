import React, { useState, useEffect, useRef } from 'react';

function Dropdown({ onItemSelected }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const dropdownRef = useRef(null);

  const handleItemClick = (item) => {
    onItemSelected(item);
    setSelectedItem(item);
    setIsOpen(false);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="dropdown-container border border-black rounded-lg" style={{ position: 'relative' }} ref={dropdownRef}>
      <details className="dropdown" open={isOpen} onClick={() => setIsOpen(!isOpen)}>
        <summary className={`btn m-1 ${selectedItem === null ? 'text-gray-400' : 'text-black'}`}>
          {selectedItem || "Select Question"}
        </summary>
        <ul className="menu dropdown-content bg-white rounded-box w-52 p-2 shadow absolute">
          <li onClick={() => handleItemClick('What is the place of your birth?')}><a>What is the place of your birth?</a></li>
          <li onClick={() => handleItemClick('What is the name of your pet dog?')}><a>What is the name of your pet dog?</a></li>
        </ul>
      </details>
    </div>
  );
}

export default Dropdown;