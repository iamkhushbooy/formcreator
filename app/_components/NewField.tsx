'use client';
import React, { useState } from 'react';
import { FieldType } from './Field';
// don't understand
type NewFieldProps = {
  id: number;
  showField: FieldType[];
  setShowField: React.Dispatch<React.SetStateAction<FieldType[]>>;
};

const NewField: React.FC<NewFieldProps> = ({ id, showField, setShowField }) => {
  //
  const [fieldType, setFieldType] = useState('text');
  const handleRemoveField = () => {
    setShowField(showField.filter((field) => field.id !== id));
  };

  const handleLabelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedFields = showField.map((field) =>
      field.id === id ? { ...field, label: e.target.value } : field
    );
    setShowField(updatedFields);
  };

  return (
    <div
      className="bg-slate-50 border border-blue-300 w-[80%] rounded 
      flex items-center flex-col p-5 mt-5"
    >
      <input
        type="text"
        placeholder="Field Label"
        className="w-[90%] h-[40px] mb-5 border rounded p-2 
        focus:outline-none focus:ring-0 focus:border-gray-300"
        value={showField.find((field) => field.id === id)?.label || ''}
        onChange={handleLabelChange}

      />
      <select
        value={fieldType}
        onChange={(e) => setFieldType(e.target.value as 'text' | 'number' | 'password')}
        className="w-[90%] h-[40px] mb-5 border rounded p-2 focus:outline-none focus:ring-0 focus:border-gray-300"
      >
        <option value="text">Text</option>
        <option value="number">Number</option>
        <option value="password">Password</option>
      </select>
      <button
        onClick={handleRemoveField}
        className="w-[90%] h-[40px] bg-red-300 p-2 rounded-md"
      >
        Remove Field
      </button>
    </div>
  );
};

export default NewField;
