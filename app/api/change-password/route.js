import { NextResponse } from "next/server";
import Worker from "../../../lib/models/Worker";
import { connectDB } from "../../../lib/db";
import bcrypt from "bcryptjs"

export async function POST(req) {
    const body = await req.json();
    const { newPassword, confirmPassword, token } = body;
    

    if (newPassword !== confirmPassword) {
        return NextResponse.json({ success: false, message: "Lozinke se ne poklapaju" });
    }

    await connectDB();

    const worker = await Worker.findOne({
        passwordResetExpires: { $gt: Date.now() }
    });

    if (!worker) {
        return NextResponse.json({ success: false, message: "Došlo je do greške" });
    }

    const isValid = await bcrypt.compare(token, worker.passwordResetToken);

    if (!isValid) {
        return NextResponse.json({ success: false, message: "Došlo je do greške" });
    }

    worker.password = newPassword;
    worker.passwordResetToken = undefined; 
    worker.passwordResetExpires = undefined;
    worker.markModified('password');

    await worker.save();

    return NextResponse.json({ success: true, message: "Uspešno ste promenili lozinku" })
}