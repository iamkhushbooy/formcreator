import { connectDB } from "@/app/database/connectBD"
import { NextRequest, NextResponse } from "next/server"
import {Data} from "@/app/database/schema"
// type ParamType = {
//     params: {
//         id: string
//     }
// }
export const GET = async (req, param) => {
    try {
        const { id } = param.params;
        await connectDB();
        const data = await Data.findById({ _id: id });
        return NextResponse.json({
            status: 'success',
            message: 'Form found',
            data
        })
    } catch (error) {
        return NextResponse.json({
            status: 'fail',
            message: 'Form not found'
        })
    }

} 