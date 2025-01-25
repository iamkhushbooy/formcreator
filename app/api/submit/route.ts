import { connectDB } from "@/app/database/connectBD";
import { formSubmission } from "@/app/database/schema";
import { NextRequest, NextResponse } from "next/server";
import { sendResponse } from "@/app/lib/sendMail";
export const POST=async(req:NextRequest)=>{
    try {
        const {fieldsave,email,_id}=await req.json();
        // console.log(fieldsave,email,_id);
        await connectDB();
        const data=await formSubmission.create({formBuilderid:_id,submittedData:fieldsave})
        await sendResponse(fieldsave,_id,email)
        console.log('emilllllllll'+data);
        
        return NextResponse.json({
            status: 'success',
            message: 'Submitted'
        })
    } catch (error) {
        return NextResponse.json({
            status: 'success',
            message: 'Not Submitted'
        })
    }

}