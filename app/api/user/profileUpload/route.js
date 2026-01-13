import { connectDB } from "../../../../lib/db.js";
import { NextResponse } from "next/server";
import cloudinary from "../../../../lib/cloudinary.js";
import User from "../../../../lib/models/User.js";
import { revalidatePath } from "next/cache";

export async function POST(req) {
    const formData = await req.formData();  
    await connectDB();
    const file = formData.get("profilePicture");
    const id = formData.get("userId");
    try {
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const uploadResult = await new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream(
                {
                    folder: 'worker-profiles',
                    transformation: [
                        { width: 400, height: 400, crop: 'fill' },
                        { quality: 'auto' }
                    ]
                },
                (error, result) => {
                    if (error) reject(error);
                    else resolve(result);
                }
            ).end(buffer)
        });
        const imageUrl = (uploadResult).secure_url;
        console.log(uploadResult.secure_url);
        const data = await User.findByIdAndUpdate(
            id,
            {profileImage: imageUrl},
            {new: true},
        ).lean();
        revalidatePath("settings")
        return NextResponse.json({ success: true, data: data});
        
    } catch (error) {
        return NextResponse.json({error});
    } 
}