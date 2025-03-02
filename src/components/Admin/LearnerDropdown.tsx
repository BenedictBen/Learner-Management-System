"use client"

import { useState } from 'react';

interface DropdownProps {
  options: { value: string; label: string }[];
  selectedValue: string;
  onSelect: (value: string) => void;
  placeholder?: string;
}

const LearnerDropdown = ({ 
  options, 
  selectedValue, 
  onSelect, 
  placeholder = 'Filter' 
}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative w-fit">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-32 lg:w-28 px-3 py-1.5 text-left text-sm rounded-md shadow-sm focus:outline-none focus:ring-1  transition-colors flex items-center justify-between
          ${
            isOpen 
              ? 'bg-white border border-casbBluePrimary text-gray-900 hover:bg-gray-50' 
              : 'bg-casbGreyPrimary border border-gray-300 border-b-2 border-b-casbBluePrimary text-gray-400'
          }`}
      >
        <span className="truncate">
          {selectedValue ? 
            options.find(opt => opt.value === selectedValue)?.label : 
            placeholder}
        </span>
        <svg
          className={`w-5 h-5 ml-2 transition-transform transform ${isOpen ? 'rotate-180' : ''}`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute z-10 w-full bg-white rounded-md shadow-lg 
                       border border-gray-200 max-h-60 overflow-auto">
          <div className="py-1 text-sm">
            {options.map((option) => (
              <button
                key={option.value}
                onClick={() => {
                  onSelect(option.value);
                  setIsOpen(false);
                }}
                className={`block w-full px-3 py-2 text-left hover:bg-blue-50 
                          ${selectedValue === option.value ? 
                            'bg-blue-50 text-blue-700' : 'text-gray-700'}`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LearnerDropdown;