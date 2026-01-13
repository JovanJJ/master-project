import { NextResponse } from "next/server";
import Worker from "../../../../lib/models/Worker";
import { connectDB } from "../../../../lib/db";
import crypto from "crypto";
import bcrypt from "bcryptjs"
import { email, sendEmail } from "../../../../lib/email";

export async function POST(req) {
    const body = await req.json();
    const { email } = body;

    await connectDB();

    const token = crypto.randomBytes(32).toString("hex");
    const hashedToken = await bcrypt.hash(token, 10);

    const expires = Date.now() + 1000 * 60 * 15;
    const user = await Worker.findOneAndUpdate(
        { email },
        {
            passwordResetToken: hashedToken,
            passwordResetExpires: expires
        },
        { new: true }
    );
    
    if (!user) {
        return NextResponse.json({ success: true });
    }

    await user.save();
    
    const resetLink = `http://localhost:3000/reset-password?token=${token}`;
    const response = await sendEmail({
        to: user.email,
        subject: "Promena lozinke",
        html: `
        <h2>Password reset</h2>
        <p>Click the link below to reset your password:</p>
        <a href="${resetLink}">Reset password</a>
    `,
    });
    
    if (response.success) {
        return NextResponse.json({message: 'send'});
    }
    console.log('here is response', response.success);
    return NextResponse.json({ success: true });
}