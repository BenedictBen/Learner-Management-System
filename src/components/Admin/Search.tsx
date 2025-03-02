import React from 'react';
   
  import {
    Command,
    CommandInput,
  } from "@/components/ui/command"


  interface SearchBarProps {
    placeholder: string;
    className?: string;
    value: string;
    onChange: (value: string) => void;
  }

export default function SearchBar ({ placeholder, className, value, onChange }: SearchBarProps) {
  return (
<div className={`w-full ${className}`}>
      <Command className="w-full rounded-sm border-b-2 border-casbSeaBlueSecondary shadow-md ">
        <CommandInput 
          placeholder={placeholder} 
          className="w-full text-sm md:text-base py-3 placeholder:text-gray-500 dark:placeholder:text-white" 
          value={value}
          onValueChange={onChange}
        />
      </Command>
    </div>
  );
}