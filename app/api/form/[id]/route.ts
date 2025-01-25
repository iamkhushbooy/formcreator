import { connectDB } from "@/app/database/connectBD";
import { Data } from "@/app/database/schema";
import { NextRequest, NextResponse } from "next/server";

 const GET = async (req: NextRequest, context: { params: { id: string } }) => {
    try {
        const { id } = context.params; 
        await connectDB(); 

        const data = await Data.findById(id);

        if (!data) {
            return NextResponse.json(
                {
                    status: "fail",
                    message: "Form not found",
                },
                { status: 404 }
            );
        }

        return NextResponse.json({
            status: "success",
            message: "Form found",
            data,
        });
    } catch (error) {
        console.error("Error fetching form:", error);
        return NextResponse.json(
            {
                status: "error",
                message: "An error occurred",
            },
            { status: 500 }
        );
    }
};
export {GET}