// MinuteSelect.js
import React from 'react';

const MinuteSelect = ({ value, onChange }) => {
  const minutes = Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, '0'));

  return (
    <select value={value} onChange={onChange} className="border text-black border-gray-300 rounded-md focus:outline-none focus:border-green-500 focus:shadow-outline-green px-3 py-2 w-32">
      {minutes.map((minute, index) => (
        <option key={index} value={minute}>
          {minute}
        </option>
      ))}
    </select>
  );
};

export default MinuteSelect;
