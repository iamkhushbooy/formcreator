import { connectDB } from "@/app/database/connectBD";
import { NextResponse } from "next/server";
import { Data } from "@/app/database/schema";

export const GET = async (req, { params }) => {
  try {
    const { id } = params; 
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
    return NextResponse.json(
      {
        status: "error",
        message: error.message || "An error occurred",
      },
      { status: 500 }
    );
  }
};
