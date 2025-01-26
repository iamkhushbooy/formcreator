import React from 'react';
import Image from "next/image";
import AddField from './_components/Field';
export default function Home() {
  return (
    <div className="relative min-h-screen">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/form.jpeg"
          alt="Form Builder Design"
          layout="fill"
          objectFit="cover"
          className="opacity-90"
        />
      </div>
      {/* Content Section */}
      <div className="relative w-full h-screen flex justify-center">
        <AddField />
      </div>
    </div>
  );
}
