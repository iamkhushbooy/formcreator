import { connectDB } from "@/app/database/connectBD";
import { NextRequest, NextResponse } from "next/server"
import { Data } from "@/app/database/schema";
import sendMail from "@/app/lib/sendMail";
export const POST = async (req: NextRequest) => {
    try {
        const { showField, email } = await req.json();
        // console.log(email);
        // console.log(showField);
        await connectDB();
        const data = await Data.create({ fields: showField, email })
        // console.log(data);
        const { _id } = data;
        await sendMail(email, _id)
        return NextResponse.json('sucess')
    } catch (error) {
        // console.log(error);
        return NextResponse.json('error occoured')
    }

}