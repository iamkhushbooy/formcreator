'use client';
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { FieldType } from '@/app/_components/Field';
import Image from 'next/image';
import axios from 'axios';

export type SubmitType = {
    key: string;
    value: string | number;
};

const Page = () => {
    const params = useParams();
    const { id } = params;
    const [field, setField] = useState<FieldType[]>([]);
    const [email, setEmail] = useState('');
    const [fieldsave, setFieldsave] = useState<SubmitType[]>([]);
    const [formSubmitted, setFormSubmitted] = useState(false)

    const getField = async () => {
        try {
            const res = await fetch(`/api/form/${id}`, {
                cache: 'force-cache',
            });
            if (!res.ok) throw new Error('Failed to fetch form data');
            const j = await res.json();
            setField(j.data.fields);
            setEmail(j.data.email);
            setFieldsave(j.data.fields.map((item: FieldType) => ({ key: item.label, value: '' })));
        } catch (error) {
            console.error('Error fetching fields:', error);
        }
    };

    useEffect(() => {
        getField();
    }, []);

    const handleInputChange = (index: number, value: string) => {
        setFieldsave((prev) =>
            prev.map((item, i) =>
                i === index ? { ...item, value } : item
            )
        );
    };

    const clearForm = () => {
        setFieldsave(fieldsave.map((item) => ({ ...item, value: '' })));
    };

    // const handleSubmit = (e: React.FormEvent) => {
    //     e.preventDefault();
    //     console.log('Form submitted:', fieldsave);
    //     // Add API call or form submission logic here
    // };
    const submitForm = async () => {
        try {
            const res = await axios.post('/api/submit', {
                fieldsave,
                email,
                _id: id
            });
            setFormSubmitted(true);
        } catch (error) {
            console.error("Error submitting form:", error);
        }
    };

    return (
        <>
            {!formSubmitted ? (
                <form className="relative min-h-screen">
                    <div className="absolute inset-0">
                        <Image
                            src="/form.jpeg"
                            alt="Form Builder Design"
                            layout="fill"
                            objectFit="cover"
                            className="opacity-90"
                        />
                    </div>
                    <div className="relative flex justify-center items-center flex-col">
                        {field.map((item, index) => (
                            <div
                                key={index}
                                className="rounded-lg w-[80%] h-[150px] flex flex-col border bg-[#ffffff] my-5
                         border-blue-300"
                            >
                                <label htmlFor={`field-${index}`} className="text-[20px] mx-5 mt-5">
                                    {item.label}
                                </label>
                                <input
                                    id={`field-${index}`}
                                    type="text"
                                    placeholder="Your answer"
                                    className="w-[90%] h-[35px] border-b-2 p-2 focus:border-b-blue-400 duration-300 focus:outline-none m-5"
                                    value={fieldsave[index]?.value || ''}
                                    onChange={(e) => handleInputChange(index, e.target.value)}
                                    required
                                />
                            </div>
                        ))}
                    </div>
                    <div className="relative w-[80%] h-[80px] flex items-center justify-between font-medium mx-[10%]">
                        <button
                            onClick={submitForm}
                            type="submit"
                            className="text-[20px] px-5 text-white bg-purple-700 hover:bg-purple-900 rounded-md p-2"
                        >
                            Submit
                        </button>
                        <button
                            type="button"
                            onClick={clearForm}
                            className="text-purple-900"
                        >
                            Clear Form
                        </button>
                    </div>
                    <div className="relative w-[80%] mx-[10%] flex justify-center items-center flex-col
              ">
                        <p className="p-2 text-[11px]">This form is created by {email}</p>
                        <footer className="font-extralight text-[12px]">
                            This website created by Khushboo
                        </footer>
                    </div>
                </form>
            ) : (
                <div className='w-full h-screen flex justify-center items-center flex-col'>
                    <h1 className='text-xl font-bold text-green-600
                    md:text-3xl
                    '>Form Submitted Successfully!</h1>
                    <p className='text-lg mt-3'>Thank you for your response.</p>
                </div>
            )

            }

        </>
    );
};

export default Page;
