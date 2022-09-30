import React from 'react';

const Select = ({ options, onSelect, id, selected }) => {
  return (
    <>
      <select value={selected} id={id} name='name' className="border-2 p-2 rounded-md mb-5" onChange={(e) => onSelect(e)}>
        <option value="test" selected >Whos in the meeting?</option>
        {options.map((option) => (
          //lmao fix these keys bruh
          <option value={option.name} key={Math.random()}>{option.name}</option>
        ))}
      </select>
    </>
  )
}

export default Select;