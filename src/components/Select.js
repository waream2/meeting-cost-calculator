import React from 'react';

const Select = ({ options, onSelect }) => {
  return (
    <>
      <select className="border-2 p-2 rounded-md mb-5" onChange={(e) => onSelect(e)}>
        {options.map((option) => (
          //lmao fix these keys bruh
          <option key={Math.random()}>{option.name}</option>
        ))}
      </select>
    </>
  )
}

export default Select;