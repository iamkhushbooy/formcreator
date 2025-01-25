import { connectDB } from "@/app/database/connectBD";
import { Data } from "@/app/database/schema";
import { NextRequest, NextResponse } from "next/server";

type ParamType = {
    params: {
        id: string;
    };
};

export const GET = async (req: NextRequest, { params }: ParamType) => {
    // return NextResponse.json("hello")
    try {
        const { id } = params;
        await connectDB();
        const data = await Data.findById({_id:id});
        if (!data) {
            return NextResponse.json({
                status: 'fail',
                message: 'Form not found',
            });
        }
        return NextResponse.json({
            status: 'success',
            message: 'Form found',
            data
        });
    } catch (error) {
        console.error("Error fetching form:", error);
        return NextResponse.json({
            status: 'error',
            message: 'An error occurred',
        });
    }
};
