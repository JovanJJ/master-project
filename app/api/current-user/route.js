import { NextResponse } from "next/server";
import User from "../../../lib/models/User";
import Worker from "../../../lib/models/Worker";
import { connectDB } from "../../../lib/db";

export async function GET(req){
    const { searchParams } = new URL(req.url);
    const role = searchParams.get("role");
    const id = searchParams.get("id");
    
    if (!role) return;
    if (!id) return;

    await connectDB();
    let data = null;
    if (role === "worker") {
        const fullData = await Worker.findById(id).lean();
        data = fullData;
    }

    if (role === "user") {
        const fullData = await User.findById(id).lean();
        data = fullData;
    }

    return NextResponse.json({ 
            success: true, 
            data: data 
        });
}