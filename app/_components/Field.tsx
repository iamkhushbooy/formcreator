'use client';
import React, { useEffect, useState } from 'react';
import NewField from './NewField';
import axios from 'axios';
import { Loader } from 'lucide-react';

export type FieldType = {
  label: string;
  type: 'text' | 'number' | 'email' | 'password' | 'file';
  id: number;
};

const Field = () => {
  const [showField, setShowField] = useState<FieldType[]>([]);
  const [email, setEmail] = useState('')
  const [linkgenerated, setLinkgenerated] = useState(false)
  const [loader, setLoader] = useState(false)

  const handleShowField = () => {
    setShowField((prevFields) => [
      ...prevFields,
      { label: '', type: 'text', id: Date.now() },
    ]);
  };

  useEffect(() => {
    try {
      const retrievedFields = localStorage.getItem('showfield');
      if (retrievedFields) {
        setShowField(JSON.parse(retrievedFields));
      }
    } catch (error) {
      console.error('Error retrieving fields from localStorage:', error);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('showfield', JSON.stringify(showField));
  }, [showField]);

  const handleDBandMail = async () => {
    setLoader(true);
    try {
      const res = await axios.post('/api/save', {
        showField,
        email,
      });
      setTimeout(() => {
        if (res.status === 200) {
          setLinkgenerated(true);
        } else {
          alert('Failed to generate the link. Please try again.');
        }
        setLoader(false);
      }, 3000);
    } catch (error) {
      console.error('Error during API call:', error);
      alert('An error occurred while generating the link.');
      setLoader(false);
    }
  };


  return (
    <>
      {!linkgenerated ? (
        <div
          className="bg-slate-50 border border-blue-200 w-[90%] h-[70%] rounded 
       flex items-center flex-col md:w-[40%] mt-16"
        >
          <h1 className="font-semibold text-[22px] mt-5">Form Builder</h1>
          <button
            onClick={handleShowField}
            className="mt-5 bg-blue-300 p-2 rounded-md hover:bg-blue-400"
          >
            Add New Field
          </button>
          <div
            className="w-full h-[80%] flex items-center flex-col 
         overflow-scroll overflow-x-hidden rounded"
          >
            {showField.map((item) => (
              <NewField
                key={item.id}
                id={item.id}
                showField={showField}
                setShowField={setShowField}
              />
            ))}
          </div>
          <div>
            {!loader ? (
              <>
                <input type="text" placeholder='write your email'
                  className="m-1 w-[130px] h-[40px] mb-5 border rounded p-2 
                   focus:outline-none focus:ring-0 focus:border-gray-300
                   md:w-[170px] md:p-2"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button onClick={handleDBandMail}
                  className='w-[130px] mt-5 m-1 bg-green-300 rounded-md 
                  hover:bg-green-400 text-[15px] h-[40px]
                   md:w-[170px] md:p-2'>Generate Link
                </button>
              </>
            ) : 
            <div className='mb-10'>
              <Loader className='animate-spin'></Loader>
            </div>
            }
          </div>

        </div>
      ) : (
        <div className='w-full h-screen flex justify-center items-center flex-col'>
          <h1 className='text-xl font-bold text-green-600
      md:text-3xl
      '>Link Generated Successfully!</h1>
          <p className='text-lg mt-3'>please check your email.</p>
        </div>
      )}
    </>

  );
};

export default Field;
