'use client';
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { FieldType } from '@/app/_components/Field';
import Image from 'next/image';
export type submitType = {
    key: string,
    value: number | string
}
const Page = () => {
    const params = useParams();
    const { id } = params;
    // console.log(id);
    const [field, setField] = useState<FieldType[]>([])
    const [email, setEmail]=useState('')
    const [fieldsave, setFieldsave] = useState<submitType[]>([])
    const getField = async () => {
        const res = await fetch(`/api/form/${id}`, {
            cache: 'force-cache'
        })
        const j = await res.json();
        setField(j.data.fields)
        setEmail(j.data.email)
        console.log(j.data);
    }
    useEffect(() => {
        getField();
    }, [])

    const clearForm = () => {
        setFieldsave(fieldsave.map(() => ({ key: '', value: '' })));
    };
    
    return (
        <form className='relative min-h-screen'>
            <div className="absolute inset-0">
                <Image
                    src="/form.jpeg"
                    alt="Form Builder Design"
                    layout="fill"
                    objectFit="cover"
                    className="opacity-90"
                />
            </div>
            <div className='relative flex justify-center items-center flex-col'>
                {field.map((item, index) => (
                    <div key={index}
                        className='rounded-lg w-[80%] h-[150px] 
                        flex flex-col border bg-[#ffffff] my-5'>
                        <label className='text-[20px] mx-5 mt-5'>{item.label}</label>
                        <input type="text"
                            placeholder='Your answer' className='w-[90%] 
                             h-[35px] border-b-2 p-2 focus:border-b-blue-400 
                             duration-300 focus:outline-none m-5'
                             required
                        />
                    </div>
                ))}
            </div>
            <div className='relative w-[80%] h-[80px] flex items-center
               justify-between font-medium  mx-[10%]'>
                <button className='text-[20px] px-5 text-white bg-purple-700
                 hover:bg-purple-900 rounded-md p-2'>
                    Submit
                </button>
                <button onClick={clearForm} className='text-purple-900'>
                    Clear Form
                </button>
            </div>
           <div className='relative w-[80%] mx-[10%] flex justify-center items-center 
           flex-col'>
           <p className='p-2 text-[13px]'>This form is created by {email}</p> 
                <footer className='font-extralight text-[12px]'>
                    This website created by Khushboo
                </footer>
           </div>

        </form>

    );
};

export default Page;
